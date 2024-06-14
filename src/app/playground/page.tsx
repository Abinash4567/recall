'use client';

import Loading from "@/components/loading";
import { TweetLoading } from "@/components/tweetLoading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Tweets from "@/components/tweets";

interface IUserData {
    username: string;
    handle: string;
    tweet: string;
}

interface selFile {
    name: string;
    preview: string;
}

export default function Page() {
    const router = useRouter();
    const { data: session, status: logged } = useSession();


    const { toast } = useToast();
    const [status, setStatus] = useState<number>(1);
    const [userdata, setUserData] = useState<IUserData>({
        username: "",
        handle: "",
        tweet: ""
    });

    const [files, setFiles] = useState<selFile[]>([]);
    const [avatarFile, setAvatarFile] = useState<any>();
    const [imageFile, setImageFile] = useState<any>();


    const onDrop = useCallback((acceptedFiles: any[], rejectedFiles: any) => {
        setFiles((previousFiles) => [
            ...previousFiles,
            ...acceptedFiles.map((file) => ({
                ...file,
                preview: URL.createObjectURL(file),
                name: file.name,
            })),
        ]);

        if (status === 1) {
            setAvatarFile(acceptedFiles[0]);
            setStatus(2);
            setTimeout(() => {
                setStatus(3);
            }, 2000);
        }
        else if (status === 3) {
            setImageFile(acceptedFiles[0]);
            setStatus(4);
            setTimeout(() => {
                setStatus(5);
            }, 2000);
        }
    }, [status]);



    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        maxSize: 1024 * 1000,
        maxFiles: 1,
        multiple: false,
        onDrop,
    });

    const FormSchema = z.object({
        username: z
            .string()
            .min(2, { message: "Username must be at least 2 characters." })
            .max(15, { message: "Username cannot exceed 15 characters." })
            .regex(/^[A-Za-z ]+$/, {
                message: "Username can only contain alphabetic characters.",
            }),

        handle: z
            .string()
            .min(1, { message: "handle must be at least 1 character long." })
            .max(8, { message: "handle cannot exceed 8 characters." })
            .regex(/^[A-Za-z0-9_]+$/, {
                message: "handle can only contain letters, numbers, and underscores.",
            }),

        tweet: z
            .string()
            .min(1, { message: "Tweet cannot be empty." })
            .max(280, { message: "Tweet cannot exceed 280 characters." }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            handle: "",
            tweet: "",
        },
    });


    async function uploadAsset(file: any) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'recall');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dxh7ycus9/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.secure_url;
                // console.log('Cloudinary response:', data);
                // alert('File uploaded successfully: ' + data.secure_url);
            } else {
                const errorData = await response.json();
                return errorData.error.message;
                // console.error('Error uploading file:', errorData);
                // alert('Failed to upload file: ' + errorData.error.message);
            }
        }
        catch (error) {
            return error;
            // console.error('Error uploading file:', error);
            // alert('Failed to upload file');
        }
    }


    function isValidUrl(url: string): boolean {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)' +
            '((([a-zA-Z0-9_-]+\\.)+[a-zA-Z]{2,})|' +
            'localhost)' +
            '(\\:\\d+)?' +
            '(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*' +
            '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' +
            '(\\#[-a-zA-Z0-9_]*)?$'
        );

        return urlPattern.test(url);
    }


    async function checkUrl(url: string): Promise<{ valid: boolean; message: string }> {
        if (!isValidUrl(url)) {
            return { valid: false, message: "URL syntax is invalid." };
        }

        if (!url.startsWith("https://")) {
            return { valid: false, message: "URL is not using HTTPS." };
        }

        try {
            const response = await axios.get(url, { timeout: 5000 });
            if (response.status !== 200) {
                return {
                    valid: false,
                    message: `URL is not reachable, status code: ${response.status}`,
                };
            }
        } catch (error: any) {
            return {
                valid: false,
                message: `URL is not reachable, error: ${error.message}`,
            };
        }

        return { valid: true, message: "URL is valid." };
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const avatarResponse = await uploadAsset(avatarFile);
        const imageResponse = await uploadAsset(imageFile);

        console.log(typeof avatarResponse);
        console.log(typeof imageResponse);

        const response1 = await checkUrl(avatarResponse);
        const resonse2 = await checkUrl(imageResponse);

        if (!response1.valid || !resonse2.valid) {
            toast({
                title: "Cannot Update your post.",
                description: "Might be due to invalid file. Reloading!!",
            });

            setTimeout(()=>{
                window.location.reload()
                }, 2000)

        } else 
        {

            const response = await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({
                    username: data.username,
                    handle: data.handle,
                    tweet: data.tweet,
                    avatarURL: avatarResponse,
                    imageURL: imageResponse,
                    email: session?.user?.email!,
                    githubImage: session?.user?.image!,
                }),
            });
            // console.log(response);
            if (response.ok) {
                toast({
                    title: "Post Added.",
                    description: "Add more!!",
                });

                setTimeout(()=>{
                    window.location.reload()
                    }, 2000)
            } else 
            {
                toast({
                    title: "Cannot Update your post.",
                    description: "Please try again. Refreshing!!",
                });
                
                setTimeout(()=>{
                    window.location.reload()
                    }, 2000)
            }
        }
    }

    return (
        <div>
            <div className="mt-8 flex justify-between pb-7">
                <div className="border border-blue-700 rounded-lg p-4 w-1/3 h-5/6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>


                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Username"
                                                type="text"
                                                {...field}
                                                onChange={(e) => {
                                                    setUserData({ ...userdata, username: e.target.value });
                                                    field.onChange(e);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="handle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>@User Handle</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter user handle"
                                                type="text"
                                                {...field}
                                                onChange={(e) => {
                                                    setUserData({ ...userdata, handle: e.target.value });
                                                    field.onChange(e);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tweet"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tweet</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write about memorable event."
                                                className="resize-none"
                                                {...field}
                                                onChange={(e) => {
                                                    setUserData({ ...userdata, tweet: e.target.value });
                                                    field.onChange(e);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {status == 1 && <div className="mt-2">
                                <div className="text-sm font-medium">Avatar</div>
                                <div className="flex">
                                    <div
                                        {...getRootProps({
                                            className:
                                                "rounded hover:bg-slate-800 bg-slate-900 hover:cursor-pointer h-[40px] w-[40px] pt-2"
                                        })}>

                                        <input {...getInputProps({ name: "file" })} />
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
                                        </div>
                                    </div>

                                    <div className="ml-12 text-slate-500">{files.length >= 1 ? files[0].name : "eg. user_passport.jpg"}</div>
                                </div>
                            </div>}

                            {(status === 2 || status === 4) && <Loading className="rounded h-[60px] mt-4" />}

                            {status == 3 && <div className="mt-2">
                                <div className="text-sm font-medium">Image</div>
                                <div className="flex">
                                    <div
                                        {...getRootProps({
                                            className:
                                                "border-2 borer-red-500 rounded hover:bg-slate-800 bg-slate-900 hover:cursor-pointer h-[40px] w-[40px] pt-2"
                                        })} >
                                        <input {...getInputProps({ name: "file" })} />
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
                                        </div>
                                    </div>

                                    <div className="ml-12 text-slate-500">{files.length > 1 ? files[1].name : "eg. picnic.jpg"}</div>
                                </div>
                            </div>}

                            <Button type="submit" className="mt-4">Create Memory</Button>
                        </form>
                    </Form>
                </div>

                <div>
                    <TweetLoading userData={userdata} files={files} />
                </div>
            </div>
            <div className="mb-10 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
                Your Tweets
            </div>
            <Tweets userEmail={session?.user?.email!}/>
        </div>
    )
}
'use client';

import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TweetLoading } from "@/components/tweetLoading";
import { useCallback, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'


interface IUserData {
    username: string;
    handle: string;
    tweet: string;
    image: string;
    avatar: string;
}
export default function Page() 
{
    const [clickedInput, setClickedInput] = useState<number>(-1);

    const [userdata, setUserData] = useState<IUserData>({
        username: "",
        handle: "",
        tweet: "",
        image: "",
        avatar: "",
    });

    const onDrop = useCallback((acceptedFiles: any) => {
        if(clickedInput)
        {
            console.log(acceptedFiles);
            console.log(clickedInput)
        }
    }, [clickedInput]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        maxSize: 1024 * 1000,
        maxFiles: 1,
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
            .min(1, { message: "Username must be at least 1 character long." })
            .max(8, { message: "Username cannot exceed 8 characters." })
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

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <div className="mt-8 flex justify-between">
            <div className="border border-blue-700 rounded-lg p-4 w-1/3">
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
                                                setUserData({...userdata, username: e.target.value });
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
                                                setUserData({...userdata, handle: e.target.value });
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
                                                setUserData({...userdata, tweet: e.target.value });
                                                field.onChange(e);  
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-2">
                            <div className="text-sm font-medium">Avatar</div>
                            <div className="flex">
                                <div
                                    {...getRootProps({
                                        className:
                                            "rounded hover:bg-slate-800 bg-slate-900 hover:cursor-pointer h-[40px] w-[40px] pt-2"
                                    })} onMouseUp={()=>{setClickedInput(1)}}>

                                    <input {...getInputProps({ name: "file" })}/>
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
                                    </div>
                                </div>

                                <div className="ml-12 text-slate-500">{userdata.avatar ? userdata.avatar : "user_passport.jpg"}</div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="text-sm font-medium">Image</div>
                            <div className="flex">
                                <div
                                    {...getRootProps({
                                        className:
                                            "border-2 borer-red-500 rounded hover:bg-slate-800 bg-slate-900 hover:cursor-pointer h-[40px] w-[40px] pt-2"
                                    })} >
                                    <input {...getInputProps({ name: "file" })}/>
                                    <div className="flex flex-col items-center justify-center gap-4" onMouseUp={()=>{console.log(`HelloABC`)}}>
                                        <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
                                    </div>
                                </div>

                                <div className="ml-12 text-slate-500">{userdata.image ? userdata.image : "picnic.jpg"}</div>
                            </div>
                        </div>

                        <Button type="submit" className="mt-4">
                            Create Memory
                        </Button>
                    </form>
                </Form>
            </div>

            <div>
                <TweetLoading userData={userdata} />
            </div>
        </div>
    )
}
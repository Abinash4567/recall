'use client';

import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function Page() {

    const FormSchema = z.object({
        username: z.string()
            .min(2, { message: "Username must be at least 2 characters." })
            .max(15, { message: "Username cannot exceed 15 characters." })
            .regex(/^[A-Za-z ]+$/, { message: "Username can only contain alphabetic characters." }),
    
        handle: z.string()
            .min(1, { message: "Username must be at least 1 character long." })
            .max(8, { message: "Username cannot exceed 8 characters." })
            .regex(/^[A-Za-z0-9_]+$/, { message: "handle can only contain letters, numbers, and underscores." }),
    
        tweet: z.string()
            .min(1, { message: "Tweet cannot be empty." })
            .max(280, { message: "Tweet cannot exceed 280 characters." }),
    });
    
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            handle: "",
            tweet: ""
        }
    })


    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
    }

    return (
        <div className="border border-blue-700 rounded-lg p-4 w-1/3 mt-12">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Username" type="text" {...field} />
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
                                    <Input placeholder="Enter user handle" type="text" {...field} />
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                
                
                <div className="mt-2">
                    <div className="text-sm font-medium">Avatar</div>
                    <div className="rounded hover:bg-slate-800 hover:cursor-pointer h-[40px] w-[40px] p-2 flex">
                        <div><Upload /></div>
                        <div className="ml-12 text-slate-500">Hello</div>
                    </div>
                </div>

                <div className="mt-2">
                    <div className="text-sm font-medium">Photo</div>
                    <div className="rounded hover:bg-slate-800 hover:cursor-pointer h-[40px] w-[40px] p-2 flex">
                        <div><Upload /></div>
                        <div className="ml-12 text-slate-500">Picnic.jpg</div>
                    </div>
                </div>

                <Button type="submit" className="mt-4">Create Memory</Button>
                </form>
            </Form>
        </div>
    )
}
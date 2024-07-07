"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";


export default function Login() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Image
                        className="border-2 border-green-800 rounded-full cursor-pointer ml-2"
                        src={session.user?.image!}
                        alt={session.user?.name!}
                        width={40}
                        height={40}
                    />
                    
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <Button variant="secondary" onMouseDown={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}` })}>Sign out</Button>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Button onMouseDown={() => { signIn("github"); }} variant="secondary" className="rounded-2xl bg-blue-600 hover:bg-blue-900 text-white ml-2">
            Sign in
        </Button>
    );
}

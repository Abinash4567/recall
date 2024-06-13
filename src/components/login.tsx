"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function Login() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <div className="flex flex-col items-center justify-center h-screen -mt-16">
                <h1>Welcome,</h1>
                {session && <span className="font-bold text-2xl">{JSON.stringify(session)}</span>}
                <Button
                    onMouseDown={() => signOut()}
                    className="mt-4 bg-slate-800 text-white px-6 py-3 rounded-lg"
                >
                    Sign out
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen -mt-16">
            <h1>Login to get started</h1>
            <button
                onMouseDown={() => {
                    signIn("github");
                }}
                className="mt-4 bg-slate-800 text-white px-6 py-3 rounded-lg"
            >
                Sign in with Github
            </button>
        </div>
    );
}

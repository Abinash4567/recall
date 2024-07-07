import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

export  async function GET(req: Request, res: Response) {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tweet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "stickatstack@outlook.com"
            })
        })
        const res = await response.json();
        return new Response(JSON.stringify({ subscriptionDetail: res }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
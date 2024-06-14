import { db } from '@/lib/prisma';

export async function POST(req: Request, res: Response) {
    // if (!email) {
    //     return new Response(JSON.stringify({ message: "Missing Parameter" }), {
    //         status: 400,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });

    try 
    {
    const { email } = await req.json();

        const response = await db.gitHubUser.findUnique({
            where: {
                email: email
            },
            select: {
                tweets: true,
            },
        });
        return new Response (JSON.stringify({ data: response?.tweets }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } 
    catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}
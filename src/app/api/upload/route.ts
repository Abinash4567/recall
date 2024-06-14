import { db as prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { username, handle, tweet, avatarURL, imageURL, email, githubImage } = await req.json();


    const existingUser = await prisma.gitHubUser.findUnique({
        where: { email: email },
    });

    let userId: number;

    if (!existingUser) 
    {
        const newUser = await prisma.gitHubUser.create({
            data: {
                email: email,
                image: githubImage, 
            },
        });

        userId = newUser.id;
    } 
    else 
    {
        userId = existingUser.id;
    }

    const respone =  await prisma.tweet.create({
        data: {
            username: username,
            handle: handle,
            tweet: tweet,
            avatarImage: avatarURL,
            tweetImage: imageURL,
            ownerId: userId,
        },
    });

    console.log(respone);

    return new Response(
        JSON.stringify({
            username: username,
            handle: handle,
            tweet: tweet,
            avatar: avatarURL,
            image: imageURL,
            email: email,
            githubImage: githubImage,
            userId: userId
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
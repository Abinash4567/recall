export async function POST(req: Request) {
    const { username, handle, tweet, avatar, image } = await req.json();

        return new Response(
            JSON.stringify({
                username: username,
                handle: handle,
                tweet: tweet,
                avatar: avatar,
                image: image
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
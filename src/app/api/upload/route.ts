import { v2 as cloudinary } from 'cloudinary'

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true
})


async function uploadAsset(file: any)
{
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'recall'); // Replace with your upload preset

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dxh7ycus9/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            // return data.secure_url;
            console.log('Cloudinary response:', data);
            // alert('File uploaded successfully: ' + data.secure_url);
        } else {
            const errorData = await response.json();
            // return errorData.error.message;
            console.error('Error uploading file:', errorData);
            // alert('Failed to upload file: ' + errorData.error.message);
        }
    } 
    catch (error) {
        // return error;
        console.error('Error uploading file:', error);
        // alert('Failed to upload file');
    }
}

export async function POST(req: Request) {
    const { username, handle, tweet, avatar, image } = await req.json();

    const avatarUrl = await uploadAsset(avatar);
    const imageUrl = await uploadAsset(image);

    // if (avatarUrl && imageUrl) {
    //     console.log(avatarUrl, imageUrl);

        return new Response(
            JSON.stringify({
                username: username,
                handle: handle,
                tweet: tweet,
                avatar: avatar,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
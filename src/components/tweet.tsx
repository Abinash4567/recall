import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import tweetImage from "../../public/image.jpg";
import Image from "next/image";

function Tweet() {
    return (
        <div className="border-2 border-emerald-700 w-[600px] p-[12px]">
            <div className="flex">

                <div className="w-[45px] pr-2">
                    <Avatar>
                        <AvatarImage src="/avvatark.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <div className="border-2 border-amber-700">
                    <div className="flex">
                        <div className="text-sm font-bold pr-1">Abinash Ray Yadav</div>
                        <div><Heart color="#ff0000" size={17} strokeWidth={3}/></div>
                        <div className="text-sm pl-1 text-gray-400 pr-1">@rayyadav</div>
                        <div className="text-sm text-gray-400 pr-1">20min</div>
                    </div>

                    <div className="text-sm mb-2">Hello, This is my website. This means a lot to me. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti suscipit quia quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae est excepturi cumque. Enim iste qui voluptas explicabo architecto consequuntur quos eum rerum, maxime necessitatibus! Ipsam provident quos aliquid et blanditiis exercitationem suscipit eos!
                    </div>

                    <Image
                        src={tweetImage}
                        // width={490}
                        height={360}
                        style={{borderRadius: 9}}
                        alt="Picture of the author"
                    />

                </div>
            </div>
        </div>
    );
}

export default Tweet
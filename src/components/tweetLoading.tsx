import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import tweetImage from "../../public/image.jpg";
import Image from "next/image";

import Bookmark from "@/components/svgs/bookmark";
import Comment from "@/components/svgs/comment";
import Repost from "@/components/svgs/repost";
import Hheart from "@/components/svgs/heart";
import Analytics from "@/components/svgs/analytics";
import Share from "@/components/svgs/share";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

interface IUserData {
    username: string;
    handle: string;
    tweet: string;
    image: string;
    avatar: string;
}

export function TweetLoading() {
    const [tweetData, setTweetData] = useState<IUserData>({
        username: "",
        handle: "",
        tweet: "",
        image: "",
        avatar: "",
    });

    return (
        <div className="w-[500px] p-[12px] border border-slate-400 rounded-lg mb-4">
            <div className="flex">
                <div className="w-[45px] pr-2">
                    {!tweetData?.avatar ? (
                        <Skeleton className="w-[40px] h-[40px] rounded-full" />
                    ) : (
                        <Avatar>
                            <AvatarImage src="/avvatark.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    )}
                </div>

                <div>
                    <div className="flex">
                        {tweetData?.username ? (
                            <>
                                <div className="text-sm font-bold pr-1">Abinash Ray Yadav</div>
                                <div>
                                    <Heart color="#ff0000" size={17} strokeWidth={3} />
                                </div>
                                <div className="text-sm pl-1 text-gray-400 pr-1">@rayyadav</div>
                                <div className="text-sm text-gray-400 pr-1">20min</div>{" "}
                            </>
                        ) : (
                            <Skeleton className="w-[300px] h-[20px] mb-2" />
                        )}
                    </div>

                    {tweetData?.tweet ? (
                        <div className="text-sm mb-2">
                            Hello, This is my website. This means a lot to me. Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Corrupti suscipit
                            quia quam! Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iste quae est excepturi cumque. Enim iste qui voluptas
                            explicabo architecto consequuntur quos eum rerum, maxime
                            necessitatibus! Ipsam provident quos aliquid et blanditiis
                            exercitationem suscipit eos!
                        </div>
                    ) : (
                        <Skeleton className="w-[400px] h-[100px] mb-2" />
                    )}

                    {tweetData?.image ? (
                        <Image
                            src={tweetImage}
                            height={360}
                            style={{ borderRadius: 9 }}
                            alt="Picture of the author"
                        />
                    ) : (
                        <Skeleton className="w-[400px] h-[300px] mb-2" />
                    )}

                    <div className="mt-[10px] flex justify-between">
                        <div className="flex text-gray-600 text-sm">
                            <Comment className="h-[18px] w-[18px] mr-1" />
                            12
                        </div>
                        <div className="flex text-gray-600 text-sm">
                            <Repost className="h-[18px] w-[18px] mr-1" />
                            12
                        </div>
                        <div className="flex text-gray-600 text-sm">
                            <Hheart className="h-[18px] w-[18px] mr-1" />
                            12
                        </div>
                        <div className="flex text-gray-600 text-sm">
                            <Analytics className="h-[18px] w-[18px] mr-1" />
                            12
                        </div>
                        <div className="flex text-gray-600 text-sm">
                            <Bookmark className="h-[18px] w-[18px] mr-1" />
                            <Share className="h-[18px] w-[18px] mr-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

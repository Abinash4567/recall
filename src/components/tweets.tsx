import useFetch from "@/lib/common/serverMethods"
import { TweetLoading } from "./tweetLoading";


interface Itweet {
  id: number;
  username: string;
  avatarImage: string;
  handle: string;
  tweet: string;
  tweetImage: string;
  createdAt: Date;
  ownerId: number;
};

export default function Tweets({ userEmail }: {userEmail: string}) {
  const { data, loading, error } = useFetch({email: userEmail});

  return (
  <div className="grid grid-cols-2 gap-4">
    {data && data.map((indi)=>{

      let userData = {
        username: indi.username,
        handle: indi.handle,
        tweet: indi.tweet,
        day: indi.createdAt.toString().slice(0, 10),
      }

      let selFile = [{
        name: indi.avatarImage,
        preview: indi.tweetImage
      }]

      return <TweetLoading key={indi.id} userData={userData} files={selFile}/>
    })}

  </div>)
}
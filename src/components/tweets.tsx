import useFetch from "@/lib/servermethods/serverMethods"
import { TweetLoading } from "./tweetLoading";
import Loading from "./loading";

export default function Tweets({ userEmail }: {userEmail: string}) {
  const { data, loading, error } = useFetch({email: userEmail});

  return (

    <>
    <></>
    {loading && <Loading className="rounded h-[60px] mt-4" />}

    {error && <div className="b-10 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-red-600">Error fetching data</div>}

  {!loading && <div className="grid grid-cols-2 gap-4">
    {data && data.map((indi)=>{

      let userData = {
        username: indi.username,
        handle: indi.handle,
        tweet: indi.tweet,
        day: indi.createdAt.toString().slice(0, 10),
      }

      let selFile = [{
        name: "name",
        preview: indi.avatarImage
      },
      {
        name: "name",
        preview: indi.tweetImage
      }
    ]

      return <TweetLoading key={indi.id} userData={userData} files={selFile}/>
    })}

  </div>}

  </>)
}
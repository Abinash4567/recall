'use client';

import { useEffect } from "react";
import { db } from "@/lib/prisma";

function Tweets({ userEmail }: {userEmail: string}) {
  let tweets = null;
  useEffect(()=>{
    async function load()
    {
      try {
        const userWithTweets = await db.gitHubUser.findUnique({
          where: {
            email: userEmail,
          },
          include: {
            tweets: true,
          },
        });
    
        if (!userWithTweets) {
          throw new Error(`User with email ${userEmail} not found`);
        }
    
        tweets = userWithTweets.tweets;
      } 
      catch (error) {
        console.error("Error fetching tweets by email: ", error);
        throw error;
      } 
      finally {
        await db.$disconnect();
      }
    }

    load();
  }, [])
  return (
    <div className='border border-green-500'>
      {tweets && tweets.map((indi)=>{
        return (<div key={indi.id}>{indi.tweet}</div>)
      })}
    </div>
  )
}

export default Tweets
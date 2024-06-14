import { useState, useEffect } from 'react';

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

const useFetch = ({ email }: { email: string }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Array<Itweet>>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if(email){
                const response = await fetch('http://localhost:3000/api/tweet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email
                    })
                })
                console.log(response);
                // setData(response?.data);

                if (!response.ok) {
                    setError(true);
                }
                else{
                    const result = await response.json();
                    setData(result.data);
                    console.log(result.data);
                }
            }
        }
            catch (error) {
                setError(true);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

    return { loading, data, error };
};

export default useFetch;

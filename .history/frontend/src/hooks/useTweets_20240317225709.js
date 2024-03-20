import { useEffect, useState } from 'react';

export default function useTweets() {
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/tweets/')
      .then((results) => results.json())
      // .then((data) => console.log(data));
      .then((data) =>
        setTweets(data.data.sort((a, b) => b.createdAt - a.createdAt))
      );
  }, []);

  const createTweetService = async (text, token) => {
    const res = await fetch(`http://localhost:3000/tweets/`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const body = await res.json();
    console.log(body);

    return body;
  };

  const getTweets = () => {};

  return { tweets, setTweets, createTweetService };
}

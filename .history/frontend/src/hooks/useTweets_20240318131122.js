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

  const getTweets = () => {
    fetch('http://localhost:3000/tweets/')
      .then((results) => results.json())
      // .then((data) => console.log(data));
      .then((data) =>
        setTweets(data.data.sort((a, b) => b.createdAt - a.createdAt))
      );
  };

  return { tweets, setTweets, createTweetService };
}

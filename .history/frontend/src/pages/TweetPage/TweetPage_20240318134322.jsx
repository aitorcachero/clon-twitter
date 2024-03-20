import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TweetPage() {
  const { id } = useParams(null);
  const [tweet, setTweet] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/tweets/${id}`)
      .then((res) => res.json())
      .then((data) => setTweet(data));
  }, []);
  // console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center"></div>
  );
}

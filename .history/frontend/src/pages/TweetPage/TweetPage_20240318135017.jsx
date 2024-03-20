import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardTwitter from '../../components/CardTwitter/CardTwitter';

export default function TweetPage() {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/tweets/${id}`)
      .then((res) => res.json())
      .then((data) => setTweet(data));
  }, []);
  // console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {tweet?.data && <CardTwitter tweet={tweet.data} />}
      {tweet && console.log(tweet.data)}
    </div>
  );
}

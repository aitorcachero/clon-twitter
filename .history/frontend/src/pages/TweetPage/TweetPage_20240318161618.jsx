import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweet from '../../hooks/useTweets';

export default function TweetPage() {
  const { tweets } = useTweet();
  const { id } = useParams();
  const tweetData = tweets.find((x) => x.tweet_id === id);
  console.log(tweetData);
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
      {tweet && console.log(tweets.find((x) => x.tweet_id === id))}
    </div>
  );
}

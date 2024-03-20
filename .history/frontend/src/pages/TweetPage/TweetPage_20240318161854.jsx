import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweet from '../../hooks/useTweets';

export default function TweetPage() {
  const { tweets } = useTweet();
  const { id } = useParams();

  const [tweet, setTweet] = useState(null);
  useEffect(() => {
    setTweet(tweets.find((x) => x.tweet_id === 1));
  }, []);
  // console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {tweet?.data && <CardTwitter tweet={tweet.data} />}
      {tweet && console.log(tweets.find())}
    </div>
  );
}

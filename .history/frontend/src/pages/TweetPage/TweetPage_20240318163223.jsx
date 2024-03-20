import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweet from '../../hooks/useTweets';

export default function TweetPage() {
  const { tweets } = useTweet();
  const { id } = useParams();
  const [comments, setComments] = useState();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {tweets && <CardTwitter tweet={tweets.find((x) => x.tweet_id === +id)} />}
    </div>
  );
}
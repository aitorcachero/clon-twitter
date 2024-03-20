import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweet from '../../hooks/useTweets';

export default function TweetPage() {
  const { tweets } = useTweet();
  const { id } = useParams();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {tweets && <CardTwitter tweet={tweets[id]} />}
    </div>
  );
}

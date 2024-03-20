import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweet from '../../hooks/useTweets';
import useAuth from '../../hooks/useAuth';
import WriteComment from '../../components/WriteComment/WriteComment';
import CommentCard from '../../components/CommentCard/CommentCard';

export default function TweetPage() {
  const { authToken } = useAuth();
  const { tweets, getComments, comments } = useTweet();
  const { id } = useParams();

  useEffect(() => {
    getComments(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 md:gap-0">
      {tweets && <CardTwitter tweet={tweets.find((x) => x.tweet_id === +id)} />}
      {authToken && <WriteComment id={id} />}
      {comments && comments.length > 0 && (
        <>
          <h2 className="text-4xl">RESPUESTAS</h2>
          {comments.map((tweet) => {
            return <CommentCard tweet={tweet} key={tweet.id} />;
          })}
        </>
      )}
    </div>
  );
}

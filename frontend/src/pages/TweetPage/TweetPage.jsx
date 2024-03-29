import { useEffect } from 'react';
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
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-0">
      {tweets && <CardTwitter tweet={tweets.find((x) => x.tweet_id === +id)} />}
      {authToken && <WriteComment id={id} />}
      {comments && comments.length > 0 && (
        <>
          <div className="border-b-[1px] w-[350px] md:w-[500px] my-10"></div>
          {comments.map((tweet, i) => {
            return <CommentCard tweet={tweet} key={tweet.id} />;
          })}
        </>
      )}
    </div>
  );
}

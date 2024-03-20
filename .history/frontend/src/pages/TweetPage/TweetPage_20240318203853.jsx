import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweet from '../../hooks/useTweets';
import useAuth from '../../hooks/useAuth';
import WriteComment from '../../components/WriteComment/WriteComment';

export default function TweetPage() {
  const { authToken } = useAuth();
  const { tweets } = useTweet();
  const { id } = useParams();
  const [comments, setComments] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/tweets/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data));
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {tweets && <CardTwitter tweet={tweets.find((x) => x.tweet_id === +id)} />}
      {authToken && <WriteComment id={id} />}
      {comments &&
        comments.map((tweet) => {
          return <WriteComment tweet={tweet} />;
        })}
    </div>
  );
}
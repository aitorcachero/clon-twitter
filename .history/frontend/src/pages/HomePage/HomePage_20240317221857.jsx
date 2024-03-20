import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweets from '../../hooks/useTweets';
import LoginPage from '../LoginPage/LoginPage';
import useAuth from '../../hooks/useAuth';
import WriteTweet from '../../components/WriteTweet/WriteTweet';

export default function HomePage() {
  const { tweets } = useTweets();
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {authUser && <WriteTweet />}
      {tweets &&
        tweets.length > 0 &&
        tweets.map((tweet) => {
          return <CardTwitter tweet={tweet} key={tweet.tweet_id} />;
        })}
      {}
    </div>
  );
}

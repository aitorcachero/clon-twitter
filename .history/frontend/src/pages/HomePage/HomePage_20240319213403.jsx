import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweets from '../../hooks/useTweets';
import LoginPage from '../LoginPage/LoginPage';
import useAuth from '../../hooks/useAuth';
import WriteTweet from '../../components/WriteTweet/WriteTweet';

export default function HomePage() {
  const { tweets, setTweets } = useTweets();
  const { authUser } = useAuth();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-0">
      {authUser && <WriteTweet tweets={tweets} setTweets={setTweets} />}
      {tweets &&
        tweets.length > 0 &&
        tweets.map((tweet) => {
          return (
            <CardTwitter
              tweet={tweet}
              key={tweet.tweet_id}
              liked={authUser?.arrayOfTweetLikes.includes(tweet.tweet_id)}
            />
          );
        })}
      {}
    </div>
  );
}

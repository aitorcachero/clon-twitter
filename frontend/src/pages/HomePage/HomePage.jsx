import CardTwitter from '../../components/CardTwitter/CardTwitter';
import useTweets from '../../hooks/useTweets';

import useAuth from '../../hooks/useAuth';
import WriteTweet from '../../components/WriteTweet/WriteTweet';
import ProgressLoader from '../../components/ProgressLoader/ProgressLoader';

export default function HomePage() {
  const { tweets, setTweets, loading } = useTweets();
  const { authUser } = useAuth();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-0">
      <div className="mt-5">
        {loading && <ProgressLoader />}
        {authUser && <WriteTweet tweets={tweets} setTweets={setTweets} />}
        {tweets &&
          tweets.length > 0 &&
          tweets.map((tweet) => {
            return <CardTwitter tweet={tweet} key={tweet.tweet_id} />;
          })}
        {}
      </div>
    </div>
  );
}

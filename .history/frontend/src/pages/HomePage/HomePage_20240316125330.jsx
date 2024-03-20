import useTweets from '../../hooks/useTweets';
import CardTweeter from './components/CardTwetter/CardTweeter';

export default function HomePage() {
  const { tweets } = useTweets();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {tweets &&
        tweets.length > 0 &&
        tweets.map((tweet) => {
          return <CardTweeter tweet={tweet} key={tweet.id} />;
        })}
    </div>
  );
}

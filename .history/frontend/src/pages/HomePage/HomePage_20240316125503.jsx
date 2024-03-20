import CardTweeter from '../../components/CardTwetter/CardTweeter';
import useTweets from '../../hooks/useTweets';
import LoginPage from '../LoginPage/LoginPage';

export default function HomePage() {
  const { tweets } = useTweets();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {tweets &&
        tweets.length > 0 &&
        tweets.map((tweet) => {
          return <CardTweeter tweet={tweet} key={tweet.id} />;
        })}
      <LoginPage />
    </div>
  );
}

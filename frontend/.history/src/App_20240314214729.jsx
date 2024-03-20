import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/tweets/')
      .then((results) => results.json())
      .then((data) => setTweets(data.data));
  }, []);
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        {tweets &&
          tweets.length > 0 &&
          tweets.map((tweet) => {
            return (
              <div className="w-[200px] h-[100px] border bg-neutral-900 flex justify-center items-center">
                <h4 className="text-center">{tweet.tweet_text}</h4>
                <h3>{tweet.username}</h3>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;

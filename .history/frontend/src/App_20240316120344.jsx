import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import CardTweeter from './components/CardTwetter/CardTweeter';
import NavBar from './components/NavBar/NavBar';

function App() {
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/tweets/')
      .then((results) => results.json())
      // .then((data) => console.log(data));
      .then((data) => setTweets(data.data));
  }, []);
  return (
    <>
      <NavBar />
      <div className="w-full h-full flex flex-col justify-center items-center">
        {tweets &&
          tweets.length > 0 &&
          tweets.map((tweet) => {
            return <CardTweeter tweet={tweet} key={tweet.id} />;
          })}
      </div>
    </>
  );
}

export default App;

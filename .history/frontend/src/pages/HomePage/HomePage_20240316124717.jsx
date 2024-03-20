import React from 'react';

export default function HomePage() {
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

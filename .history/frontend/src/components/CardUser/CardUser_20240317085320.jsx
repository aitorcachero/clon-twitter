import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import CardTwitter from '../CardTwitter/CardTwitter';

export default function CardUser({ fullUser }) {
  const { user, tweets } = fullUser;

  const [follow, setFollow] = useState(false);
  const buttonFollow = follow ? 'Siguiendo' : 'Seguir';

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {user && (
        <article
          className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-[500px] flex flex-col justify-between gap-2 my-4"
          style={{
            background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
            backgroundClip: 'padding-box',
          }}
        >
          <header className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-end w-full">
              <img />
              <button
                className={`rounded-3xl border border-x-teal-800 bg-zinc-600 ${
                  follow ? 'hover:bg-red-600' : 'hover:bg-green-600'
                }`}
                onClick={() => setFollow(!follow)}
              >
                {buttonFollow}
              </button>
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-white">
                {user.name} {user.surname}
              </p>
              <p className="text-blue-600">@{user.username}</p>
            </div>
          </header>
          {/* <a href={''}> */}
          <h2 className="text-slate-500 my-5">
            {'hola'}
            {/* <span>&rarr;</span> */}
          </h2>

          <p>
            Miembro desde:{' '}
            <span className="text-orange-600 text-sm">
              {formatDate(user.createdAt)}
            </span>
          </p>
          <p>Seguidores: {user.followers}</p>
          <p>Seguidos: {user.follows}</p>
          <div className="flex flex-row justify-between items-center">
            {/* <div className="flex flex-row gap-2">
          <img
            src={commentsImg}
            width={20}
            className="text-white hover:cursor-pointer"
          />
          <p>{'tweet.comments'}</p>
        </div> */}
            {/* <div className="flex flex-row gap-2">
          <img src={retweetsImg} width={20} className="hover:cursor-pointer" />
          <p>{'tweet.retweet'}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img src={likesImg} width={20} className="hover:cursor-pointer" />
          <p>{'user.likes'}</p>
        </div> */}
          </div>
          {/* </a> */}
        </article>
      )}
      {tweets &&
        tweets.length > 0 &&
        tweets.map((tweet) => {
          return <CardTwitter tweet={tweet} key={tweet.tweet_id} />;
        })}
    </div>
  );
}

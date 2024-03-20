import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import CardTwitter from '../CardTwitter/CardTwitter';
import useAuth from '../../hooks/useAuth';
import defaultIconUser from '../../assets/icons/user-default-icon.svg';

export default function CardUser({ fullUser }) {
  console.log(fullUser);
  const { authUser } = useAuth();

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
            <div className="flex flex-row justify-between items-end w-full">
              <img src={defaultIconUser} width={50} />
              {authUser?.id !== fullUser?.user.id && (
                <button
                  className={`rounded-3xl border border-x-teal-800 bg-zinc-800 px-4 py-2 ${
                    follow ? 'hover:bg-red-600' : 'hover:bg-green-600'
                  }`}
                  onClick={() => setFollow(!follow)}
                >
                  {buttonFollow}
                </button>
              )}
            </div>
            <div className="flex flex-col justify-center items-start w-full">
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
          <section className="flex flex-row justify-center items-center">
            <p>Tweets: {tweets.length}</p>
            <p>Seguidores: {user.followers || 0}</p>
            <p>Seguidos: {user.follows || 0}</p>
          </section>
          <p>
            Miembro desde:{' '}
            <span className="text-orange-600 text-sm">
              {formatDate(user.createdAt)}
            </span>
          </p>
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

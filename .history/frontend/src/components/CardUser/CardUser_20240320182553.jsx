import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import CardTwitter from '../CardTwitter/CardTwitter';
import useAuth from '../../hooks/useAuth';
import defaultIconUser from '../../assets/icons/user-default-icon.svg';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { followUserService } from '../../services/fetchData';
import { useNavigate } from 'react-router-dom';

export default function CardUser({ fullUser }) {
  const navigate = useNavigate();
  const { authUser, authToken } = useAuth();

  const { user, tweets } = fullUser;

  const [follow, setFollow] = useState(false);
  const buttonFollow = follow ? 'Siguiendo' : 'Seguir';

  useEffect(() => {
    const checkFollow = () => {
      const USER_ID = fullUser?.user.id;
      const ARRAY_FOLLOWS = authUser?.arrayOfFollows;
      const result = ARRAY_FOLLOWS.includes(USER_ID);
      setFollow(result);
    };
    if (authUser) checkFollow();
  }, [authUser]);

  const handleFollow = async (e) => {
    e.preventDefault();

    if (!authUser) {
      navigate('/login');
      return;
    }

    const followService = await followUserService(user.username, authToken);
    console.log(followService);
    if (followService.status === 'ok') setFollow(!follow);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {user && (
        <article
          className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-full lg:w-[500px] flex flex-col justify-between gap-2 my-4"
          style={{
            background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
            backgroundClip: 'padding-box',
          }}
        >
          <header className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between items-end w-full">
              <img src={defaultIconUser} width={50} />
            </div>
            <div className="flex flex-col justify-center items-start w-full">
              <p className="text-white">
                {user.name} {user.surname}
              </p>
              <p className="text-blue-600">@{user.username}</p>
            </div>
          </header>

          <h2 className="text-slate-500 my-5">{'hola uqe tal'}</h2>
          <section className="flex flex-row justify-center items-center gap-10 p-6 lg:p-4 bg-slate-800 rounded">
            <div className="flex flex-col justify-center items-center">
              <p>Tweets:</p>
              <p className="font-bold text-xl">{tweets.length}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Seguidores:</p>
              <p className="font-bold text-xl">
                {' '}
                {user?.arrayOfFollowers.length || 0}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Seguidos:</p>
              <p className="font-bold text-xl">
                {' '}
                {user?.arrayOfFollows.length || 0}
              </p>
            </div>
          </section>
          <div className="mt-4 flex flex-row items-center justify-between px-4">
            <div>
              Miembro desde:{' '}
              <span className="text-orange-600 text-sm">
                {formatDate(user.createdAt)}
              </span>
            </div>
            <button
              className={`rounded-lg border bg-zinc-800 px-4 py-2 ${
                follow ? 'bg-green-800' : 'bg-zinc-800'
              } ${follow ? 'hover:bg-red-800' : 'hover:bg-green-800'} ${
                authUser?.id !== fullUser?.user.id ? 'visible' : 'hidden'
              }`}
              onClick={handleFollow}
            >
              {buttonFollow}
            </button>
          </div>
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
import React, { useEffect, useState } from 'react';

import formatDate from '../../utils/formatDate';
import CardTwitter from '../CardTwitter/CardTwitter';
import useAuth from '../../hooks/useAuth';
import defaultIconUser from '../../assets/icons/user-default-icon.svg';

import { followUserService } from '../../services/fetchData';
import { useNavigate } from 'react-router-dom';
import FollowsComponent from '../FollowsComponent/FollowsComponent';
import FollowersComponent from '../FollowersComponent/FollowersComponent';

export default function CardUser({ fullUser }) {
  const navigate = useNavigate();
  const { authUser, authToken } = useAuth();

  const [render, setRender] = useState('tweets');

  const { user, tweets, following, followers } = fullUser;

  const [follow, setFollow] = useState(false);
  const buttonFollow = follow ? 'Siguiendo' : 'Seguir';

  useEffect(() => {
    const checkFollow = () => {
      const USER_ID = fullUser?.user.id;
      const AUTH_USER_ID = authUser?.id;
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
          className="border min-w-[300px] border-slate-700 rounded-xl bg-zinc-900 p-6 w-full md:w-[500px] flex flex-col justify-between gap-2 my-4"
          style={{
            background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
            backgroundClip: 'padding-box',
          }}
        >
          <header className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between items-end w-full">
              <img src={defaultIconUser} width={50} />
              {authUser?.id === fullUser?.user.id && (
                <button
                  className={`rounded-lg border border-blue-600 bg-[#040A1D] px-4 py-2 font-semibold text-slate-200`}
                >
                  Editar
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

          <h2 className="text-slate-500 my-5">{user.description}</h2>
          <section className="flex flex-row justify-center items-center md:gap-16 gap-4 p-2 md:p-4 bg-slate-800 rounded">
            <div className="flex flex-col justify-center items-center ">
              <p>Tweets:</p>
              <p
                className="font-bold md:text-xl hover:cursor-pointer"
                onClick={() => setRender('tweets')}
              >
                {tweets.length}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Seguidores:</p>
              <p
                className="font-bold md:text-xl hover:cursor-pointer"
                onClick={() => setRender('followers')}
              >
                {' '}
                {user?.arrayOfFollowers.length || 0}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Seguidos:</p>
              <p
                className="font-bold md:text-xl hover:cursor-pointer"
                onClick={() => setRender('follows')}
              >
                {' '}
                {user?.arrayOfFollows.length || 0}
              </p>
            </div>
          </section>
          <div className="mt-4 flex flex-row items-center justify-center md:justify-between px-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
              <span className="text-center ">Miembro desde: </span>
              <span className="text-orange-600 text-sm text-center">
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

      {render === 'tweets' &&
        tweets &&
        tweets.length > 0 &&
        tweets.map((tweet) => {
          return <CardTwitter tweet={tweet} key={tweet.tweet_id} />;
        })}
      {render === 'follows' &&
        following &&
        following.length > 0 &&
        following.map((follow) => {
          return (
            <FollowsComponent
              key={following.followed_id}
              userFollowing={follow}
            />
          );
        })}
      {render === 'follows' && following && following.length === 0 && (
        <p className="text-white">@{user.username} no sigue a nadie todavía</p>
      )}

      {render === 'followers' &&
        followers &&
        followers.length > 0 &&
        followers.map((follower) => {
          return (
            <FollowersComponent
              key={followers.followed_id}
              userFollower={follower}
            />
          );
        })}
      {render === 'followers' && followers && followers.length === 0 && (
        <div className="border rounded p-6 bg-blue-950 text-lg text-slate-400">
          <p>@{user.username} todavía no tiene seguidores</p>
        </div>
      )}
    </div>
  );
}
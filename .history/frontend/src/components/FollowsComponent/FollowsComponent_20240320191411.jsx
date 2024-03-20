import { NavLink } from 'react-router-dom';
import userDefaultIcon from '../../assets/icons/user-default-icon.svg';

export default function FollowsComponent({ userFollowing }) {
  return (
    <NavLink to={`/user/${userFollowing.username}`}>
      <article
        className="border border-slate-700 rounded-xl bg-zinc-900 p-4 w-full lg:w-[400px] flex flex-row justify-between gap-2 my-2"
        style={{
          background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
          backgroundClip: 'padding-box',
        }}
      >
        <div className="flex justify-center items-center w-1/4">
          <img src={userDefaultIcon} width={50} />
        </div>
        <main className="flex flex-col justify-center items-start w-3/4 text-sm">
          <p>
            {userFollowing.name} {userFollowing.surname}
          </p>
          <p className="text-slate-500">@{userFollowing.username}</p>
          <p>{userFollowing.description}</p>
        </main>
      </article>
    </NavLink>
  );
}

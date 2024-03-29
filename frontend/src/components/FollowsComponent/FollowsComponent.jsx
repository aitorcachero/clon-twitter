import { NavLink } from 'react-router-dom';
import userDefaultIcon from '../../assets/icons/user-default-icon.svg';
import { APIUrl } from '../../config';

export default function FollowsComponent({ userFollowing }) {
  return (
    <NavLink to={`/user/${userFollowing.username}`}>
      <article
        className="border border-slate-700 rounded-xl bg-zinc-900 p-4 w-[350px] md:w-[500px] flex flex-row justify-between gap-2 my-2 shadow-black shadow-xl"
        style={{
          background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
          backgroundClip: 'padding-box',
        }}
      >
        <div className="flex justify-center items-center w-1/4">
          <img
            src={
              userFollowing?.photo
                ? `${APIUrl}/avatars/${userFollowing.photo}`
                : userDefaultIcon
            }
            className="w-12 h-12 rounded-full object-cover"
          />
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

import userDefaultIcon from '../../assets/icons/user-default-icon.svg';

export default function FollowersComponent({ userFollower }) {
  console.log(userFollower);
  return (
    <article
      className="border border-slate-700 rounded-xl bg-zinc-900 p-2 w-full md:w-[400px] flex flex-row justify-between gap-2 my-2"
      style={{
        background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
        backgroundClip: 'padding-box',
      }}
    >
      <div>
        <img src={userDefaultIcon} width={30} className="w-1/4" />
      </div>
      <main className="flex flex-col justify-center items-start w-3/4 text-sm">
        <p>
          {userFollower.name} {userFollower.surname}
        </p>
        <p>@{userFollower.username}</p>
        <p>{userFollower.description}</p>
      </main>
    </article>
  );
}

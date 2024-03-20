import userDefaulIcon from '../../assets/user-default-icon.png';

export default function FollowersComponent({ userFollower }) {
  return (
    <article
      className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-full lg:w-[300px] flex flex-row justify-between gap-2 my-2"
      style={{
        background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
        backgroundClip: 'padding-box',
      }}
    >
      <img src={userDefaulIcon} width={50} />
    </article>
  );
}

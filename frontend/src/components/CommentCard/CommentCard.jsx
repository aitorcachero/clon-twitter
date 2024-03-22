import { NavLink } from 'react-router-dom';

import formatDate from '../../utils/formatDate';
import userDefaulIcon from '../../assets/icons/user-default-icon.svg';
import getRandomColor from '../../utils/getRandomColor';

export default function CommentCard({ tweet }) {
  return (
    <article
      className="border-l-[5px] border-slate-700 bg-zinc-900 p-6 w-full md:w-[500px] flex flex-col justify-between gap-2 my-4"
      style={{
        background: 'linear-gradient(141deg, #080509, #1a171c, #080509)',
        backgroundClip: 'padding-box',
        borderColor: getRandomColor(),
      }}
    >
      <header className="flex flex-row justify-start items-center gap-2">
        <img src={userDefaulIcon} width={50} />

        <NavLink to={`/user/${tweet.username}`}>
          <span className="text-green-600 text-lg">@{tweet.username}</span>
        </NavLink>
      </header>

      <h2 className="text-slate-500 my-5 text-center text italic">
        "{tweet.COMMENT}"{/* <span>&rarr;</span> */}
      </h2>

      <p className="text-orange-600 text-sm text-end">
        {formatDate(tweet.createdAt)}
      </p>
    </article>
  );
}

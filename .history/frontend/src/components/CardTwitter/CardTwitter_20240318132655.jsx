// import './CardTweeter.css';
import { NavLink } from 'react-router-dom';
import commentsImg from '../../assets/icons/card-comments.svg';
import likesImg from '../../assets/icons/card-likes.svg';
import retweetsImg from '../../assets/icons/card-retweets.svg';
import formatDate from '../../utils/formatDate';

export default function CardTwitter({ tweet }) {
  return (
    <article
      className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-[500px] flex flex-col justify-between gap-2 my-4"
      style={{
        background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
        backgroundClip: 'padding-box',
      }}
    >
      <header className="flex flex-row justify-center items-center">
        <span className="text-white">
          {tweet.name} {tweet.surname} -{' '}
          <NavLink to={`/user/${tweet.username}`}>
            <span className="text-blue-600">@{tweet.username}</span>
          </NavLink>
        </span>
      </header>
      {/* <a href={''}> */}
      <h2 className="text-slate-500 my-5">
        {tweet.tweet_text}
        {/* <span>&rarr;</span> */}
      </h2>

      <p className="text-orange-600 text-sm">{formatDate(tweet.createdAt)}</p>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <img
            src={commentsImg}
            width={20}
            className="text-white hover:cursor-pointer"
          />
          <NavLink to={tweet.id}>
            <p>{tweet.comments}</p>
          </NavLink>
        </div>
        <div className="flex flex-row gap-2">
          <img src={retweetsImg} width={20} className="hover:cursor-pointer" />
          <p>{tweet.retweets}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img src={likesImg} width={20} className="hover:cursor-pointer" />
          <p>{tweet.likes}</p>
        </div>
      </div>
      {/* </a> */}
    </article>
  );
}
// import './CardTweeter.css';
import { NavLink } from 'react-router-dom';
import commentsImg from '../../assets/icons/card-comments.svg';
import likesImg from '../../assets/icons/card-likes.svg';
import retweetsImg from '../../assets/icons/card-retweets.svg';
import formatDate from '../../utils/formatDate';
import HeartLikeComponent from '../HeartLikeComponent/HeartLikeComponent';
import useAuth from '../../hooks/useAuth';
import { likesService } from '../../services/fetchData';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function CardTwitter({ tweet }) {
  const { authToken } = useAuth();
  const [likes, setLikes] = useState(tweet.like_count || 0);
  const handleLike = async (e) => {
    e.preventDefault();
    const { tweet_id } = tweet;
    try {
      const like = await likesService(tweet_id, authToken);
      if (like.status === 'ok' && like.message === '+')
        setLikes((prev) => prev + 1);
      if (like.status === 'ok' && like.message === '-')
        setLikes((prev) => prev - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article
      className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-full md:w-[500px] flex flex-col justify-between gap-2 my-2"
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

      <h2 className="text-slate-500 my-5 text-center">{tweet.tweet_text}</h2>

      <p className="text-orange-600 text-sm text-end">
        {formatDate(tweet.createdAt)}
      </p>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <NavLink to={`/tweet/${tweet?.tweet_id}`}>
            <img
              src={commentsImg}
              width={20}
              className="text-white hover:cursor-pointer"
            />
          </NavLink>
          <p>{tweet.comment_count}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img src={retweetsImg} width={40} className="hover:cursor-pointer" />
          <p>{tweet.retweets}</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div onClick={handleLike} className="hover:cursor-pointer">
            <HeartLikeComponent color={'#F91880'} />
          </div>
          <p>{likes}</p>
        </div>
      </div>
    </article>
  );
}

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
import { useEffect, useState } from 'react';
import checkTweetLikedByMe from '../../utils/checkTweetLikedByMe';

export default function CardTwitter({ tweet }) {
  console.log(tweet);
  const { authToken, authUser } = useAuth();
  const [likes, setLikes] = useState(tweet.like_count);
  const [likedByMe, setLikedByMe] = useState(false);
  const [colorHeart, setColorHeart] = useState('#FFFFFF');

  useEffect(() => {
    if (authUser) {
      const ARRAY_TWEETS = authUser?.arrayOfTweetLikes;
      const CHECK = checkTweetLikedByMe(ARRAY_TWEETS, tweet.tweet_id);
      setLikedByMe(CHECK);
    }
  }, [authUser]);

  const handleLike = async (e) => {
    e.preventDefault();
    const { tweet_id } = tweet;
    try {
      const like = await likesService(tweet_id, authToken);
      if (like.status === 'ok' && like.message === '+') {
        setLikes((prev) => prev + 1);
        setLikedByMe(true);
      }
      if (like.status === 'ok' && like.message === '-') {
        setLikes((prev) => prev - 1);
        setLikedByMe(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const COLOR_HEART = likedByMe ? '#F91880' : '#FFFFFF';

  // console.log(authUser);
  // const LIKED_BY_ME = authUser?.arrayOfTweetLikes.includes(tweet.tweet_id);
  // console.log(LIKED_BY_ME);
  return (
    <article
      className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-full lg:w-[500px] flex flex-col justify-between gap-2 my-2"
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
              width={30}
              className="text-white hover:cursor-pointer"
            />
          </NavLink>
          <p className="text-xl">{tweet.comment_count}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img src={retweetsImg} width={30} className="hover:cursor-pointer" />
          <p>{tweet.retweets}</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div onClick={handleLike} className="hover:cursor-pointer">
            <HeartLikeComponent color={COLOR_HEART} />
          </div>
          <p className="text-xl">{likes}</p>
        </div>
      </div>
    </article>
  );
}

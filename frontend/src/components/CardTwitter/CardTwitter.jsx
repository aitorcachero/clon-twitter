// import './CardTweeter.css';
import { NavLink, useNavigate } from 'react-router-dom';
import commentsImg from '../../assets/icons/card-comments.svg';
import retweetsImg from '../../assets/icons/card-retweets.svg';
import formatDate from '../../utils/formatDate';
import HeartLikeComponent from '../HeartLikeComponent/HeartLikeComponent';
import useAuth from '../../hooks/useAuth';
import { likesService } from '../../services/fetchData';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import checkTweetLikedByMe from '../../utils/checkTweetLikedByMe';
import userDefaulIcon from '../../assets/icons/user-default-icon.svg';
import { APIUrl } from '../../config';
import formatTweet from '../../utils/formatTweet';

export default function CardTwitter({ tweet }) {
  const { authToken, authUser } = useAuth();
  const [likes, setLikes] = useState(tweet.like_count);
  const [likedByMe, setLikedByMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      const ARRAY_TWEETS = authUser?.arrayOfTweetLikes;
      const CHECK = checkTweetLikedByMe(ARRAY_TWEETS, tweet.tweet_id);
      setLikedByMe(CHECK);
    }
  }, [authUser]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!authUser) {
      navigate('/login');
      return;
    }
    const { tweet_id } = tweet;

    if (likedByMe) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }

    setLikedByMe(!likedByMe);
    try {
      await likesService(tweet_id, authToken);
    } catch (error) {
      console.log(error);
    }
  };

  const COLOR_HEART = likedByMe ? '#F91880' : '#FFFFFF';

  return (
    <article
      className="border w-[350px] border-slate-700 rounded-xl bg-zinc-900 p-6  md:w-[500px] flex flex-col justify-between gap-2 my-2  shadow-black shadow-xl"
      style={{
        background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
        backgroundClip: 'padding-box',
      }}
    >
      <header className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <NavLink to={`/user/${tweet.username}`}>
            <img
              src={
                tweet?.photo
                  ? `${APIUrl}/avatars/${tweet.photo}`
                  : userDefaulIcon
              }
              className="w-12 h-12 rounded-full hover:cursor-pointer object-cover"
            />
          </NavLink>
          <NavLink to={`/user/${tweet.username}`}>
            <span className="text-green-600 text-lg">@{tweet.username}</span>
          </NavLink>
        </div>
        <p className="text-orange-600 text-sm text-end md:w-auto w-24">
          {formatDate(tweet.createdAt)}
        </p>
      </header>

      <h2 className="text-slate-500 my-5 text-center">
        {tweet.tweet_text.split(' ').map((word, i) => {
          if (word.startsWith('@')) {
            return (
              <NavLink
                to={`/user/${word.slice(1)}`}
                className="font-medium text-white hover:underline"
                key={i}
              >
                {word + ' '}
              </NavLink>
            );
          }
          if (word.startsWith('http' || 'https' || 'www')) {
            return (
              <a
                key={i}
                href={word}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:underline"
              >
                {word}
              </a>
            );
          }
          return word + ' ';
        })}
      </h2>

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

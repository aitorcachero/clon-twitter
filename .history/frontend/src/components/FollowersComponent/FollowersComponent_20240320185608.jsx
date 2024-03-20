export default function FollowersComponent({ userFollowers }) {
  return (
    <article
      className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-full lg:w-[500px] flex flex-col justify-between gap-2 my-2"
      style={{
        background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
        backgroundClip: 'padding-box',
      }}
    >
      <header className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <img src={userDefaulIcon} width={50} />

          <NavLink to={`/user/${tweet.username}`}>
            <span className="text-green-600 text-lg">@{tweet.username}</span>
          </NavLink>
        </div>
        <p className="text-orange-600 text-sm text-end">
          {formatDate(tweet.createdAt)}
        </p>
      </header>
      <NavLink to={`/tweet/${tweet?.tweet_id}`}>
        <h2 className="text-slate-500 my-5 text-center">{tweet.tweet_text}</h2>
      </NavLink>

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

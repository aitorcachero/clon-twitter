// import './CardTweeter.css';
import commentsImg from '../../assets/card-comments.svg';
import likesImg from '../../assets/card-likes.svg';
import retweetsImg from '../../assets/card-retweets.svg';

export default function CardTweeter({ tweet }) {
  return (
    <article className="border rounded-xlxl bg-zinc-900 p-6 w-96 flex flex-col justify-between gap-2">
      <h2>
        {tweet.name} {tweet.surname}
      </h2>
      {/* <a href={''}> */}
      <h2>
        {tweet.tweet_text}
        {/* <span>&rarr;</span> */}
      </h2>
      <p>@{tweet.username}</p>
      <p>{tweet.createdAt}</p>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <img src={commentsImg} width={20} className="text-white" />
          <p>{tweet.comments}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img src={retweetsImg} width={20} />
          <p>{tweet.retweets}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img src={likesImg} width={20} />
          <p>{tweet.likes}</p>
        </div>
      </div>
      {/* </a> */}
    </article>
  );
}

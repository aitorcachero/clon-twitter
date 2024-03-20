import './CardTweeter.css';

export default function CardTweeter({ tweet }) {
  return (
    <li className="link-card">
      <a href={''}>
        <h2>
          {tweet.tweet_text}
          <span>&rarr;</span>
        </h2>
        <p>@{tweet.username}</p>
        <p>{tweet.createdAt}</p>
      </a>
    </li>
  );
}

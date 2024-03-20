import React from 'react';

export default function CardTweeter({ tweet }) {
  return (
    <li class="link-card">
      <a href={href}>
        <h2>
          {tweet.text}
          <span>&rarr;</span>
        </h2>
        <p>@{tweet.username}</p>
      </a>
    </li>
  );
}

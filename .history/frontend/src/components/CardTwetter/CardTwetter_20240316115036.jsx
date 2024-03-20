import React from 'react';

export default function CardTwetter({ tweet }) {
  return (
    <li class="link-card">
      <a href={href}>
        <h2>
          {tweet.text}
          <span>@{tweet.username}</span>
        </h2>
        <p>@{tweet.username}</p>
      </a>
    </li>
  );
}

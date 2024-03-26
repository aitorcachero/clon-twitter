export default function formatTweet(tweet) {
  return tweet
    .split(' ')
    .map((word) => {
      if (word.startsWith('@')) {
        return `<NavLink="/user/${word.slice(
          1
        )}" className="text-bold">${word}</NavLink>`;
      }
      if (word.startsWith('http' || 'https' || 'www')) {
        return (
          <a href="${word}" target="_blank" rel="noopener noreferrer">
            {word}
          </a>
        );
      }
      return word;
    })
    .join(' ');
}

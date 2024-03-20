// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { TweetContext } from '../context/tweetContext.jsx';

const useTweet = () => {
  return useContext(TweetContext);
};

export default useTweet;

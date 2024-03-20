// Importamos los prop-types.
// import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos el nombre con el que guardamos el token en el localStorage.
import { userLocalStorageKey } from '../config';

import { toast } from 'react-toastify';
import { loginUserService, getUserProfileService } from '../services/fetchData';

// Creamos un contexto.
export const TweetContext = createContext(null);

// Creamos el componente provider del contexto.
export const TweetProvider = ({ children }) => {
  const toastError = (errMsg) => toast.error(errMsg);
  const toastSuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();

  const [tweets, setTweets] = useState(null);
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/tweets/')
      .then((results) => results.json())
      // .then((data) => console.log(data));
      .then((data) =>
        setTweets(data.data.sort((a, b) => b.createdAt - a.createdAt))
      );
  }, []);

  const getTweets = () => {
    fetch('http://localhost:3000/tweets/')
      .then((results) => results.json())
      // .then((data) => console.log(data));
      .then((data) =>
        setTweets(data.data.sort((a, b) => b.createdAt - a.createdAt))
      );
  };

  const getTweet = async (id) => {
    const tweet = await tweets?.find((x) => x.tweet_id === id);
    console.log(tweet);
    return tweet;
  };

  const getComments = (id) => {
    fetch(`http://localhost:3000/tweets/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data));
  };

  return (
    <TweetContext.Provider
      value={{
        tweets,
        setTweets,
        getTweets,
        getTweet,
        getComments,
        comments,

        // toastError,
        // toastSuccess,
        // navigate,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

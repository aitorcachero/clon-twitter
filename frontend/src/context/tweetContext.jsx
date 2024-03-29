// Importamos los prop-types.
// import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos el nombre con el que guardamos el token en el localStorage.
import { userLocalStorageKey } from '../config';

import { toast } from 'react-toastify';
import { loginUserService, getUserProfileService } from '../services/fetchData';
import { APIUrl } from '../config';

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
    fetch(`${APIUrl}/tweets/`)
      .then((results) => results.json())
      .then((data) =>
        setTweets(data.data.sort((a, b) => b.createdAt - a.createdAt))
      );
  }, []);

  const getTweets = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${APIUrl}/tweets/`);
      const data = await res.json();

      setTweets(data.data.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTweet = async (id) => {
    const tweet = await tweets?.find((x) => x.tweet_id === id);
    return tweet;
  };

  const getComments = (id) => {
    fetch(`${APIUrl}/tweets/comments/${id}`)
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
        loading,

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

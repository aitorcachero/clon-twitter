import { useState } from 'react';
import defaultUserIcon from '../../assets/icons/user-default-icon.svg';
import useAuth from '../../hooks/useAuth';
import useTweets from '../../hooks/useTweets';
import { createTweetService } from '../../services/fetchData';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

export default function WriteTweet({ tweets, setTweets }) {
  const { getTweets } = useTweets();
  const { authUser, authToken } = useAuth();
  const [text, setText] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText('');

    if (text.length === 0) return;
    if (text.length > 280) {
      setErrorText('Máximo 280 carácteres');
      return;
    }
    try {
      const createTweet = await createTweetService(text, authToken);

      if (createTweet.status === 'ok') getTweets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article
      className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-[500px] flex flex-col justify-between gap-2 my-4"
      style={{
        background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
        backgroundClip: 'padding-box',
      }}
    >
      <div className="flex flex-row justify-start items-center gap-2 px-4">
        <img src={defaultUserIcon} width={30} />
        <p>@{authUser.username}</p>
      </div>
      <main className="p-4">
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder="¿En que estás pensando?"
          className="block w-full h-24 px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 resize-none"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </main>
      <div className="flex flex-row justify-end items-center px-4 relative gap-6">
        <p>
          <span
            className={`${text.length > 280 ? 'text-red-600' : 'text-white'}`}
          >
            {text.length}
          </span>
          /280
        </p>
        <p className="absolute left-0 px-4 text-red-700">{errorText}</p>

        {/* <button onClick={handleSubmit}>Postear</button> */}
        <ButtonComponent text="Postear" click={() => handleSubmit()} />
      </div>
    </article>
  );
}

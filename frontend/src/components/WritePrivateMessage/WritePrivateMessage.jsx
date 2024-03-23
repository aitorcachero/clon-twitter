import React, { useState } from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';
import { toast } from 'react-toastify';

export default function WritePrivateMessage({ user, close }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [errorTitle, setErrorTitle] = useState();
  const [errorText, setErrorText] = useState();
  const { authToken } = useAuth();
  const { sendMessage, loader } = useUsers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const SENDING_USER_ID = user.id;
    const SEND_TITLE = title;
    const SEND_TEXT = text;
    if (SEND_TITLE.length === 0) {
      setErrorTitle('El título no puede estar vacío');
      return;
    }
    if (SEND_TITLE.length > 60) {
      setErrorTitle('El título no puede superar los 60 caracteres');
      return;
    }
    if (SEND_TEXT.length === 0) {
      setErrorText('El mensaje no puede estar vacío');
      return;
    }
    if (SEND_TEXT.length > 280) {
      setErrorText('El mensaje no puede superar los 280 caracteres');
      return;
    }
    const message = {
      to: SENDING_USER_ID,
      title: SEND_TITLE,
      text: SEND_TEXT,
      authToken,
    };

    try {
      const data = await sendMessage(message);

      if (data.status === 'ok') {
        toast.success(`Mensaje enviado a @${user.username} correctamente`);
        close();
      } else {
        toast.error(`Se ha producido un error al enviar el mensaje`);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-slate-900 z-10">
      <article
        className="border border-slate-700 rounded-xl bg-zinc-900 p-6 w-full md:w-[500px] flex flex-col justify-between gap-2 my-4 relative  shadow-black shadow-xl"
        style={{
          background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
          backgroundClip: 'padding-box',
        }}
      >
        <p
          className="absolute top-4 right-10 text-4xl hover:cursor-pointer"
          onClick={close}
        >
          X
        </p>
        <div className="flex flex-row justify-center items-center gap-2 px-4">
          <p className="text-left">Para: {user?.username}</p>
        </div>
        <main className="p-4 flex flex-col gap-5">
          <div>
            <label htmlFor="title" className="text-left">
              Título
            </label>
            <input
              name="title"
              maxLength={60}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Título del mensaje"
              className="block w-full h-10 px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 resize-none"
            ></input>
          </div>
          <div>
            <label htmlFor="description" className="text-left mt-4">
              Texto
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              maxLength={280}
              placeholder="¿Que le quieres decir?"
              className="block w-full h-24 px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 resize-none"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
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

          <ButtonComponent text="Enviar" click={(e) => handleSubmit(e)} />
        </div>
      </article>
    </div>
  );
}

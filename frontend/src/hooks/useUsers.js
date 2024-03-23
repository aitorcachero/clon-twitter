import { useState } from 'react';
import { APIUrl } from '../config';
import useAuth from './useAuth';

export default function useUsers() {
  const { authToken } = useAuth();
  const [loader, setLoader] = useState(false);
  const getUserInfo = async (user) => {
    try {
      setLoader(true);
      const data = await fetch(`${APIUrl}/users/${user}`);
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const sendMessage = async (message) => {
    try {
      setLoader(true);
      const res = await fetch(`${APIUrl}/users/message`, {
        method: 'POST',
        headers: {
          Authorization: message.authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: message.title,
          text: message.text,
          to: message.to,
        }),
      });

      const body = await res.json();

      return body;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const updateMessagePrivate = async (message_id) => {
    try {
      setLoader(true);
      const res = await fetch(`${APIUrl}/users/message`, {
        method: 'PUT',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: message_id }),
      });

      const body = await res.json();

      return body;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return { getUserInfo, loader, sendMessage, updateMessagePrivate };
}

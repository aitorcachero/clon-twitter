import { useState } from 'react';
import { APIUrl } from '../config';
import useAuth from './useAuth';
import {
  updateAvatarService,
  updateBioService,
  updatePasswordService,
} from '../services/fetchData';
import { toast } from 'react-toastify';

export default function useUsers() {
  const { authToken, setAuthUser } = useAuth();
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

  const deleteMessagePrivate = async (message_id) => {
    try {
      setLoader(true);
      const res = await fetch(`${APIUrl}/users/message`, {
        method: 'DELETE',
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

  const handleUpdateBio = async (bio) => {
    try {
      const updateBio = await updateBioService(bio, authToken);
      if (updateBio.status === 'error') {
        toast.error(updateBio.message);
      }
      if (updateBio.status === 'ok') {
        toast.success('Descripción actualizada');
        setAuthUser((prev) => ({ ...prev, description: bio }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    try {
      const updateAvatar = await updateAvatarService(formData, authToken);
      console.log(updateAvatar);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async (password, setPassword) => {
    if (password.newPassword !== password.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    try {
      const updatePassword = await updatePasswordService(
        password.oldPassword,
        password.newPassword,
        authToken
      );
      if (updatePassword.status === 'error') {
        toast.error(updatePassword.message);
      }
      if (updatePassword.status === 'ok') {
        toast.success(updatePassword.message);
        setPassword({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserInfo,
    loader,
    sendMessage,
    updateMessagePrivate,
    deleteMessagePrivate,
    handleUpdateBio,
    handleUpdateAvatar,
    handleUpdatePassword,
  };
}

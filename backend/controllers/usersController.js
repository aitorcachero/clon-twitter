import {
  comparePassword,
  generatePhotoName,
  hashPassword,
} from '../helpers/encrypters.js';
import usersModel from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import tweetsModel from '../models/tweetsModel.js';
import webp from 'webp-converter';
import savePhoto from '../utils/savePhoto.js';
import deletePhoto from '../utils/deletePhoto.js';
webp.grant_permission();

export default function usersController() {
  const createUser = async (req, res) => {
    const { username, password, email, name, surname, description } = req.body;
    try {
      // Comprobamos si el usuario existe
      const getUserByName = await usersModel().getUserByUsername(username);
      if (getUserByName && getUserByName.length > 0) {
        res.send({
          status: 'error',
          message: 'Ya existe un usuario con ese username',
        });
        return;
      }

      // Comprobamos si el email existe
      const getUserByEmail = await usersModel().getUserByEmail(email);
      if (getUserByName && getUserByEmail.length > 0) {
        res.send({
          status: 'error',
          message: 'Ya existe un usuario con ese correo electrónico',
        });
        return;
      }

      const encryptPassword = await hashPassword(password);
      const newUser = await usersModel().createUser(
        username,
        encryptPassword,
        email,
        name,
        surname,
        description
      );

      res.send({
        status: 'ok',
        userCreated: newUser,
      });
    } catch (error) {
      console.log('Ha habido un error en el controller', error);
    }
  };

  const authLoginUser = async (req, res) => {
    const id = req.user;

    try {
      const [getUser] = await usersModel().getUserById(id);

      if (getUser) {
        res.send({
          status: 'ok',
          data: getUser,
        });
        return;
      } else {
        res.send({
          status: 'error',
          message: 'No se encuentra el usuario.',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const getUser = await usersModel().getUserByUsername(username);

      if (getUser?.length === 0 || !getUser) {
        res.send({
          status: 'error',
          message: 'Creedenciales invalidas',
        });
        return;
      }
      const checkPassword = await comparePassword(password, getUser.password);

      if (!checkPassword) {
        res.send({
          status: 'error',
          message: 'Creedenciales invalidas',
        });
        return;
      }
      // const { id, username } = getUser;
      const tokenInfo = {
        id: getUser.id,
        username: getUser.username,
      };

      // Generamos el token.
      const token = jwt.sign(tokenInfo, SECRET, {
        expiresIn: '7d',
      });
      res.send({
        status: 'ok',
        token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByUsername = async (req, res) => {
    const { user } = req.params;
    try {
      const getUser = await usersModel().getUserByUsername(user);

      if (!getUser) {
        res.send({
          status: 'error',
          message: 'No se encuentra el usuario',
        });
        return;
      }

      const getTweets = await tweetsModel().getTweets(getUser.id);

      const getFollowers = await usersModel().getFollowers(getUser.id);

      const getFollowing = await usersModel().getFollows(getUser.id);

      res.status(200).send({
        user: getUser,
        tweets: getTweets,
        followers: getFollowers,
        following: getFollowing,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (req, res) => {
    const id = req.user;
    const { userId } = req.params;
    const userIdNumber = +userId;

    if (id !== userIdNumber) {
      res.send({
        status: 'error',
        message: 'No puedes eliminar a otro usuario',
      });
      return;
    }
    try {
      const deleteUser = await usersModel().deleteUser(id);

      if (deleteUser.affectedRows === 1) {
        res.send({ status: 'ok', message: 'Usuario eliminado correctamente' });
      } else {
        res.send({
          status: 'error',
          message: 'No se ha podido eliminar el usuario',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTopUsers = async (req, res) => {
    try {
      const getTopsUsers = await usersModel().getTopUsers();
      res.send(getTopsUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (req, res) => {
    const { title, text, to } = req.body;
    const from = req.user;
    try {
      const sendMessage = await usersModel().sendMessage(from, to, title, text);
      res.send({
        status: 'ok',
        data: sendMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessagePrivate = async (req, res) => {
    const { id } = req.body;
    try {
      const updateMessage = await usersModel().updateMessagePrivate(id);
      res.send({
        status: 'ok',
        data: updateMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessagePrivate = async (req, res) => {
    const { id } = req.body;
    try {
      const deleteMessage = await usersModel().deleteMessagePrivate(id);
      res.send({
        status: 'ok',
        data: deleteMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPassword = async (req, res) => {
    const id = req.user;
    const getUserPassword = await usersModel().getUserPassword(id);
    const { oldPassword, newPassword } = req.body;
    const checkPassword = await comparePassword(oldPassword, getUserPassword);
    if (!checkPassword) {
      res.send({
        status: 'error',
        message: 'La contraseña antigua no coincide',
      });
      return;
    }
    const encryptPassword = await hashPassword(newPassword);
    try {
      await usersModel().updateUserPassword(id, encryptPassword);
      res.send({
        status: 'ok',
        message: 'Contraseña actualizada correctamente',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAvatar = async (req, res) => {
    const id = req.user;
    const avatar = req?.files?.avatar;

    try {
      let hashedName = null;

      if (avatar) {
        hashedName = generatePhotoName();
        await savePhoto(req.files?.avatar, hashedName, 'avatars');
      }

      const [dataUser] = await usersModel().getUserById(id);

      const actualPhotoName = dataUser?.photo;
      console.log('actualPhotoName', actualPhotoName);
      if (actualPhotoName) {
        await deletePhoto(actualPhotoName, 'avatars');
      }
      await usersModel().updateUserAvatar(id, hashedName);
      res.send({
        status: 'ok',
        message: 'Avatar actualizado',
      });
    } catch (error) {
      console.log(error);
    }

    // try {
    //   // const updateUser = await usersModel().updateUserAvatar(id, avatar);
    //   // res.send({
    //   //   status: 'ok',
    //   //   data: updateUser,
    //   // });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const updateUserBio = async (req, res) => {
    const id = req.user;
    const { bio } = req.body;

    try {
      await usersModel().updateUserBio(id, bio);
      res.send({
        status: 'ok',
        data: bio,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createUser,
    authLoginUser,
    loginUser,
    getUserByUsername,
    deleteUser,
    getTopUsers,
    sendMessage,
    updateMessagePrivate,
    deleteMessagePrivate,
    updateUserPassword,
    updateUserAvatar,
    updateUserBio,
  };
}

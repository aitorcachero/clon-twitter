import { comparePassword, hashPassword } from '../helpers/encrypters.js';
import usersModel from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import tweetsModel from '../models/tweetsModel.js';

export default function usersController() {
  const createUser = async (req, res) => {
    const { username, password, email, name, surname, description } = req.body;
    try {
      // Comprobamos si el usuario existe
      const getUserByName = await usersModel().getUserByUsername(username);
      if (getUserByName.length > 0) {
        res.send({
          status: 'error',
          message: 'Ya existe un usuario con ese username',
        });
        return;
      }

      // Comprobamos si el email existe
      const getUserByEmail = await usersModel().getUserByEmail(email);
      if (getUserByEmail.length > 0) {
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

  const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const [getUser] = await usersModel().getUserByUsername(username);
      console.log(getUser);
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

  const getUserByUsename = async (req, res) => {
    const { user } = req.params;
    try {
      const [getUser] = await usersModel().getUserByUsername(user);
      const getTweets = await tweetsModel().getTweets(user.id);

      res.status(200).send({ user: getUser, tweets: getTweets });
    } catch (error) {}
  };

  const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
      const deleteUser = await usersModel().deleteUser(id);

      if (deleteUser.affectedRows === 1) {
        res.send('Usuario eliminado correctamente');
      } else {
        res.send('No existe el usuario');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, loginUser, getUserByUsename, deleteUser };
}
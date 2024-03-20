import db from '../db/dbConnect.js';

export default function usersModel() {
  const getUserById = async (id) => {
    try {
      const [user] = await db.query(
        `SELECT id, username, name, surname, photo, description, createdAt FROM users WHERE id = ?;`,
        [id]
      );
      const [arrayOfFollows] = await db.query(
        `SELECT followed_id FROM followers WHERE follower_id = ?`,
        [id]
      );
      console.log(...users, ...arrayOfFollows);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByUsername = async (name) => {
    try {
      const [user] = await db.query(`SELECT * FROM users WHERE username = ?;`, [
        name,
      ]);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [
        email,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (
    username,
    password,
    email,
    name,
    surname,
    description
  ) => {
    try {
      const [result] = await db.query(
        `INSERT INTO users (username, password, email, name, surname, description)
      VALUES (?,?,?,?,?,?)`,
        [username, password, email, name, surname, description]
      );
      return {
        id: result.insertId,
        username,
        email,
        name,
        surname,
        description,
      };
    } catch (error) {
      console.log(error);
    }
  };

  // const loginUser = async;

  const deleteUser = async (id) => {
    try {
      const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    deleteUser,
  };
}

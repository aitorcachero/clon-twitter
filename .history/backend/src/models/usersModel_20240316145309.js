import db from '../db/dbConnect.js';

export default function usersModel() {
  const getUserByUsername = async (name) => {
    try {
      const [result] = await db.query(
        `SELECT DISTINCT U.id, U.username, U.name, U.surname, (SELECT COUNT(follower_id) FROM followers WHERE follower_id = U.id) AS FOLLOWS, (SELECT COUNT(followed_id) FROM followers WHERE followed_id = U.id) AS followers
FROM users U
JOIN followers F
ON U.id = F.follower_id
WHERE U.username = ?;`,
        [name]
      );
      return result;
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

  const createUser = async (username, password, email, name, surname) => {
    try {
      const [result] = await db.query(
        `INSERT INTO users (username, password, email, name, surname)
      VALUES (?,?,?,?,?)`,
        [username, password, email, name, surname]
      );
      return { id: result.insertId, username, email, name, surname };
    } catch (error) {
      console.log(error);
    }
  };

  // const loginUser = async;

  const deleteUser = async (id) => {
    console.log('hola');
    try {
      const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return { getUserByUsername, getUserByEmail, createUser, deleteUser };
}
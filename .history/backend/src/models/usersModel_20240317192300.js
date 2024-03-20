import db from '../db/dbConnect.js';

export default function usersModel() {
  const getUserByUsername = async (name) => {
    console.log(name);
    try {
      const [result] = await db.query(
        `SELECT DISTINCT U.id, U.username, U.name, U.surname, U.createdAt, (SELECT COUNT(follower_id) FROM followers WHERE follower_id = U.id) AS follows, (SELECT COUNT(followed_id) FROM followers WHERE followed_id = U.id) AS followers
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

  return { getUserByUsername, getUserByEmail, createUser, deleteUser };
}

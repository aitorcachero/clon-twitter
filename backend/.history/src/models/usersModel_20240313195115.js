import db from '../db/dbConnect.js';

export default function usersModel() {
  const createModel = async (user) => {
    try {
      const { username, password, email, name, surname } = user;
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

  const deleteModel = async (id) => {
    try {
      const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return { createModel, deleteModel };
}

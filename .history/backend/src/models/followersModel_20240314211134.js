import db from '../db/dbConnect.js';

export default function followersModel() {
  const checkFollowsById = (id) => {
    try {
      const [result] = db.query(`SELECT * FROM followers WHERE id = ?`, [id]);
      return result;
    } catch (error) {}
  };

  return { checkFollowsById };
}

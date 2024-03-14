import db from '../db/dbConnect.js';

export default function followersModel() {
  const getFollowsById = (id) => {
    try {
      const [result] = db.query(`SELECT * FROM followers WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const checkFollows = (follower, followed) => {
    try {
      const [result] = db.query(
        `SELECT * FROM followers WHERE follower_id = ? AND followed_id = ?`,
        [follower, followed]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return { getFollowsById };
}

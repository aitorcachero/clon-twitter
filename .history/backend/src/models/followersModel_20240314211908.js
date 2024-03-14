import db from '../db/dbConnect.js';

export default function followersModel() {
  const getFollowsById = async (id) => {
    try {
      const [result] = await db.query(`SELECT * FROM followers WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const checkFollows = async (follower, followed) => {
    try {
      const [result] = await db.query(
        `SELECT * FROM followers WHERE follower_id = ? AND followed_id = ?`,
        [follower, followed]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async (follower, followed) => {
    try {
      const [result] = await db.query(`INSERT INTO followers (follower_id, followed_id) VALUES (?, ?)`, [follower, followed])
    } catch (error) {

    }
  }

  const unfollowUser = (follower, followed) => {
    try {
      const [result] = await db.query(``)
    } catch (error) {

    }
  }

  return { getFollowsById, checkFollows };
}

import db from '../db/dbConnect.js';

export default function tweetsModel() {
  const getTweets = async (id) => {
    console.log('AAAAAAAAAA');
    try {
      if (!id) {
        const [result] = await db.query('SELECT * FROM tweets');
        return result;
      } else {
        const [result] = await db.query(
          'SELECT * FROM tweets WHERE tweet_id = ?',
          [id]
        );
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTweet = async (user, text) => {
    try {
      const [result] = await db.query(
        `INSERT INTO tweets (user_id, tweet_text) VALUES (?,?)`,
        [user, text]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTweet = async (id) => {
    try {
      const [result] = await db.query(`DELETE FROM tweets WHERE tweet_id = ?`, [
        id,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return { getTweets, createTweet, deleteTweet };
}

import db from '../db/dbConnect.js';

export default function tweetsModel() {
  const getAllTweets = async () => {
    try {
      const [result] = db.query('SELECT * FROM tweets');
      return result;
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

  return { getAllTweets, createTweet };
}

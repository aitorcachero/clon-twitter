import db from '../db/dbConnect.js';

export default function tweetsModel() {
  const getTweets = async (id) => {
    try {
      if (!id) {
        const [result] = await db.query(
          'SELECT tweets.tweet_id, tweets.user_id, tweets.tweet_text, tweets.likes, tweets.retweets, tweets.comments, tweets.createdAt, users.id, users.username, users.name, users.surname FROM tweets, users ORDER BY tweets.createdAt DESC ;'
        );
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

  const getTweetsByUsername = async (username) => {
    try {
      const result = await db.query(
        `SELECT * FROM tweets WHERE user_id = (SELECT id FROM users WHERE username = ?)`,
        [username]
      );

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getTweetComments = async (id) => {
    try {
      const [result] = await db.query(
        `SELECT C.id, C.tweet_id, C.COMMENT, C.createdAt, U.username FROM comments C JOIN users U WHERE tweet_id = ?`,
        [id]
      );
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
      return error;
    }
  };

  const createComment = async (t_id, u_id, text) => {
    try {
      const [result] = await db.query(
        `INSERT INTO comments (tweet_id, user_id, comment) VALUES (?,?,?)`,
        [t_id, u_id, text]
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // const getComments = async (id) => {
  //   try {
  //     const [result] = await db.query(
  //       `SELECT * FROM comments, users WHERE tweet_id = ?`,
  //       [id]
  //     );
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  return {
    getTweets,
    getTweetsByUsername,
    getTweetComments,
    createTweet,
    createComment,
    deleteTweet,
  };
}

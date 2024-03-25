import db from '../db/dbConnect.js';

export default function usersModel() {
  const getUserById = async (id) => {
    try {
      const [user] = await db.query(
        `SELECT id, username, name, surname, photo, description, createdAt FROM users WHERE id = ?;`,
        [id]
      );

      if (user.length === 0) return [];

      const [privateMessages] = await db.query(
        `SELECT P.message_id, P.title, P.text, P.createdAt, P.read, U.username AS from_username, U.photo  FROM private_messages P JOIN users U ON P.from_user = U.id WHERE to_user = ? ORDER BY P.read = 0  DESC, P.createdAt DESC;`,
        [id]
      );

      const [arrayOfFollows] = await db.query(
        `SELECT followed_id FROM followers WHERE follower_id = ?`,
        [id]
      );

      const [arrayOfLikes] = await db.query(
        `SELECT tweet_id FROM likes WHERE user_id = ?`,
        [id]
      );

      user[0].arrayOfFollows = arrayOfFollows
        .map((x) => Object.values(x))
        .flat();
      user[0].arrayOfTweetLikes = arrayOfLikes
        .map((x) => Object.values(x))
        .flat();
      user[0].privateMessages = privateMessages;

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
      if (user.length === 0) return null;
      const ID = user[0].id;
      const [follows] = await db.query(
        `SELECT follower_id FROM followers WHERE follower_id = ? `,
        [ID]
      );
      const [followers] = await db.query(
        `SELECT followed_id FROM followers WHERE followed_id = ?`,
        [ID]
      );
      user[0].arrayOfFollows = follows.map((x) => Object.values(x)).flat();
      user[0].arrayOfFollowers = followers.map((x) => Object.values(x)).flat();
      return user[0];
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPassword = async (id) => {
    try {
      const [result] = await db.query(
        `SELECT password FROM users WHERE id = ?`,
        [id]
      );
      const { password } = result[0];
      return password;
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

  const getFollowers = async (id) => {
    try {
      const [followers] = await db.query(
        `SELECT F.follower_id, U.username, U.name, U.surname, U.photo, U.description FROM followers F LEFT JOIN users U ON F.follower_id = U.id WHERE followed_id = ?`,
        [id]
      );
      return followers;
    } catch (error) {
      console.log(error);
    }
  };

  const getFollows = async (id) => {
    try {
      const [follows] = await db.query(
        `SELECT F.followed_id, U.username, U.name, U.surname, U.photo, U.description FROM followers F LEFT JOIN users U ON F.followed_id = U.id WHERE follower_id = ?`,
        [id]
      );
      return follows;
    } catch (error) {
      console.log(error);
    }
  };

  const getTopUsers = async () => {
    try {
      const [topFollowers] = await db.query(
        `SELECT U.id, U.username, U.name, U.surname, U.photo, U.description, COUNT(F.follower_id) as followers FROM users U LEFT JOIN followers F ON U.id = F.follower_id GROUP BY U.id ORDER BY followers DESC LIMIT 3`
      );

      const [topFollowings] = await db.query(
        `SELECT U.id, U.username, U.name, U.surname, U.photo, U.description, COUNT(F.followed_id) as following FROM users U LEFT JOIN followers F ON U.id = F.followed_id GROUP BY U.id ORDER BY following DESC LIMIT 3`
      );

      const [topTweets] = await db.query(
        `SELECT U.id, U.username, U.name, U.surname, U.photo, U.description, COUNT(T.user_id) as tweets FROM users U LEFT JOIN tweets T ON U.id = T.user_id GROUP BY U.id ORDER BY tweets DESC LIMIT 3`
      );
      const [topLikes] = await db.query(
        `SELECT U.id, U.username, U.name, U.surname, U.photo, U.description, COUNT(L.user_id) as likes FROM users U LEFT JOIN likes L ON U.id = L.user_id GROUP BY U.id ORDER BY likes DESC LIMIT 3`
      );
      return { topFollowers, topFollowings, topTweets, topLikes };
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (from, to, title, text) => {
    try {
      const [result] = await db.query(
        `INSERT INTO private_messages (from_user, to_user, title, text) VALUES (?,?,?,?)`,
        [from, to, title, text]
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessagePrivate = async (id) => {
    try {
      const [result] = await db.query(
        'UPDATE private_messages SET `read` = 1 WHERE message_id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessagePrivate = async (id) => {
    try {
      const [result] = await db.query(
        'DELETE FROM private_messages WHERE message_id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserBio = async (id, bio) => {
    try {
      const [result] = await db.query(
        'UPDATE users SET description = ? WHERE id = ?',
        [bio, id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPassword = async (id, password) => {
    try {
      const [result] = await db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [password, id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAvatar = async (id, photo) => {
    try {
      const [result] = await db.query(
        'UPDATE users SET photo = ? WHERE id = ?',
        [photo, id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserById,
    getUserByUsername,
    getUserPassword,
    getUserByEmail,
    createUser,
    deleteUser,
    getFollowers,
    getFollows,
    getTopUsers,
    sendMessage,
    updateMessagePrivate,
    deleteMessagePrivate,
    updateUserBio,
    updateUserPassword,
    updateUserAvatar,
  };
}

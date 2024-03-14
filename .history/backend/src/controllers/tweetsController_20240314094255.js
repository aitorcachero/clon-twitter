import tweetsModel from '../models/tweetsModel.js';
export default function tweetsController() {
  const getAllTweets = async (req, res) => {
    try {
      const getTweets = tweetsModel().getAllTweets();
      res.send({
        status: 'ok',
        data: getTweets,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createTweet = async (req, res) => {
    const userId = req.user;
    const { text } = req.body;
    if (!text || text === '') {
      res.send({
        status: 'error',
        message: 'El tweet no puede estar vacio.',
      });
      return;
    }

    try {
      await tweetsModel().createTweet(userId, text);
      res.send({
        status: 'ok',
        data: { user: userId, texto: text },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllTweets, createTweet };
}

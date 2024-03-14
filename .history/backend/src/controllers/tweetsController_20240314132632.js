import tweetsModel from '../models/tweetsModel.js';
export default function tweetsController() {
  const getAllTweets = async (req, res) => {
    try {
      const getTweets = await tweetsModel().getTweets();
      res.send({
        status: 'ok',
        data: getTweets,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTweetById = async (req, res) => {
    const { id } = req.params;
    try {
      const getTweet = await tweetsModel().getTweets(id);
      if (getTweet.length > 0) {
        res.send({
          status: 'ok',
          data: getTweet,
        });
      } else {
        res.send({
          status: 'error',
          message: 'No existe el tweet',
        });
      }
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

  const deleteTweet = async (req, res) => {
    const { id } = req.body;
    try {
      const getTweet = await tweetsModel().getTweets(id);
      console.log(getTweet);
      if (getTweet.length === 0) {
        res.send({
          status: 'error',
          message: 'No existe el tweet',
        });
      } else {
        const deleteTweet = await tweetsModel().deleteTweet(id);
        res.send({
          status: 'ok',
          message: 'Tweet eliminado',
        });
        console.log(deleteTweet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllTweets, getTweetById, createTweet, deleteTweet };
}

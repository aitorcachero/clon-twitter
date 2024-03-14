import tweetsModel from '../models/tweetsModel.js';
export default function tweetsController() {
  const createTweet = async (req, res) => {
    const userId = req.user;
    const { text } = req.body;
    if (!text || text === '') {
      res.send({
        status: 'error',
        message: 'El tweet no puede estar vacio.',
      });
    }

    try {
      const insertTweet = tweetsModel().createTweet(userId, text);
    } catch (error) {
      console.log(error);
    }
  };

  return { createTweet };
}

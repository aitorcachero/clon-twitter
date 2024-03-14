import tweetsModel from '../models/tweetsModel.js';
export default function tweetsController() {
  const createTweet = async (req, res) => {
    const userId = req.user;
    const { text } = req.body;

    try {
      const insertTweet = tweetsModel().createTweet(userId);
    } catch (error) {
      console.log(error);
    }
  };

  return { createTweet };
}

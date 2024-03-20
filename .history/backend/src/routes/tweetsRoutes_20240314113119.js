import express from 'express';
import authUser from '../middlewares/authUser.js';
import tweetsController from '../controllers/tweetsController.js';

const router = express.Router();

router.get('/', tweetsController().getAllTweets);
router.post('/', authUser, tweetsController().createTweet);
router.delete('/', authUser);

export default router;
import express from 'express';
import authUser from '../middlewares/authUser';
import followersController from '../controllers/followersController';

const router = express.Router();

router.post('/', authUser, followersController().followFunction);

export default router;

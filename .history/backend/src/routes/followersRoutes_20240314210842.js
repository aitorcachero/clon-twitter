import express from 'express';
import authUser from '../middlewares/authUser.js';
import followersController from '../controllers/followersController.js';

const router = express.Router();

router.put('/', authUser, followersController().followFunction);

export default router;

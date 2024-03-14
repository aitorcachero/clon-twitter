import express from 'express';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/', authUser);
export default router;

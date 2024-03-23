import express from 'express';
import usersController from '../controllers/usersController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.get('/authToken', authUser, usersController().authLoginUser);
router.get('/users/tops', usersController().getTopUsers);
router.get('/:user', usersController().getUserByUsername);
router.post('/', usersController().createUser);
router.post('/login', usersController().loginUser);
router.post('/message', authUser, usersController().sendMessage);
router.put('/message', authUser, usersController().updateMessagePrivate);
router.delete('/', usersController().deleteUser);

export default router;

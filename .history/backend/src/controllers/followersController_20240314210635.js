import usersModel from '../models/usersModel.js';

export default function followersController() {
  const followFunction = async (req, res) => {
    // Chequeamos que el user no se de follow a si mismo
    const idAuth = req.user;
    const { username } = req.body;
    try {
      const [user] = await usersModel().getUserByUsername(username);
      if (user.length === 0) {
        res.send({
          status: 'error',
          message: 'El usuario no existe',
        });
        return;
      }
      if (user.id === idAuth) {
        res.send({
          status: 'error',
          message: 'No puedes seguirte a ti mismo',
        });
        return;
      }
      console.log(user);
    } catch (error) {}
  };

  return { followFunction };
}

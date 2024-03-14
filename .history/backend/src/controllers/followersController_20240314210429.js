import usersModel from '../models/usersModel.js';

export default function followersController() {
  const followFunction = async (req, res) => {
    // Chequeamos que el user no se de follow a si mismo
    const idAuth = req.user;
    const { username } = req.body;
    try {
      const user = await usersModel().getUserByUsername(username);
      console.log(user);
    } catch (error) {}
  };

  return { followFunction };
}

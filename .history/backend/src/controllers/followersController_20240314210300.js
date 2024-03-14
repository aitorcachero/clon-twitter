export default function followersController() {
  const followFunction = (req, res) => {
    // Chequeamos que el user no se de follow a si mismo
    const idAuth = req.user;
    const {username} = req.body
    try {
      const user =
    } catch (error) {

    }
  };

  return { followFunction };
}

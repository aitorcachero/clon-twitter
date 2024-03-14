export default function followersController() {
  const followFunction = (req, res) => {
    // Chequeamos que el user no se de follow a si mismo

    const idAuth = req.user;
    // console.log(idAuth);
  };

  return { followFunction };
}

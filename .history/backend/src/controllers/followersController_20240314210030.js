export default function followersController() {
  const followFunction = () => {
    // Chequeamos que el user no se de follow a si mismo
    const idAuth = req.user.id;
    console.log(idAuth);
  };

  return { followFunction };
}
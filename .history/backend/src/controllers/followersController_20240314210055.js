export default function followersController() {
  const followFunction = () => {
    // Chequeamos que el user no se de follow a si mismo
    console.log(req.user);
    // const idAuth = req.user.id;
    // console.log(idAuth);
  };

  return { followFunction };
}

export default function authUser(req, res, next) {
  const auth = req.headers.authorization;
  console.log(auth);
  res.send('Holi');
}

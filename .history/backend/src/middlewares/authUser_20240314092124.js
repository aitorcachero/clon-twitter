export default function authUser(req, res, next) {
  const token = req.headers.authorization;
  console.log(auth);
  res.send('Holi');
}

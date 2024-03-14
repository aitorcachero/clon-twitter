export default function authUser(req, res, next) {
  const auth = req.header.authorization;
  console.log(auth);
  res.send('Holi');
}

export default function authUser(req, res, next) {
  const auth = req.header.authorization;
  res.send('Holi');
}

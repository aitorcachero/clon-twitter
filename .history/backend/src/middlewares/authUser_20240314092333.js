export default function authUser(req, res, next) {
  const token = req?.headers?.authorization;
  if (!token) {
    res.send({
      status: 'error',
      message: 'No estás autorizado',
    });
  }
  console.log(token);
  res.send('Holi');
}

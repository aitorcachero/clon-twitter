// Importamos las dependencias
import jwt from 'jsonwebtoken';

// Importamos las configuraciones
import { SECRET } from '../../config.js';

export default async function authUser(req, res, next) {
  const authorization = req?.headers?.authorization;
  if (!authorization) {
    res.send({
      status: 'error',
      message: 'No estás autorizado',
    });
    return;
  }
  try {
  } catch (error) {}
  console.log(token);
  res.send('Holi');
}

import express from 'express';
import cors from 'cors';

//Routes

import usersRoutes from './routes/usersRoutes.js';
import tweetsRouter from './routes/tweetsRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', usersRoutes);

app.listen(3000, () =>
  console.log('Servidor funcionando en http://localhost:3000')
);

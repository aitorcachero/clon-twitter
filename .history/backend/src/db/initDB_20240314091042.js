import db from './dbConnect.js';
// Importamos los colores para la consola
import {
  FgLightBlue,
  FgLightGreen,
  FgLightYellow,
  FgLightMagenta,
  FgLightRed,
} from '../helpers/colorsNode.js';

async function initDb() {
  try {
    console.log(FgLightYellow, '---Eliminado tablas---');
    await db.query('DROP TABLE IF EXISTS users, tweets, followers');
    console.log(FgLightGreen, 'Tablas eliminadas con éxito');
  } catch (error) {
    console.log(FgLightRed, 'Error al eliminar las tablas', error);
    process.exit();
  }

  try {
    console.log(FgLightMagenta, '---Creando tabla de usuarios---');
    const result = await db.query(`
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(150) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT (NOW())
    );`);
    console.log('Tablas de usuarios creada con éxito', result);
  } catch (error) {
    console.log(FgLightRed, 'Error al crear la tabla de usuarios', error);
    process.exit();
  }

  try {
    console.log(FgLightMagenta, '---Creando tabla de tweets---');

    await db.query(`
    CREATE TABLE tweets(
    tweet_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tweet_text VARCHAR(280) NOT NULL,
    likes INT DEFAULT 0,
    retweets INT DEFAULT 0,
    comments INT DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT (NOW()),
    FOREIGN KEY (user_id) REFERENCES users(id)
    );`);
    console.log('Tablas de tweets creada con éxito', result);
  } catch (error) {
    console.log(FgLightRed, 'Error al crear la tabla de tweets', error);
  }

  try {
    console.log(FgLightMagenta, '---Creando tabla de followers---');
    const result = await db.query(`
    CREATE TABLE followers (
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    FOREIGN KEY(follower_id) REFERENCES users(id),
    PRIMARY KEY(follower_id, followed_id));
    `);
    console.log('Tablas de followers creada con éxito', result);
  } catch (error) {
    console.log(FgLightRed, 'Error al crear la tabla de followers', error);
  }

  process.exit();
}

initDb();

// USE acachero_twitter_db;

// DROP TABLE IF EXISTS users, tweets, followers

// CREATE TABLE users (
// 	id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(50) NOT NULL UNIQUE,
//     password VARCHAR(150) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     name VARCHAR(100) NOT NULL,
//     surname VARCHAR(150) NOT NULL,
//     createdAt TIMESTAMP NOT NULL DEFAULT (NOW())
// );

// CREATE TABLE tweets(
// 	tweet_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     tweet_text VARCHAR(280) NOT NULL,
//     likes INT DEFAULT 0,
//     retweets INT DEFAULT 0,
//     comments INT DEFAULT 0,
//     createdAt TIMESTAMP NOT NULL DEFAULT (NOW()),
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE followers (
// 	follower_id INT NOT NULL,
//     followed_id INT NOT NULL,
//     FOREIGN KEY(follower_id) REFERENCES users(id),
//     PRIMARY KEY(follower_id, followed_id)
// );

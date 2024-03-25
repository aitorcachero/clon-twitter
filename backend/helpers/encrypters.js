import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

const hashPassword = async (password) => {
  const salt = await bcrypt.hash(password, 10);
  return salt;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

function generatePhotoName() {
  return `${v4()}.webp`;
}

export { hashPassword, comparePassword, generatePhotoName };

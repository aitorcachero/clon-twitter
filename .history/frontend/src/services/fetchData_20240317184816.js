import { toast } from 'react-toastify';

const getUserProfileService = async (token) => {
  try {
    const getData = await fetch('http://localhost:3000/user/profile', {
      headers: {
        Authorization: token,
      },
    });
    const res = await getData.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const loginUserService = async (username, password) => {
  try {
    const getData = await fetch('http://localhost:3000/users/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',

      body: JSON.stringify({
        username,
        password,
      }),
    });
    const res = await getData.json();
    return res;
  } catch (error) {
    toast.error(error);
  }
};

const registerUserService = async (
  username,
  password,
  email,
  name,
  surname,
  description
) => {
  try {
    const getData = await fetch('http://localhost:3000/users/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',

      body: JSON.stringify({
        username,
        password,
        email,
        name,
        surname,
        description,
      }),
    });
    const res = await getData.json();
    return res;
  } catch (error) {
    toast.error(error);
  }
};

export { getUserProfileService, registerUserService };

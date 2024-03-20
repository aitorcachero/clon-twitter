import { toast } from 'react-toastify';

const getUserProfileService = async (token) => {
  try {
    const getData = await fetch('http://localhost:3000/users/authToken', {
      headers: {
        Authorization: token,
      },
    });
    const res = await getData.json();

    return res;
  } catch (error) {
    console.log(error);
  }
};

const loginUserService = async (username, password) => {
  const res = await fetch(`http://localhost:3000/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const body = await res.json();
  console.log(body);

  return body;
};

const createTweetService = async (text, token) => {
  const res = await fetch(`http://localhost:3000/tweets/`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const body = await res.json();

  return body;
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

export {
  getUserProfileService,
  createTweetService,
  loginUserService,
  registerUserService,
};

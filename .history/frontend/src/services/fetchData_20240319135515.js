import { toast } from 'react-toastify';
import { APIUrl } from '../config';

const getTweetService = async (id) => {
  try {
    const getData = await fetch(`http://localhost:3000/tweets/${id}`);
    const res = await getData.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserProfileService = async (token) => {
  try {
    const getData = await fetch(`${APIUrl}/users/authToken`, {
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
  const res = await fetch(`${APIUrl}/users/login`, {
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
  const res = await fetch(`${APIUrl}/tweets/`, {
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

const createCommentService = async (tweet_id, text, token) => {
  const res = await fetch(`${APIUrl}/tweets/comments/`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tweet_id, text }),
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
    const getData = await fetch(`${APIUrl}/users/`, {
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

const followUserService = async (username) => {
  const res = await fetch(`${APIUrl}/follow/`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  const body = await res.json();

  return body;
};

export {
  getTweetService,
  getUserProfileService,
  createTweetService,
  loginUserService,
  createCommentService,
  registerUserService,
  followUserService,
};

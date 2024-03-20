import { APIUrl } from '../config';

export default function useUsers() {
  const getUserInfo = async (user) => {
    try {
      const data = await fetch(`${APIUrl}/users/${user}`);
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return { getUserInfo };
}

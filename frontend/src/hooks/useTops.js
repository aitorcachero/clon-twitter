import { useState } from 'react';
import { APIUrl } from '../config.js';

export default function useTops() {
  const [loader, setLoader] = useState(false);
  const getTops = async () => {
    try {
      setLoader(true);
      const data = await fetch(`${APIUrl}/users/users/tops`);
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return { getTops, loader };
}

import { useEffect, useState } from 'react';

export default function useUsers() {
  const getUserInfo = async (user) => {
    try {
      const user = await fetch(`http://localhost:3000/users/${user}`);
      const json = await data.json();

      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return { getUserInfo };
}

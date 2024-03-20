import { useEffect, useState } from 'react';

export default function useUsers() {
  const getUser = async (user) => {
    // fetch(`http://localhost:3000/users/${user}`)
    //   .then((result) => result.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
    try {
      const data = await fetch(`http://localhost:3000/users/${user}`);
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return { getUser };
}

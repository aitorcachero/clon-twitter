import { useEffect, useState } from 'react';

export default function useUsers() {
  const getUser = async (user) => {
    console.log(user);
    fetch(`http://localhost:3000/users/${user}`)
      .then((result) => result.json())
      .then((data) => data);
  };

  return { getUser };
}

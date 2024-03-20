import { useEffect, useState } from 'react';

export default function useUsers() {
  const { user, setUser } = useState();
  const getUser = async (user) => {
    fetch(`http://localhost:3000/users/${user}`)
      .then((result) => result.json())
      .then((data) => data);
  };

  return { getUser };
}

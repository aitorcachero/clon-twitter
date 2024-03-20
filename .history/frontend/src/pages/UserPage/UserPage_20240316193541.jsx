import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';

export default function UserPage() {
  const [fullUser, setFullUser] = useState();
  const { user } = useParams();
  const { getUser } = useUsers();
  useEffect(() => {
    setFullUser(getUser(user));
  }, []);

  return <div className="w-full flex justify-center items-center">{}</div>;
}

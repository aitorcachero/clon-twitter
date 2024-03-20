import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';

export default function UserPage() {
  const { user } = useParams();
  const getUser = useUsers();
  useEffect(() => {
    getUser(user);
  }, []);

  return <div>UserPage</div>;
}

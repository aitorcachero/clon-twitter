import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';
import CardUser from '../../components/CardUser/CardUser';

export default function UserPage() {
  const [fullUser, setFullUser] = useState(null);
  const { user } = useParams();
  const { getUser } = useUsers();
  useEffect(() => {
    const getUser = async () => {
      const data = await getUser(user);
      setFullUser(data);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      {fullUser && <CardUser user={fullUser} />}
    </div>
  );
}

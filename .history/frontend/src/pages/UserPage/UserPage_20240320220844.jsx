import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';
import CardUser from '../../components/CardUser/CardUser';

export default function UserPage() {
  const [fullUser, setFullUser] = useState(null);
  const { user } = useParams();
  const { getUserInfo } = useUsers();

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo(user);

      setFullUser(data);
    };

    getData();
  }, [user]);

  return (
    <div className="w-full flex justify-center items-center p-4 md:p-0">
      {fullUser && <CardUser fullUser={fullUser} />}
    </div>
  );
}

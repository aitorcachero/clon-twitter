import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';
import CardUser from '../../components/CardUser/CardUser';
import ProgressLoader from '../../components/ProgressLoader/ProgressLoader';

export default function UserPage() {
  const [fullUser, setFullUser] = useState(null);
  const { user } = useParams();
  const { getUserInfo, loader } = useUsers();

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo(user);

      setFullUser(data);
    };

    getData();
  }, [user]);

  return (
    <div className="w-full flex justify-center items-center p-4 md:p-0">
      {loader && (
        <div className="w-96 h-96 flex justify-center items-center">
          <ProgressLoader />
        </div>
      )}
      {fullUser && <CardUser fullUser={fullUser} />}
    </div>
  );
}

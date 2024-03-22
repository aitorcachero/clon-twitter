import { useState, useEffect } from 'react';
import imgPageContruction from '../../assets/site_construction.png';
import { APIUrl } from '../../config';
import TopsFollowersComponent from '../../components/TopsFollowersComponent/TopsFollowersComponent';
import TopsFollowingsComponent from '../../components/TopFollowingsComponent/TopFollowingsComponent';
import TopsTweetsComponent from '../../components/TopsTweetsComponen/TopsTweetsComponen';
import TopsLikesComponent from '../../components/TopsLikesComponent/TopsLikesComponent';

export default function TopUsersPage() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      const response = await fetch(`${APIUrl}/users/users/tops`);
      const data = await response.json();

      setTopUsers(data);
    };

    getTopUsers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 justify-center items-center p-10">
      {topUsers && <TopsTweetsComponent list={topUsers.topTweets} />}
      {topUsers && <TopsFollowersComponent list={topUsers.topFollowers} />}
      {topUsers && <TopsFollowingsComponent list={topUsers.topFollowings} />}
      {topUsers && <TopsLikesComponent list={topUsers.topLikes} />}
    </div>
  );
}

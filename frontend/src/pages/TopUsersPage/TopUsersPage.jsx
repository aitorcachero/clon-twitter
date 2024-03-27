import { useState, useEffect } from 'react';
import imgPageContruction from '../../assets/site_construction.png';
import { APIUrl } from '../../config';
import TopsFollowersComponent from '../../components/TopsFollowersComponent/TopsFollowersComponent';
import TopsFollowingsComponent from '../../components/TopFollowingsComponent/TopFollowingsComponent';
import TopsTweetsComponent from '../../components/TopsTweetsComponen/TopsTweetsComponen';
import TopsLikesComponent from '../../components/TopsLikesComponent/TopsLikesComponent';
import useTops from '../../hooks/useTops';
import ProgressLoader from '../../components/ProgressLoader/ProgressLoader';

export default function TopUsersPage() {
  const { getTops, loader } = useTops();
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      const response = await getTops();
      setTopUsers(response);
    };

    getTopUsers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 justify-center items-center  md:p-0">
      <div className="grid lg:grid-cols-2 gap-6 ">
        {loader && <ProgressLoader />}
        {topUsers && <TopsTweetsComponent list={topUsers.topTweets} />}
        {topUsers && <TopsFollowersComponent list={topUsers.topFollowers} />}
        {topUsers && <TopsFollowingsComponent list={topUsers.topFollowings} />}
        {topUsers && <TopsLikesComponent list={topUsers.topLikes} />}
      </div>
    </div>
  );
}

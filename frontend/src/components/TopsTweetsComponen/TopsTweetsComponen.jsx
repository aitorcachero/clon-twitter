import { NavLink } from 'react-router-dom';
import topsColorText from '../../utils/topsColorText';
import getIcon from '../../utils/topsMedals';

export default function TopsTweetsComponent({ list }) {
  return (
    <>
      {list && list.length > 0 && (
        <div
          className="border w-[350px] border-slate-700 rounded-xl bg-zinc-900 p-10  md:w-[500px] flex flex-col justify-between gap-2 my-2  shadow-black shadow-xl"
          style={{
            background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
            backgroundClip: 'padding-box',
          }}
        >
          <div className="w-full rounded-lg bg-black p-4 mb-4">
            <h2 className="text-center">TOP TWEETERS</h2>
          </div>
          {list.map((item, i) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b-[1px] p-2"
            >
              <img src={getIcon(i)} className="w-10" alt="Icon"></img>
              <NavLink to={`/user/${item.username}`}>
                <span>@{item.username.toLowerCase()}</span>
              </NavLink>
              <span
                className="font-semibold text-xl"
                style={{ color: topsColorText(i) }}
              >
                {item.tweets}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

import goldIcon from '../../assets/icons/oro.webp';
import silverIcon from '../../assets/icons/plata.webp';
import bronzeIcon from '../../assets/icons/bronce.webp';
import { NavLink } from 'react-router-dom';

export default function TopsTweetsComponent({ list }) {
  const getIcon = (i) => {
    switch (i) {
      case 0:
        return goldIcon;
      case 1:
        return silverIcon;
      case 2:
        return bronzeIcon;
      default:
        return '';
    }
  };

  return (
    <div className="w-[500px] border-2 border-blue-900 rounded-lg p-10 shadow-black shadow-xl bg-blue-950">
      <div className="w-full rounded-lg bg-black p-4 mb-4">
        <h2 className="text-center">TOP TWEETERS</h2>
      </div>
      {list &&
        list.map((item, i) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b-[1px] p-2"
          >
            <img src={getIcon(i)} className="w-10"></img>
            <NavLink to={`/user/${item.username}`}>
              <span>@{item.username.toLowerCase()}</span>
            </NavLink>
            <span className="font-semibold text-xl">{item.tweets}</span>
          </div>
        ))}
    </div>
  );
}

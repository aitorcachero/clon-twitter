import goldIcon from '../../assets/icons/oro.webp';
import silverIcon from '../../assets/icons/plata.webp';
import bronzeIcon from '../../assets/icons/bronce.webp';
import { NavLink } from 'react-router-dom';

export default function TopsLikesComponent({ list }) {
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
            <h2 className="text-center">TOP LIKES</h2>
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
              <span className="font-semibold text-xl">{item.likes}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

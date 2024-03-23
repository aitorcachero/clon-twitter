import { NavLink } from 'react-router-dom';
import defaultIcon from '../../assets/icons/user-default-icon.svg';
import logoTw from '../../assets/icons/logo-tw.webp';
import logoutIcon from '../../assets/icons/logout-icon.svg';
import useAuth from '../../hooks/useAuth';
import iconLetter from '../../assets/icons/letter.svg';

export default function NavBar() {
  const { authUser, authLogout } = useAuth();

  const UNREAD_MESSAGES = authUser?.privateMessages.filter(
    (message) => !message.read
  );

  const NAVBAR_MENU = [
    { id: 1, name: 'Inicio', path: '/' },
    { id: 2, name: 'Tops', path: '/tops' },
    { id: 3, name: 'Trending', path: '/trendings' },
    {
      id: 4,
      name: authUser ? `@${authUser.username.toLowerCase()}` : 'Login',
      path: authUser ? `/user/${authUser.username}` : '/login',
    },
    {
      id: 5,
      path: '/profile/messages',
      img: iconLetter,
    },
  ];

  return (
    <div className="sticky top-0 w-full h-20 z-20 bg-transparent flex flex-row justify-center items-center border-b-transparent border-b-2">
      <nav
        className=" absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center
        opacity-100   backdrop:filter backdrop-blur-sm "
        style={{
          backgroundColor: 'rgba(13,15,16,.28)',
        }}
      >
        <div className="flex flex-row w-[500px] justify-center items-center ">
          {NAVBAR_MENU.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="text-white text-sm md:text-base z-40 w-16 md:w-full"
            >
              <div className="hover:bg-slate-300  hover:text-black rounded-md w-full h-10 flex justify-center items-center  transition-all">
                {item.img && (
                  <div className="relative hover:cursor-pointer">
                    {UNREAD_MESSAGES?.length > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-600  rounded-full px-[5px] py-[5px] h-5 flex justify-center items-center ">
                        {UNREAD_MESSAGES?.length}
                      </div>
                    )}
                    <img src={iconLetter} className="w-7" />
                  </div>
                )}
                {item.name && !item.img && item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

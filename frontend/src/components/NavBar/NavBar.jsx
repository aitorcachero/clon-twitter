import { NavLink } from 'react-router-dom';
import defaultIcon from '../../assets/icons/user-default-icon.svg';
import logoTw from '../../assets/icons/logo-tw.webp';
import logoutIcon from '../../assets/icons/logout-icon.svg';
import useAuth from '../../hooks/useAuth';

export default function NavBar() {
  const { authUser, authLogout } = useAuth();

  const NAVBAR_MENU = [
    { id: 1, name: 'Inicio', path: '/' },
    { id: 2, name: 'Top usuarios', path: '/tops' },
    { id: 3, name: 'Trending Topics', path: '/trendings' },
    {
      id: 4,
      name: authUser ? `@${authUser.username.toLowerCase()}` : 'Login',
      path: authUser ? `/user/${authUser.username}` : '/login',
    },
  ];

  return (
    <div className="sticky top-0 w-full h-16 z-10 bg-transparent flex flex-row justify-center items-center border-b-transparent border-b-2">
      <nav
        className=" absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center
        opacity-100   backdrop:filter backdrop-blur-sm "
        style={{
          backgroundColor: 'rgba(13,15,16,.28)',
        }}
      >
        <div className="flex flex-row w-[600px] justify-between items-center ">
          {/* <NavLink to="/">
            <img src={logoTw} width={60} className="" />
          </NavLink>
          {authUser ? (
            <div className="flex flex-row justify-center items-center gap-3 text-xl">
              <NavLink to={`/user/${authUser?.username}`}>
                <p>@{authUser.username}</p>
              </NavLink>
              <img
                src={logoutIcon}
                width={30}
                onClick={() => authLogout()}
                className="hover:cursor-pointer"
              />
            </div>
          ) : (
            <NavLink to="/login">
              <img src={defaultIcon} width={50} className="" />
            </NavLink>
          )} */}

          {NAVBAR_MENU.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="text-white text-sm md:text-base z-40 w-full"
            >
              <div className="hover:bg-slate-300 hover:opacity-65  hover:text-black rounded-md w-full h-full flex justify-center items-center p-2">
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

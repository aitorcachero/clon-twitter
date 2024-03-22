import { NavLink } from 'react-router-dom';
import defaultIcon from '../../assets/icons/user-default-icon.svg';
import logoTw from '../../assets/icons/logo-tw.webp';
import logoutIcon from '../../assets/icons/logout-icon.svg';
import useAuth from '../../hooks/useAuth';

export default function NavBar() {
  const { authUser, authLogout } = useAuth();

  return (
    <nav
      className="w-full h-16 absolute   top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center bg-[rgba(13,15,16,.28)] will-change-auto opacity-100  z-10"
      style={{ backdropFilter: blur('5px') }}
    >
      <div className="flex flex-row w-[500px] justify-between items-center px-10">
        <NavLink to="/">
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
        )}
      </div>
    </nav>
  );
}

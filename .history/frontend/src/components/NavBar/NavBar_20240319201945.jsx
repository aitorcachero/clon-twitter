import { NavLink } from 'react-router-dom';
import defaultIcon from '../../assets/icons/user-default-icon.svg';
import logoTw from '../../assets/icons/logo-tw.webp';
import logoutIcon from '../../assets/icons/logout-icon.svg';
import useAuth from '../../hooks/useAuth';

export default function NavBar() {
  const { authUser, authLogout } = useAuth();

  return (
    <nav className="w-full h-16 fixed  top-0 flex flex-row justify-center items-center bg-black opacity-85 z-1">
      <div className="flex flex-row w-[500px] justify-between items-center px-10">
        <NavLink to="/">
          <img src={logoTw} width={60} className="" />
        </NavLink>
        {authUser ? (
          <div className="flex flex-row justify-center items-center gap-3">
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

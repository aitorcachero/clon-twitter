import { NavLink } from 'react-router-dom';
import defaultIcon from '../../assets/icons/user-default-icon.svg';
import logoTw from '../../assets/icons/logo-tw.webp';
import useAuth from '../../hooks/useAuth';

export default function NavBar() {
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <nav className="w-full h-16 fixed  top-0 flex flex-row justify-center items-center bg-zinc-800 z-1">
      <div className="flex flex-row w-[500px] justify-between items-center">
        <NavLink to="/">
          <img src={logoTw} width={60} className="" />
        </NavLink>
        <NavLink to="/login">
          <img src={defaultIcon} width={50} className="" />
        </NavLink>
      </div>
    </nav>
  );
}

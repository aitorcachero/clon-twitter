import { NavLink } from 'react-router-dom';
import defaultIcon from '../../assets/icons/user-default-icon.svg';
import logoTw from '../../assets/icons/logo-tw.webp';

export default function NavBar() {
  return (
    <nav className="w-full h-14 fixed  top-0 flex flex-row justify-center items-center bg-zinc-800 ">
      <div className="flex flex-col w[500px] justify-between">
        <NavLink to="/">
          <img src={logoTw} width={50} className="" />
        </NavLink>
        <NavLink to="/login">
          <img src={defaultIcon} width={50} className="" />
        </NavLink>
      </div>
    </nav>
  );
}

import defaultIcon from '../../assets/icons/user-default-icon.svg';

export default function NavBar() {
  return (
    <div className="w-screen h-14 fixed border top-0 flex flex-row justify-end items-center ">
      <img src={defaultIcon} width={20} className="mr-20" />
    </div>
  );
}
import defaultIcon from '../../assets/icons/user-default-icon.svg';

export default function NavBar() {
  return (
    <div className="w-full h-14 fixed  top-0 flex flex-row justify-end items-center bg-zinc-800">
      <img src={defaultIcon} width={50} className="mr-20" />
    </div>
  );
}

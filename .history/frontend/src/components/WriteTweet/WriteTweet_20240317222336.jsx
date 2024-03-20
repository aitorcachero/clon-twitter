import defaultUserIcon from '../../assets/icons/user-default-icon.svg';
import useAuth from '../../hooks/useAuth';

export default function WriteTweet() {
  const { authUser } = useAuth();
  return (
    <article className="border w-[500px] flex flex-col">
      <div className="flex flex-row justify-start items-center">
        <img src={defaultUserIcon} width={50} />
        <p>@{authUser.username}</p>
      </div>
    </article>
  );
}

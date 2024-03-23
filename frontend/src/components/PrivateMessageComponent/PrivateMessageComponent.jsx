import trashIcon from '../../assets/icons/trash.svg';
import formatDate from '../../utils/formatDate';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';

export default function PrivateMessageComponent({ message }) {
  const { setAuthUser, authUser } = useAuth();
  const { updateMessagePrivate, deleteMessagePrivate } = useUsers();

  const handleOpen = async () => {
    try {
      const updateMessage = await updateMessagePrivate(message.message_id);
    } catch (error) {
      console.log(error);
    }
    setAuthUser((prevState) => ({
      ...prevState,
      privateMessages: prevState.privateMessages.map((msg) => {
        if (msg.message_id === message.message_id) {
          return { ...msg, read: 1 };
        }
        return msg;
      }),
    }));
  };

  const handleDelete = async () => {
    try {
      const deleteMessage = await deleteMessagePrivate(message.message_id);
    } catch (error) {
      console.log(error);
    }
    setAuthUser((prevState) => ({
      ...prevState,
      privateMessages: prevState.privateMessages.filter(
        (msg) => msg.message_id !== message.message_id
      ),
    }));
  };

  return (
    <div className="py-5" onClick={handleOpen}>
      <details className="group ">
        <summary className="flex flex-col justify-center items-start font-medium cursor-pointer list-none relative">
          {message?.read === 0 && (
            <div className="absolute top-0 right-4 text-green-500 rounded-full px-[5px] py-[5px] h-5 flex justify-center items-center ">
              NUEVO
            </div>
          )}

          <p>Título: {message?.title}</p>
          <p>De: {message.from_username}</p>
          <p className="text-orange-400 text-sm">
            {formatDate(message?.createdAt)}
          </p>

          <span className="transition group-open:rotate-180">
            <svg
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <div className="bg-slate-800 rounded p-3 mt-2">
          <p className="text-neutral-200 group-open:animate-fadeIn ">
            {message?.text}
          </p>
        </div>
        <div className="w-full flex justify-center items-center mt-1">
          <img
            src={trashIcon}
            className="w-8 opacity-80 mt-4 hover:cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </details>
    </div>
  );
}

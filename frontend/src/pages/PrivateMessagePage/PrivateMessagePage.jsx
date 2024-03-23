import useAuth from '../../hooks/useAuth';
import PrivateMessageComponent from '../../components/PrivateMessageComponent/PrivateMessageComponent';
export default function PrivateMessagePage() {
  const { authUser } = useAuth();

  return (
    <>
      <div className="mt-5 flex flex-col gap-5">
        <h2 className="font-bold text-3xl mt-5 tracking-tight text-center">
          BUZON DE MENSAJES
        </h2>
        {authUser && (
          <div className="w-[500px] bg-blue-950 mx-auto px-3 min-h-sceen rounded-xl">
            <div className="flex flex-col items-center"></div>
            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
              {authUser.privateMessages.map((message, index) => (
                <PrivateMessageComponent key={index} message={message} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

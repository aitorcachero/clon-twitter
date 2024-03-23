import useAuth from '../../hooks/useAuth';
import PrivateMessageComponent from '../../components/PrivateMessageComponent/PrivateMessageComponent';
export default function PrivateMessagePage() {
  const { authUser } = useAuth();

  return (
    <>
      <div className="mt-5 flex flex-col">
        <h2 className="font-bold text-3xl my-5 tracking-tight text-center">
          BUZON DE MENSAJES
        </h2>
        {authUser && (
          <div
            className="w-[350px] md:w-[500px] border-slate-700 rounded-xl bg-zinc-900 mx-auto px-3 min-h-sceen  shadow-black shadow-xl mb-5"
            style={{
              background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
              backgroundClip: 'padding-box',
            }}
          >
            <div className="flex flex-col items-center"></div>
            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto  p-10">
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

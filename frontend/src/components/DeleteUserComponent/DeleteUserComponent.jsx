import { useNavigate } from 'react-router-dom';
import { deleteUserService } from '../../services/fetchData';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

export default function DeleteUserComponent() {
  const { authUser, authToken, authLogout } = useAuth();
  // Configura estados iniciales para username, email, bio y avatar con datos del usuario.

  const [showPopUp, setShowPopUp] = useState(false); // Inicializa el estado para mostrar el popup como falso.
  const navigate = useNavigate();

  const handleDeleteProfile = async () => {
    try {
      const deleteUser = await deleteUserService(authUser.id, authToken);

      if (deleteUser.status === 'error') {
        setShowPopUp(false);
        toast.error(deleteUser.message);
      }

      if (deleteUser.status === 'ok') {
        toast.success('Usuario eliminado');
        authLogout();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-4 p-2">
      <button
        className="w-[200px] block border border-slate-700 bg-red-900 text-white rounded-lg p-4 mt-2 shadow-black shadow-xl"
        onClick={() => setShowPopUp(true)}
      >
        Eliminar perfil
      </button>
      {showPopUp && (
        <div className="w-full h-screen flex flex-col justify-center items-center fixed inset-0 bg-transparent ">
          <div
            className=" w-full h-full border  border-slate-700 rounded-xl bg-zinc-900 p-10   flex flex-col justify-center items-center gap-10  my-2  shadow-black shadow-xl backdrop:filter backdrop-blur-sm opacity-100"
            style={{
              backgroundColor: 'rgba(13,15,16,.28)',
            }}
          >
            <div className="  border  border-slate-700 rounded-xl bg-zinc-900 p-10 w-[350px] md:w-[800px]  flex flex-col justify-center items-center gap-10  my-2  shadow-black shadow-xl ">
              <div className="flex flex-col gap-1">
                <h1 className="text-sm md:text-xl text-center">
                  ¿Estás seguro de que deseas eliminar tu perfil?
                </h1>
                <p className="text-red-600 text-lg md:text-xl text-center">
                  Esta acción es irreversible
                </p>
              </div>
              <div className="flex  gap-4 flex-row-reverse">
                <button
                  className="w-32 md:w-[200px] block border border-slate-700 bg-red-900 text-white rounded-lg p-4 mt-2 shadow-black shadow-xl"
                  onClick={handleDeleteProfile}
                >
                  Sí
                </button>
                <button
                  className="w-32 md:w-[200px] block border border-slate-700 bg-green-900 text-white rounded-lg p-4 mt-2 shadow-black shadow-xl"
                  onClick={() => setShowPopUp(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

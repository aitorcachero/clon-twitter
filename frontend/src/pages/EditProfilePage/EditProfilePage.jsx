import defaultUserIcon from '../../assets/icons/user-default-icon.svg';
import useAuth from '../../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAddFilePreview } from '../../utils/handleAddFilePreview';
import {
  deleteUserService,
  updatePasswordService,
} from '../../services/fetchData';
import { toast } from 'react-toastify';
import iconLocked from '../../assets/icons/locked.svg';
import iconUnlocked from '../../assets/icons/unlocked.svg';
import useUsers from '../../hooks/useUsers';
import './EditProfilePage.css';

export default function EditProfilePage() {
  const { handleUpdateAvatar, handleUpdateBio, handleUpdatePassword } =
    useUsers();
  const fileInputRef = useRef(null);
  const descriptionRef = useRef(null);
  // Obtiene datos de usuario y función para actualizar el perfil desde el hook de autenticación.
  const { authUser, authUpdateProfile, authToken, authLogout } = useAuth();
  // Configura estados iniciales para username, email, bio y avatar con datos del usuario.

  const [bio, setBio] = useState('');
  const [changeBio, setChangeBio] = useState(bio); // Inicializa el estado para cambiar la bio como falso.
  const [avatar, setAvatar] = useState(null); // Inicializa el avatar como nulo.
  const [img, setImg] = useState(avatar); // Inicializa el estado para la imagen como cadena vacía.
  const [showPopUp, setShowPopUp] = useState(false); // Inicializa el estado para mostrar el popup como falso.
  const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualiza
  const [disableDescription, setDisableDescription] = useState(true); // Inicializa el estado para deshabilitar la descripción como verdadero.
  const [opacityTextImage, setOpacityTextImage] = useState(50); // Inicializa el estado para la opacidad del texto de la imagen como 0.
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }); // Inicializa el estado para la contraseña como cadena vacía.

  const navigate = useNavigate();

  // Efecto para actualizar estados cuando cambia el usuario.
  useEffect(() => {
    if (authUser) {
      setBio(authUser.description || '');
      setChangeBio(authUser.description || '');
      authUser.photo
        ? setImg(`${APIUrl}/avatars/${authUser.avatar}`)
        : setImg(defaultUserIcon);
    }
  }, [authUser]);

  useEffect(() => {
    if (disableDescription === false) {
      descriptionRef.current.focus();
    }
  }, [disableDescription]);

  const onChangeImg = (e) => {
    // setImg(e.target.value);
    handleAddFilePreview(e, setAvatar, setPreviewUrl);
  };

  // Función para manejar la descripción.
  const handleDescription = () => {
    setDisableDescription(!disableDescription);
  };

  const getPhoto = () => {
    if (authUser?.photo) {
      return authUser?.photo;
    } else {
      return defaultUserIcon;
    }
  };

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
    <div className="w-full flex flex-col justify-center items-center">
      <article
        className="border w-[350px] border-slate-700 rounded-xl bg-zinc-900 p-6  md:w-[500px] flex flex-col justify-between gap-2 my-2  shadow-black shadow-xl"
        style={{
          background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
          backgroundClip: 'padding-box',
        }}
      >
        <section className="profile-avatar-container flex flex-col justify-center items-center gap-4">
          <h4 className="profile-avatar-title text-xl">Avatar</h4>
          <div className="relative">
            <div
              onClick={() => fileInputRef.current.click()}
              alt="avatar"
              className="w-48 h-48 rounded-full bg-cover bg-center bg-no-repeat border border-slate-700 shadow-black shadow-xl hover:cursor-pointer flex justify-center items-center hover:brightness-50 "
              style={{
                backgroundImage: `url(${previewUrl ? previewUrl : img})`,
              }}
              onMouseEnter={() => setOpacityTextImage(150)}
              onMouseLeave={() => setOpacityTextImage(50)}
            >
              <p className={`brightness-${opacityTextImage} text-white z-50`}>
                Haz click para cambiar
              </p>
            </div>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              ref={fileInputRef}
              onChange={onChangeImg}
              style={{
                display: 'none',
                background:
                  'linear-gradient(141deg, #080509, #1a171c, #080509)',
                backgroundClip: 'padding-box',
              }}
            />{' '}
          </div>
          <div className="conditional-img">
            <button
              className="block border border-slate-700 bg-zinc-900 text-white rounded-lg p-4 mt-2 shadow-black shadow-xl btn-hover"
              // style="display:block;width:130px; height:30px;"
              onClick={(e) => handleUpdateAvatar(e, avatar)}
            >
              Actualizar avatar
            </button>
          </div>
        </section>
        <div className="w-full border-b-[1px] border-white my-6" />
        <section className="flex flex-col justify-center items-center gap-4">
          <h4 className="text-xl">Decripción</h4>
          <textarea
            type="text"
            name="description"
            ref={descriptionRef}
            id="description"
            className="block w-full h-24 px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 resize-none"
            disabled={disableDescription}
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            style={{ color: disableDescription ? 'gray' : 'white' }}
          />
          <div className="flex flex-row justify-end w-full hover:cursor-pointer">
            <img
              src={disableDescription ? iconLocked : iconUnlocked}
              className="w-6"
              onClick={handleDescription}
            />
          </div>

          <button
            className="block border border-slate-700 bg-zinc-900 text-white rounded-lg p-4 mt-2 shadow-black shadow-xl hover:cursor-pointer btn-hover"
            onClick={(e) => {
              handleUpdateBio(bio);
            }}
            disabled={
              bio === authUser?.description || bio === '' || disableDescription
            }
            style={{
              color:
                bio === authUser?.description ||
                bio === '' ||
                disableDescription
                  ? 'gray'
                  : 'white',
            }}
          >
            Actualizar descripción
          </button>
        </section>
        <div className="w-full border-b-[1px] border-white my-6" />
        <section className="flex flex-col justify-center items-center gap-4 p-2">
          <h1 className="text-xl my-4">Contraseña</h1>
          <label htmlFor="oldpassword" className="text-white">
            Antigua contraseña
          </label>
          <input
            type="password"
            name="oldpassword"
            id="oldpassword"
            value={password.oldPassword}
            onChange={(e) => {
              setPassword({ ...password, oldPassword: e.target.value });
            }}
            className="block w-full md:w-[300px] px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="newpassword" className="text-white">
            Nueva contraseña
          </label>
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            value={password.newPassword}
            onChange={(e) => {
              setPassword({ ...password, newPassword: e.target.value });
            }}
            className="block w-full md:w-[300px] px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="confirmpassword" className="text-white">
            Confirmar contraseña
          </label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            value={password.confirmPassword}
            onChange={(e) => {
              setPassword({ ...password, confirmPassword: e.target.value });
            }}
            className="block w-full md:w-[300px] px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <button
            className="w-[200px] block border border-slate-700 bg-green-900 text-white rounded-lg p-4 mt-2 shadow-black shadow-xl btn-hover"
            onClick={() => handleUpdatePassword(password, setPassword)}
          >
            Actualizar contraseña
          </button>
        </section>
        <div className="w-full border-b-[1px] border-white my-6" />
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
      </article>
    </div>
  );
}

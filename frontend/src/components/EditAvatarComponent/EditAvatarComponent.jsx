import { STYLE_TEXT_H4 } from '../../utils/twStyles';
import defaultUserIcon from '../../assets/icons/user-default-icon.svg';
import { useEffect, useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { handleAddFilePreview } from '../../utils/handleAddFilePreview';
import { APIUrl } from '../../config';
import useUsers from '../../hooks/useUsers';

export default function EditAvatarComponent() {
  const { handleUpdateAvatar } = useUsers();
  const fileInputRef = useRef(null);
  const { authUser } = useAuth(); // Extrae el usuario autenticado y la función para actualizar el avatar.
  const [avatar, setAvatar] = useState(null); // Inicializa el avatar como nulo.
  const [img, setImg] = useState(avatar); // Inicializa el estado para la imagen como cadena vacía.
  const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualiza
  const [opacityTextImage, setOpacityTextImage] = useState(50); // Inicializa el estado para la opacidad del texto de la imagen como 0.

  // Efecto para actualizar estados cuando cambia el usuario.
  useEffect(() => {
    if (authUser) {
      authUser.photo
        ? setImg(`${APIUrl}/avatars/${authUser.photo}`)
        : setImg(defaultUserIcon);
    }
  }, [authUser]);

  return (
    <section className="profile-avatar-container flex flex-col justify-center items-center gap-6">
      <h4 className={STYLE_TEXT_H4.className} style={STYLE_TEXT_H4.style}>
        Avatar
      </h4>
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
          onChange={(e) => {
            handleAddFilePreview(e, setAvatar, setPreviewUrl);
          }} // Función para añadir la previsualización de la imagen.
          style={{
            display: 'none',
            background: 'linear-gradient(141deg, #080509, #1a171c, #080509)',
            backgroundClip: 'padding-box',
          }}
        />{' '}
      </div>
      <div className="conditional-img">
        <button
          className="block border border-slate-700 bg-zinc-900 text-white rounded-lg p-4 mt-2 shadow-black shadow-xl btn-hover"
          // style="display:block;width:130px; height:30px;"
          onClick={() => handleUpdateAvatar(avatar)}
        >
          Actualizar avatar
        </button>
      </div>
    </section>
  );
}

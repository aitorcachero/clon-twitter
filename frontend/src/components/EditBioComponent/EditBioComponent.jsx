import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { STYLE_TEXT_H4 } from '../../utils/twStyles';
import iconLocked from '../../assets/icons/locked.svg';
import iconUnlocked from '../../assets/icons/unlocked.svg';
import useUsers from '../../hooks/useUsers';

export default function EditBioComponent() {
  const { handleUpdateBio } = useUsers();
  const descriptionRef = useRef(null);
  const [bio, setBio] = useState('');
  const [changeBio, setChangeBio] = useState(bio); // Inicializa el estado para la descripción como cadena vacía.
  const [disableDescription, setDisableDescription] = useState(true); // Inicializa el estado para deshabilitar la descripción como verdadero.

  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      setBio(authUser.description || '');
      setChangeBio(authUser.description || '');
    }
  }, [authUser]);

  useEffect(() => {
    if (disableDescription === false) {
      descriptionRef.current.focus();
    }
  }, [disableDescription]);

  return (
    <section className="flex flex-col justify-center items-center gap-10">
      <h4 className={STYLE_TEXT_H4.className} style={STYLE_TEXT_H4.style}>
        Decripción
      </h4>
      <div className="w-full px-4 py-2 flex flex-col gap-2">
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
            onClick={() => {
              setDisableDescription(!disableDescription);
            }}
          />
        </div>
      </div>

      <button
        className="block border border-slate-700 bg-zinc-900 text-white rounded-lg p-4  shadow-black shadow-xl hover:cursor-pointer btn-hover mb-4"
        onClick={(e) => {
          handleUpdateBio(bio);
        }}
        disabled={
          bio === authUser?.description || bio === '' || disableDescription
        }
        style={{
          color:
            bio === authUser?.description || bio === '' || disableDescription
              ? 'gray'
              : 'white',
        }}
      >
        Actualizar descripción
      </button>
    </section>
  );
}

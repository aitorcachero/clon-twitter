import { useState } from 'react';
import { STYLE_TEXT_H4 } from '../../utils/twStyles';
import useUsers from '../../hooks/useUsers';

export default function EditPasswordComponent() {
  const { handleUpdatePassword } = useUsers();

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }); // Inicializa el estado para la contraseña como cadena vacía.

  return (
    <section className="flex flex-col justify-center items-center gap-4 p-2">
      <h4 className={STYLE_TEXT_H4.className} style={STYLE_TEXT_H4.style}>
        Contraseña
      </h4>
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
  );
}

import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUserService } from '../../services/fetchData';
import checkRegisterData from '../../services/checkRegisterData.js';
import bgImage from '../../assets/bg-wave.webp';
import Loader from '../../components/Loader/Loader.jsx';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const { authLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const check = checkRegisterData(
      username,
      password,
      confirmPassword,
      email,
      name,
      surname,
      description
    );

    if (check.status === 'error') {
      setError(check.message);
      return;
    }

    try {
      setLoading(true);
      const newUser = await registerUserService(
        username,
        password,
        email,
        name,
        surname,
        description
      );

      if (newUser.status === 'error') {
        setError(newUser.message);
      }

      if (newUser.status === 'ok') {
        toast.success('Usuario creado correctamente');
        await authLogin(username, password);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-slate-700  bg-zinc-900 shadow-black shadow-xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-900">
      <div className="flex flex-row-reverse justify-center h-screen border-slate-700  bg-zinc-900">
        <div
          className="hidden bg-cover md:block md:w-2/3 border-slate-700  bg-zinc-900"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <div className="flex items-center h-full px-20 border-slate-700  bg-zinc-900 bg-opacity-40 shadow-black shadow-xl">
            <div>
              <h2 className="text-4xl font-bold text-white">Twitter Clon</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Proyecto personal creando una API basada en Twitter.
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex items-center w-full px-6  md:px-20  md:w-2/6  shadow-black shadow-xl"
          style={{
            background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
            backgroundClip: 'padding-box',
          }}
        >
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                TWITTER CLON
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Registrate para poder escribir tweets
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Tu alias"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Contraseña
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Tu contraseña"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex justify-between mb-2 mt-4">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Repite la contraseña
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="repeat-password"
                    placeholder="Tu contraseña"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-between mb-2 mt-4">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-200"
                  >
                    Correo electronico
                  </label>
                </div>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex justify-between mb-2 mt-4">
                  <label
                    htmlFor="name"
                    className="text-sm text-gray-600 dark:text-gray-200"
                  >
                    Nombre
                  </label>
                </div>

                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Tu nombre"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="flex justify-between mb-2 mt-4">
                  <label
                    htmlFor="surname"
                    className="text-sm text-gray-600 dark:text-gray-200"
                  >
                    Apellidos
                  </label>
                </div>

                <input
                  type="text"
                  name="surname"
                  id="text"
                  placeholder="Tus apellidos"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />

                <div className="flex justify-between mb-2 mt-4">
                  <label
                    htmlFor="description"
                    className="text-sm text-gray-600 dark:text-gray-200"
                  >
                    Descripción
                  </label>
                </div>

                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Escribe una breve descripción"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="mt-6 relative">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 mb-2">
                    Registrar
                  </button>
                  <div className="absolute right-1/4 top-1">
                    {loading && <Loader width="30px" heigth="30px" />}
                  </div>
                  {error && <p className="text-center text-red-600">{error}</p>}
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                ¿Ya tienes cuenta en TwitterClon?{' '}
                <NavLink
                  to="/login"
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Entra
                </NavLink>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

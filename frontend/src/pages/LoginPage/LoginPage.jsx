import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import bgImage from '../../assets/bg-wave.webp';
import Loader from '../../components/Loader/Loader';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { authLogin } = useAuth();

  useEffect(() => {
    document.title = 'Twitter Clon - Login';
    if (loading) console.log('Cargando...');
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username === '' || password === '') return;
      setLoading(true);
      await authLogin(username, password);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div
      className="border-slate-700  bg-zinc-900 shadow-black shadow-xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-900"
      style={{
        background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
        backgroundClip: 'padding-box',
      }}
    >
      <div className="flex justify-center h-screen border-slate-700  bg-zinc-900">
        <div
          className="hidden bg-cover md:block md:w-2/3"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <div className="flex items-center h-full px-20 border-slate-700  bg-zinc-900 shadow-black shadow-xl bg-opacity-40">
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
                Twitter Clon
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Logea para acceder a tu cuenta
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
                    placeholder="Tu nombre de usuario..."
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
                    <a
                      href="#"
                      className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      No recuerdas tu contraseña?
                    </a>
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
                </div>

                <div className="mt-6 relative">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 flex flex-row justify-center items-center ">
                    Entrar
                  </button>
                  <div className="absolute w-10 h-10 right-1/4 top-1">
                    {loading && <Loader width="30px" heigth="30px" />}
                  </div>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                No tienes cuenta?{' '}
                <NavLink
                  to="/register"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Regístrate
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

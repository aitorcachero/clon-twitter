import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { registerUserService } from '../../services/fetchData';
// import checkRegisterData from '../../services/checkRegisterData';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const { authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const check = checkRegisterData(username, password, confirmPassword, email);

    if (check.status === 'error') {
      setError(check.message);
      return;
    }

    try {
      const newUser = await registerUserService(username, password, email);
      if (newUser.status === 'error') {
        setError(newUser.message);
      }

      if (newUser.status === 'ok') {
        toast.success('Usuario creado correctamente');
        await authLogin(username, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex flex-row-reverse justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Notas</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-y-5 w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                API NOTAS
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Registrate para poder escribir notas
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
                    id="password"
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

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 mb-2">
                    Entrar
                  </button>
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

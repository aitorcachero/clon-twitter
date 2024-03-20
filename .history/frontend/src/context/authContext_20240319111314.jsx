// Importamos los prop-types.
// import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos el nombre con el que guardamos el token en el localStorage.
import { userLocalStorageKey } from '../config';

import { toast } from 'react-toastify';
import { loginUserService, getUserProfileService } from '../services/fetchData';

// Creamos un contexto.
export const AuthContext = createContext(null);

// Creamos el componente provider del contexto.
export const AuthProvider = ({ children }) => {
  const toastError = (errMsg) => toast.error(errMsg);
  const toastSuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(
    localStorage.getItem(userLocalStorageKey)
  );

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Función que obtiene los datos del usuario.
    const fetchUser = async () => {
      try {
        setLoading(true);

        const body = await getUserProfileService(authToken);

        if (body.status === 'error') {
          // Manejamos los errores con toast.
          toast.error(body.message);
        } else {
          navigate('/');
          setAuthUser(body.data);
        }
      } catch (err) {
        // Manejamos los errores con toast.
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Si existe token buscamos los datos del usuario.
    if (authToken) fetchUser();
  }, [authToken]);

  const authLogin = async (username, password) => {
    try {
      setLoading(true);

      const body = await loginUserService(username, password);

      body.status === 'error'
        ? toastError(body.message)
        : toastSuccess(body.message);

      const getUser = await getUserProfileService(body.token);

      if (getUser.status === 'error') {
        // Manejamos los errores con toast.
        toast.error(getUser.message);
      }
      setAuthUser(getUser.data);

      // Almacenamos el token en el localStorage.
      localStorage.setItem(userLocalStorageKey, body.token);

      // Almacenamos el token en el State.

      setAuthToken(body.data.token);
    } catch (err) {
      if (err.message === 'Failed to fetch') toastError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const authLogout = async () => {
    // Eliminamos el token del localStorage.
    localStorage.removeItem(userLocalStorageKey);

    // Eliminamos el token del State y el usuario.
    setAuthToken(null);
    setAuthUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        authLogin,
        authToken,
        authUser,
        authLogout,
        // toastError,
        // toastSuccess,
        // navigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

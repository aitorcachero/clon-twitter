// Importamos los prop-types.
// import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos el nombre con el que guardamos el token en el localStorage.
import { userLocalStorageKey } from '../config';

import { toast } from 'react-toastify';

// Importamos el nombre con el que guardamos el token en el localStorage.
import { userLocalStorageKey } from '../config';

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

  useEffect(() => {
    // Función que obtiene los datos del usuario.
    const fetchUser = async () => {
      try {
        setLoading(true);

        const body = await getUserProfileService(authToken);

        if (body.status === 'error') {
          // Manejamos los errores con toast.
          toast.error(body.message);
        }

        // Establecemos el valor del usuario.
        setAuthUser(body);
        setAuthFavs(body.favs);
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

  const authLogin = async ({ email, password }) => {
    try {
      setLoading(true);

      const body = await loginUserService(email, password);

      body.status === 'error'
        ? toastError(body.message)
        : toastSuccess(body.message);

      // Almacenamos el token en el localStorage.
      localStorage.setItem(userLocalStorageKey, body.data.token);

      // Almacenamos el token en el State.
      setAuthToken(body.data.token);
      navigate('/');
    } catch (err) {
      if (err.message === 'Failed to fetch') toastError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={
        {
          // toastError,
          // toastSuccess,
          // navigate,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
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
          navigate('/');
        } else {
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

      if (body.status === 'error') {
        toastError(body.message);
        return;
      } else {
        toastSuccess(body.message);
        const getUser = await getUserProfileService(body.token);
        if (getUser.status === 'error') {
          // Manejamos los errores con toast.
          toast.error(getUser.message);
        } else {
          setAuthUser(getUser.data);
          setAuthToken(body.token);
          localStorage.setItem(userLocalStorageKey, body.token);
          navigate('/');
        }
      }

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

  const updateUser = async (data) => {
    const password = async (oldPassword, newPassword) => {
      if (data.password !== data.confirmPassword) {
        toastError('Las contraseñas no coinciden');
        return;
      }
    };

    const bio = async (bio) => {
      if (bio.length > 160) {
        toastError('La biografía no puede superar los 160 caracteres');
        return;
      }
    };

    const avatar = async (avatar) => {
      //
    };

    return { password, bio, avatar };
    // try {
    //   setLoading(true);

    //   const body = await updateUserProfileService(authToken, data);

    //   if (body.status === 'error') {
    //     toastError(body.message);
    //     return;
    //   } else {
    //     toastSuccess(body.message);
    //     setAuthUser(body.data);
    //   }
    // } catch (err) {
    //   if (err.message === 'Failed to fetch') toastError('Error de conexión');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        authLogin,
        authToken,
        authUser,
        authLogout,
        setAuthUser,
        updateUser,
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

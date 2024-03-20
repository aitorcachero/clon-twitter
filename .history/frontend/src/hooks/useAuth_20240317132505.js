// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { authContext } from '../context/authContext.jsx';

const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;

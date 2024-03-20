// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { authContext } from '../contexts/authContext.jsx';

const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;

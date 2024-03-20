// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { authContext } from '../contexts/authContext.jsx';

const useName = () => {
  return useContext(nameContext);
};

export default useName;

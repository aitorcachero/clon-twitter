// Importamos los prop-types.
// import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { toast } from 'react-toastify';

// Creamos un contexto.
export const UserContext = createContext(null);

// Creamos el componente provider del contexto.
export const UserProvider = ({ children }) => {
  //   const toastError = (errMsg) => toast.error(errMsg);
  //   const toastSuccess = (msg) => toast.success(msg);
  //   const navigate = useNavigate();

  return (
    <UserContext.Provider
      value={
        {
          // toastError,
          // toastSuccess,
          // navigate,
        }
      }
    >
      {children}
    </UserContext.Provider>
  );
};

// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

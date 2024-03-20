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

  const getUserInfo = async (user) => {
    try {
      const data = await fetch(`http://localhost:3000/users/${user}`);
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        getUserInfo,
        // toastError,
        // toastSuccess,
        // navigate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

const checkRegisterData = (
  username,
  password,
  confirmPassword,
  email,
  name,
  surname,
  description
) => {
  const REGEX_EMAIL =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  const REGEX_LETTERS = /^[a-zA-Z\s]*$/;

  if (username.length < 4 || username.length > 30) {
    return {
      status: 'error',
      message:
        'El nombre de usuario tiene que tener una longitud comprendida entre 4 y 30 carácteres',
    };
  }

  if (password < 4) {
    return {
      status: 'error',
      message: 'La contraseña tiene que tener mas de 4 carácteres',
    };
  }

  if (password !== confirmPassword) {
    return {
      status: 'error',
      message: 'Las contraseñas no coinciden',
    };
  }

  if (!REGEX_EMAIL.test(email)) {
    return {
      status: 'error',
      message: 'Tienes que introducir un email válido',
    };
  }

  if (!REGEX_LETTERS.test(name)) {
    return {
      status: 'error',
      message: 'Tienes que introducir un nombre válido',
    };
  }

  if (!REGEX_LETTERS.test(surname)) {
    return {
      status: 'error',
      message: 'Tienes que introducir un apellido válido',
    };
  }

  return { status: 'ok' };
};

export default checkRegisterData;

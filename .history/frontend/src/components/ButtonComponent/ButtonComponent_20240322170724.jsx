import React from 'react';

export default function ButtonComponent({ text, click }) {
  return (
    <button
      id="add-to-calendar"
      aria-label="agregar al calendario se abrirá ventana flotante"
      className=""
      onClick={click}
    >
      {' '}
      <span className="">{text}</span>{' '}
    </button>
  );
}

import React from 'react';

export default function ButtonComponent({ text, click }) {
  return (
    <button
      id="add-to-calendar"
      aria-label="agregar al calendario se abrirá ventana flotante"
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={click}
    >
      {' '}
      <span className="">{text}</span>{' '}
    </button>
  );
}

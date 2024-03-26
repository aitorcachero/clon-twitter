import React from 'react';

export default function ButtonComponent({ text, click }) {
  return (
    <button
      className="block border border-slate-700 bg-zinc-900 text-white rounded-lg px-6 py-4  shadow-black shadow-xl hover:cursor-pointer btn-hover"
      onClick={click}
    >
      {' '}
      <span className="">{text}</span>{' '}
    </button>
  );
}

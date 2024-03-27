import React from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

export default function ShowPhotoComponent({ photo, closeModal }) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center fixed inset-0 bg-transparent  ">
      <div
        className="border-slate-700  bg-zinc-900 md:p-10  w-[350px] md:w-full md:h-full flex flex-col justify-center items-center gap-10    shadow-black shadow-xl backdrop:filter backdrop-blur-sm opacity-100"
        style={{
          backgroundColor: 'rgba(13,15,16,.28)',
        }}
      >
        <div
          className=" w-[800px] border  border-slate-700 rounded-xl bg-zinc-900 p-10  flex flex-col justify-center items-center gap-10  md:my-2  shadow-black shadow-xl "
          style={{
            background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
            backgroundClip: 'padding-box',
          }}
        >
          <img
            src={photo}
            className="md:max-w-[768px] max-w-[300px]  shadow-black shadow-xl"
          />
          <ButtonComponent text="Cerrar" click={closeModal} />
        </div>
      </div>
    </div>
  );
}

import EditAvatarComponent from '../../components/EditAvatarComponent/EditAvatarComponent';
import EditBioComponent from '../../components/EditBioComponent/EditBioComponent';
import EditPasswordComponent from '../../components/EditPasswordComponent/EditPasswordComponent';
import DeleteUserComponent from '../../components/DeleteUserComponent/DeleteUserComponent';
import './EditProfilePage.css';

export default function EditProfilePage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <article
        className="border w-[350px] border-slate-700 rounded-xl bg-zinc-900 p-6  md:w-[500px] flex flex-col justify-between gap-2 my-2  shadow-black shadow-xl"
        style={{
          background: 'linear-gradient(71deg, #080509, #1a171c, #080509)',
          backgroundClip: 'padding-box',
        }}
      >
        <EditAvatarComponent />
        <div className="w-full border-b-[1px] border-white my-8" />
        <EditBioComponent />
        <div className="w-full border-b-[1px] border-white my-6" />
        <EditPasswordComponent />
        <div className="w-full border-b-[1px] border-white my-6" />
        <DeleteUserComponent />
      </article>
    </div>
  );
}

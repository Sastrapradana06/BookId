import { Eye, Trash2 } from "lucide-react";

type CardMembersType = {
  foto_profil: string;
  username: string;
  role: string;
  status: string;
};

export default function CardMembers({
  foto_profil,
  username,
  role,
  status,
}: CardMembersType) {
  return (
    <div className="w-[160px] h-[230px] rounded-lg shadow-md  lg:w-[160px] flex flex-col items-center p-2 bg-gray-700 relative">
      <span
        className={`p-2 rounded-full ${
          status == "aktif" ? "bg-green-500" : "bg-red-500"
        } animate-pulse absolute top-1 right-1`}
      ></span>
      <img
        src={foto_profil}
        alt="avatar"
        className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover ring ring-white"
      />
      <div className="text-center">
        <h1 className="font-semibold text-[1rem] text-white capitalize">
          {username}
        </h1>
        <p className="font-semibold text-[.8rem] text-green-300 capitalize">
          {role}
        </p>
      </div>
      <div className="w-full h-max  flex gap-2 items-center justify-center mt-4">
        <button className="p-2 rounded-md bg-green-500 hover:bg-green-600">
          <Eye size={20} color="white" />
        </button>
        <button className="p-2 rounded-md bg-red-500 hover:bg-red-600">
          <Trash2 size={20} color="white" />
        </button>
      </div>
    </div>
  );
}

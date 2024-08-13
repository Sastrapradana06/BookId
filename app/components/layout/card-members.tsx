/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useFetcher, useOutletContext } from "@remix-run/react";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import ModalDelete from "./modal-delete";
import { UserContext } from "~/utils/type";

type CardMembersType = {
  id: number;
  foto_profil: string;
  username: string;
  role: string;
  status: string;
};

export default function CardMembers({
  id,
  foto_profil,
  username,
  role,
  status,
}: CardMembersType) {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const fetcher = useFetcher<any>();
  const { user } = useOutletContext<UserContext>();

  const deleteMember = () => {
    fetcher.submit(
      { idMember: id, urlFotoProfil: foto_profil },
      { method: "post", action: "/api/delete-members" }
    );
    setIsDeleteModal(false);
  };

  return (
    <>
      <>
        <ModalDelete
          type="member"
          isModalOpen={isDeleteModal}
          setIsModalOpen={setIsDeleteModal}
          funcDelete={deleteMember}
        />
      </>
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
          <p
            className={`font-semibold text-[.8rem]  capitalize ${
              role == "super admin"
                ? "text-teal-400"
                : role == "admin"
                ? "text-sky-500"
                : "text-green-500"
            }`}
          >
            {role}
          </p>
        </div>
        <div className="w-full h-max  flex gap-2 items-center justify-center mt-4">
          <Link to={`/members/detail/${id}`}>
            <button className="p-2 rounded-md bg-green-500 hover:bg-green-600">
              <Eye size={20} color="white" />
            </button>
          </Link>
          {user.role == "super admin" || user.role == "admin" ? (
            <button
              className="p-2 rounded-md bg-red-500 hover:bg-red-600"
              onClick={() => setIsDeleteModal(true)}
            >
              <Trash2 size={20} color="white" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

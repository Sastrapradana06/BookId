/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { ChevronRight, Eye, Search, Trash2, UserSearch } from "lucide-react";
import { useState } from "react";
import Container from "~/components/layout/container";
import { isAuthUser } from "~/services/auth.server";
import { getMembers } from "~/services/supabase/fetch.server";

type LoaderDataMembers = {
  status: boolean;
  data?: any;
  error?: {
    code: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  const dataMembers = await getMembers();
  console.log(dataMembers);
  if (dataMembers.status === false) {
    return json({ status: false, error: dataMembers.error });
  }

  return json({ status: true, data: dataMembers.data });
};

export default function Members() {
  const { pathname } = useLocation();
  const { data } = useLoaderData<LoaderDataMembers>();
  console.log({ data });

  const [idAllDelete, setIdAllDelete] = useState<number[]>([]);

  return (
    <Container>
      <section className="mt-1 lg:mt-0">
        <div className="w-max flex items-center gap-1">
          <Link
            to="/members"
            className={`font-semibold text-[.8rem]  lg:text-[.9rem] ${
              pathname === "/members" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Members
          </Link>
          <ChevronRight size={18} className="mt-[1px]" />
          <Link
            to="add"
            className={`font-semibold text-[.8rem]  lg:text-[.9rem] ${
              pathname === "/members/add" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Tambah Member
          </Link>
        </div>
        <div className="w-full h-max mt-4 flex gap-4  flex-wrap lg:justify-between lg:items-center">
          <form className="flex items-center w-full lg:w-[40%]">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-[90%] ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                <UserSearch color="black" size={23} />
              </div>
              <input
                type="text"
                id="simple-search"
                name="q"
                className=" border bg-white shadow-lg border-gray-400 text-gray-900 text-sm rounded-3xl  block w-full ps-12 p-3.5 bg-transparent outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cari member..."
                required={true}
              />
            </div>
            <button
              type="submit"
              className="p-3 ms-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-700 shadow-lg"
            >
              <Search color="white" size={20} />
              <span className="sr-only">Search</span>
            </button>
          </form>
          <div className="w-max h-max  flex items-center gap-2">
            {idAllDelete.length > 0 ? (
              <button
                name="button"
                title="Delete"
                // onClick={() => setIsDeleteModal(true)}
                className="p-2 rounded-lg bg-red-300 shadow-md"
              >
                <Trash2 size={20} color="crimson" />
              </button>
            ) : (
              <button
                name="button"
                title="Delete"
                className="p-2 rounded-lg bg-red-100 cursor-not-allowed"
              >
                <Trash2 size={20} color="crimson" />
              </button>
            )}
          </div>
        </div>
        <div className="w-full min-h-max max-h-[500px] relative overflow-auto mt-4 flex flex-wrap items-center justify-between lg:justify-center gap-4 lg:mt-8">
          {data?.map((member: any) => (
            <div
              className="w-[160px] h-[230px] rounded-lg shadow-md  lg:w-[160px] flex flex-col items-center p-2 bg-gray-700 relative"
              key={member.id}
            >
              <span
                className={`p-2 rounded-full ${
                  member.status == "aktif" ? "bg-green-500" : "bg-red-500"
                } animate-pulse absolute top-1 right-1`}
              ></span>
              <img
                src={member.foto_profil}
                alt="avatar"
                className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover ring ring-white"
              />
              <div className="text-center">
                <h1 className="font-semibold text-[1rem] text-white capitalize">
                  {member.username}
                </h1>
                <p className="font-semibold text-[.8rem] text-green-300 capitalize">
                  {member.role}
                </p>
              </div>
              <div className="w-full h-max  flex gap-2 items-center justify-center mt-4">
                <button className="p-2 rounded-md bg-green-500">
                  <Eye size={20} color="white" />
                </button>
                <button className="p-2 rounded-md bg-red-500">
                  <Trash2 size={20} color="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

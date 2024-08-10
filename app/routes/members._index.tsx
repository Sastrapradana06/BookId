/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { ChevronRight, Search, UserSearch } from "lucide-react";
import CardMembers from "~/components/layout/card-members";
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
  if (dataMembers.status === false) {
    return json({ status: false, error: dataMembers.error });
  }

  return json({ status: true, data: dataMembers.data });
};

export default function Members() {
  const { pathname } = useLocation();
  const { data } = useLoaderData<LoaderDataMembers>();

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
        </div>
        <div className="w-full min-h-max max-h-[500px] relative overflow-auto mt-4 flex flex-wrap items-center justify-between lg:justify-center gap-4 lg:mt-8">
          {data?.map((member: any) => (
            <CardMembers
              key={member.id}
              id={member.id}
              username={member.username}
              role={member.role}
              status={member.status}
              foto_profil={member.foto_profil}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

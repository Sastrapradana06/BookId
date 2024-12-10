/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { Search, UserSearch } from "lucide-react";
import { useState } from "react";
import CardMembers from "~/components/layout/card-members";
import Container from "~/components/layout/container";
import NavLink from "~/components/layout/nav-link";
import { isAuthUser } from "~/services/auth.server";
import { getDataDb } from "~/services/supabase/fetch.server";
import { MembersDB } from "~/utils/type";

type LoaderDataMembers = {
  status: boolean;
  data?: MembersDB[];
  error?: {
    code: string;
  };
};

const dataLink = [
  {
    name: "members",
    link: "/members",
  },
  {
    name: "tambah member",
    link: "/members/add",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Members" },
    { name: "Data Members", content: "Welcome to Data Members" },
  ];
};

function filterByStatus(members: MembersDB[], status: string): MembersDB[] {
  if (status === "aktif") {
    return members.filter((item) => item.status === "aktif");
  } else if (status === "non-aktif") {
    return members.filter((item) => item.status === "non-aktif");
  }
  return members;
}

function filterByQuery(members: MembersDB[], query: string): MembersDB[] {
  const filteredNama = members.filter((item) =>
    item.username.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRole = members.filter((item) => {
    return item.role.toLowerCase() === query.toLowerCase();
  });

  const filteredJekel = members.filter((item) => {
    return item.jekel.toLowerCase() === query.toLowerCase();
  });

  const filteredResults = [
    ...new Set([...filteredNama, ...filteredRole, ...filteredJekel]),
  ];

  return filteredResults;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const status = url.searchParams.get("status");

  const dataMembers = await getDataDb("data members");
  if (dataMembers.status === false) {
    return json({ status: false, error: dataMembers.error });
  }

  let filteredMembers = dataMembers.data || [];

  if (status) {
    filteredMembers = filterByStatus(filteredMembers, status);
  }

  if (q) {
    filteredMembers = filterByQuery(filteredMembers, q);
  }

  return json({ status: true, data: filteredMembers });
};

export default function Members() {
  const { data } = useLoaderData<LoaderDataMembers>();
  const [q, setQ] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const handelFormSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (q.length < 3) return;
    navigate(`/members?q=${q}`);
  };

  const handleStatusParams = (status: string) => {
    navigate(`/members?status=${status}`);
  };

  return (
    <Container>
      <section className="mt-1 lg:mt-0">
        <NavLink dataLink={dataLink} />
        <div className="w-full h-max mt-4 ">
          <form
            className="flex items-center w-full lg:w-[40%]"
            onSubmit={handelFormSearch}
          >
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
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className=" border bg-white shadow-lg border-gray-400 text-gray-900 text-sm rounded-3xl  block w-full ps-12 p-3.5 bg-transparent outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cari nama, role, jekel..."
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
        <div className="w-full h-max  mt-4 ">
          <div className="w-max flex  items-center gap-3">
            <p className="font-semibold text-[.9rem]">Status :</p>
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                onClick={() => handleStatusParams("semua")}
                className={`text-[.8rem] px-3 rounded-md  lg:px-4 lg:py-[1px] ${
                  status == "semua" || !status
                    ? "bg-red-500 text-white"
                    : "bg-transparent text-black border  border-gray-500"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => handleStatusParams("aktif")}
                className={`text-[.8rem] px-3  rounded-md lg:px-4 lg:py-[1px]  ${
                  status == "aktif"
                    ? "bg-red-500 text-white"
                    : "bg-transparent text-black border  border-gray-500"
                }`}
              >
                Aktif
              </button>
              <button
                onClick={() => handleStatusParams("non-aktif")}
                className={`text-[.8rem] px-3  rounded-md lg:px-4 lg:py-[1px]  ${
                  status == "non-aktif"
                    ? "bg-red-500 text-white"
                    : "bg-transparent text-black border border-gray-500"
                }`}
              >
                Tidak Aktif
              </button>
            </div>
          </div>
        </div>
        {data?.length == 0 && (
          <div className=" mt-10">
            <h1 className="text-[.9rem] font-semibold text-center text-red-500">
              Tidak ada data yang ditampilkan
            </h1>
          </div>
        )}
        <div className="w-full min-h-max max-h-[500px] relative overflow-auto mt-6 flex flex-wrap items-center justify-center lg:justify-center gap-4 lg:mt-8">
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

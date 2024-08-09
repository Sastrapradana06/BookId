/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  Cake,
  Check,
  ChevronLeft,
  Mail,
  MapPinIcon,
  Phone,
} from "lucide-react";
import { useState } from "react";
import Container from "~/components/layout/container";
import { getMembersId } from "~/services/supabase/fetch.server";

export const loader: LoaderFunction = async ({ params }) => {
  const idMember = params.id;
  if (!idMember) {
    return redirect("/members");
  }
  const getMember = await getMembersId(parseInt(idMember));
  if (getMember.status === false) {
    return redirect("/members");
  }
  return json({ success: true, data: getMember.data });
};

export default function MembersDetail() {
  const [isActive, setIsActive] = useState(true);
  const loader = useLoaderData<any>();
  const user = loader.data[0];

  console.log({ user });

  // Fungsi untuk menangani perubahan toggle
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <Container>
      <div className="w-full h-max ">
        <Link to="/members" className="flex items-center gap-1">
          <ChevronLeft size={23} color="black" />
        </Link>
        <div className="w-full h-max mt-6  rounded-lg bg-gray-700 rounded-b-3xl lg:w-[80%] lg:m-auto">
          <div className="w-max h-max m-auto  flex flex-col items-center gap-3 p-2">
            <img
              src={user.foto_profil}
              alt="foto profil"
              className={`w-[170px]  h-[170px] ring ${
                user.jekel == "perempuan" ? "ring-pink-500 " : "ring-sky-500"
              } rounded-full object-cover`}
            />
            <div className="flex flex-col items-center">
              <img
                src={user.jekel == "perempuan" ? "/female1.png" : "/male.png"}
                alt="icons"
                className="w-[20px]"
              />
              <h1 className="zain font-semibold text-[1.8rem] -mt-1 lg:text-[2rem] text-white capitalize">
                {user.username}
              </h1>
              <span
                className={`px-4 py-1.5 rounded-xl text-[.8rem] text-white capitalize ${
                  user.role == "super admin"
                    ? "bg-rose-500"
                    : user.role == "admin"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
          <div className="w-full h-max pb-6 shadow-xl mt-2 rounded-3xl bg-white pt-6">
            <div className="w-[90%] h-max m-auto flex flex-col lg:flex-row">
              <div className="w-full h-max lg:w-[50%]">
                <div className="w-full h-max flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-full bg-green-300">
                      <Check size={15} color="green" />
                    </span>
                    <p className="capitalize font-semibold">{user.status}</p>
                  </div>
                  <div className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={handleToggle}
                      className="sr-only peer"
                    />
                    <div
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        isActive ? "bg-green-400" : "bg-gray-200"
                      } peer-focus:outline-none peer-focus:ring-4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                    />
                  </div>
                </div>
                <div className="w-full h-max flex justify-between items-center mt-5">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-full bg-pink-500">
                      <Mail size={15} color="white" />
                    </span>
                    <p>salsa@gmail.com</p>
                  </div>
                </div>
                <div className="w-full h-max flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-full bg-pink-500">
                      <Phone size={15} color="white" />
                    </span>
                    <p>089812563541</p>
                  </div>
                </div>
                <div className="w-full h-max flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-full bg-pink-500">
                      <MapPinIcon size={15} color="white" />
                    </span>
                    <p>Lubuk Pakam</p>
                  </div>
                </div>
                <div className="w-full h-max flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-full bg-pink-500">
                      <Cake size={15} color="white" />
                    </span>
                    <p>12 September 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

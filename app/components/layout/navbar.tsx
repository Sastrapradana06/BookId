import { Mail, SquareMenu } from "lucide-react";
import Sidebar from "./sidebar";
import { useState } from "react";
import { Link, useOutletContext } from "@remix-run/react";
import { UserContext } from "~/utils/type";
import { getDay, getFormattedDate } from "~/utils/utils";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user } = useOutletContext<UserContext>();

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <nav className="w-full h-[70px] bg-slate-100 z-20 fixed top-0 lg:h-[80px]">
        <div className="w-[90%] h-full m-auto flex justify-between items-center  lg:w-[95%]  lg:pl-[20%]">
          <button
            type="button"
            name="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden inline-block"
          >
            <SquareMenu size={33} />
          </button>
          <div className="w-max h-max  lg:flex flex-col -ml-10  lg:-ml-0">
            <h1 className="font-semibold text-[1rem] lg:text-[1.3rem] capitalize">
              {user.role}
            </h1>
            <p className="text-[.8rem] text-gray-400 font-semibold lg:text-[.9rem]">
              <span className="text-indigo-600 text-[.8rem] lg:text-[1rem]">
                {getDay()}
              </span>
              , {getFormattedDate()}
            </p>
          </div>
          <div className="w-max h-max flex items-center gap-4 lg:gap-6">
            <Link to="/notifikasi" className="cursor-pointer  p-1 relative">
              <Mail size={25} color="gray" />
              <div className="w-[10px] h-[10px] bg-red-500 rounded-full absolute top-0 right-0"></div>
            </Link>
            <img
              src={user.foto_profil}
              alt="avatar"
              className="w-[40px] h-[40px] object-cover rounded-lg ring-2 ring-gray-600"
            />
            <p
              className={`hidden lg:block capitalize lg:-ml-3  font-semibold ${
                user.jekel == "perempuan" ? "text-pink-600" : "text-indigo-600"
              }`}
            >
              {user.username}
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}

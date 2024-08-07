import { Mail, SquareMenu } from "lucide-react";
import Sidebar from "./sidebar";
import { useState } from "react";
import { useOutletContext } from "@remix-run/react";
import { getFirstLetters } from "~/utils/utils";
import { UserContext } from "~/utils/type";

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
          <div className="w-max h-max  lg:flex flex-col -ml-16  lg:-ml-0">
            <h1 className="font-semibold text-[1rem] lg:text-[1.3rem] capitalize">
              {user.role}
            </h1>
            <p className="text-[.9rem] text-gray-400 font-semibold">
              <span className="text-indigo-600 text-[.8rem] lg:text-[1rem]">
                Selasa
              </span>
              , 23 Juli 2024
            </p>
          </div>
          <div className="w-max h-max flex items-center gap-4 lg:gap-6">
            <Mail size={25} color="gray" />
            <button className="p-2 rounded-lg text-[.8rem] bg-indigo-200 text-indigo-500 font-semibold lg:-mr-4 uppercase">
              {getFirstLetters(user.name)}
            </button>
            <p className="hidden lg:block capitalize">{user.name}</p>
          </div>
        </div>
      </nav>
    </>
  );
}

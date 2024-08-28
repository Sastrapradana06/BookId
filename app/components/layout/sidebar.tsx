/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BookOpenText,
  BookUp,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog,
} from "lucide-react";
import ListLink from "../ui/list-link";
import { useOutletContext } from "@remix-run/react";
import { UserContext } from "~/utils/type";
import useAppStore from "~/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const { user, dataPerpus: data } = useOutletContext<UserContext>();
  const [dataPerpus, setDataPerpus] = useAppStore(
    useShallow((state: any) => [state.dataPerpus, state.setDataPerpus])
  );

  useEffect(() => {
    setDataPerpus(data);
  }, []);

  return (
    <div
      className={`w-[50%] h-[100vh] fixed top-0 left-0 bg-slate-100 z-10 lg:w-[20%] lg:z-30 transition-transform  lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <div className="w-[90%] h-max m-auto ">
        <div className="w-full h-[70px]  lg:h-[80px] flex items-center justify-center gap-2 ">
          <img src={dataPerpus.cover} alt="icons" className="w-[50px]" />
          <p className="text-[1.3rem] font-semibold capitalize">
            {dataPerpus.nama}
          </p>
        </div>
        <div className="w-full h-max flex flex-col items-center gap-7  py-6">
          <ListLink
            link="/dashboard"
            text="dashboard"
            icon={<LayoutDashboard />}
          />
          <ListLink link="/books" text="books" icon={<BookOpenText />} />
          <ListLink link="/members" text="members" icon={<CircleUserRound />} />
          <ListLink link="/pinjaman" text="pinjaman" icon={<BookUp />} />

          <ListLink link="/profile" text="profile" icon={<UserCog />} />
          {user.role === "super admin" && (
            <ListLink link="/setting" text="Setting" icon={<Settings />} />
          )}

          <ListLink link="/api/auth/logout" text="Log out" icon={<LogOut />} />
        </div>
      </div>
    </div>
  );
}

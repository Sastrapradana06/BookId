import {
  BookOpenText,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import ListLink from "../ui/list-link";

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div
      className={`w-[50%] h-[100vh] fixed top-0 left-0 bg-slate-100 z-10 lg:w-[20%] lg:z-30 transition-transform  lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <div className="w-[90%] h-max m-auto ">
        <div className="w-full h-[70px]  lg:h-[80px] flex items-center justify-center gap-2 ">
          <img src="/gitbook.svg" alt="icons" className="w-[50px]" />
          <p className="text-[1.3rem] font-semibold">BookID</p>
        </div>
        <div className="w-full h-max flex flex-col items-center gap-7  py-6">
          <ListLink
            link="/dashboard"
            text="dashboard"
            icon={<LayoutDashboard />}
          />
          <ListLink link="/books" text="books" icon={<BookOpenText />} />
          <ListLink link="/members" text="members" icon={<CircleUserRound />} />
          <ListLink link="/api/auth/logout" text="Log out" icon={<LogOut />} />
        </div>
      </div>
    </div>
  );
}

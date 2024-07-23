import { Link } from "@remix-run/react";
import { LayoutDashboard } from "lucide-react";

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div
      className={`w-[50%] h-[100vh] fixed top-0 left-0 bg-slate-100 z-10 lg:w-[20%] lg:z-30 transition-transform  lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <div className="w-[90%] h-[200px] m-auto">
        <div className="w-full h-[70px]  lg:h-[80px] flex items-center justify-center gap-2 ">
          <img src="/gitbook.svg" alt="icons" className="w-[50px]" />
          <p className="text-[1.3rem] font-semibold">BookID</p>
        </div>
        <div className="w-full h-[200px] flex flex-col items-center gap-3  py-6">
          <Link
            to={"/"}
            className="w-max flex items-center gap-2 lg:gap-4 font-semibold"
          >
            <LayoutDashboard />
            <p>Dashboard</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

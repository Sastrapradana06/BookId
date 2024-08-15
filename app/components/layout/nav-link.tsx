import { Link, useLocation } from "@remix-run/react";
import { ChevronRight } from "lucide-react";

export default function NavLink({
  dataLink,
}: {
  dataLink: { link: string; name: string }[];
}) {
  const { pathname } = useLocation();

  return (
    <div className="w-max flex items-center gap-1">
      {dataLink.map((link, i) => (
        <div key={i} className="flex items-center ">
          <Link
            to={link.link}
            className={`font-semibold text-[.8rem]  lg:text-[.9rem] ${
              pathname === link.link
                ? "text-gray-500 capitalize"
                : "text-gray-400 capitalize"
            }`}
          >
            {link.name}
          </Link>
          <ChevronRight size={18} className="mt-[1px]" />
        </div>
      ))}
    </div>
  );
}

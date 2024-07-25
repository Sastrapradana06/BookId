/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "@remix-run/react";
import React, { ReactNode } from "react";

const ListLink = ({
  link,
  text,
  icon,
}: {
  link: string;
  text: string;
  icon: ReactNode;
}) => {
  const { pathname } = useLocation();

  const iconColor = pathname.includes(text) ? "#6366F1" : "black";
  return (
    <Link
      to={link}
      className="w-[90%] lg:w-[70%] flex items-centerext-gray-400  gap-4 lg:gap-4 font-semibold "
    >
      {React.cloneElement(icon as React.ReactElement<any>, {
        color: iconColor,
      })}
      <p
        className={`capitalize zain text-[1.2rem] ${
          pathname.includes(text) ? "text-indigo-600 " : ""
        }`}
      >
        {text}
      </p>
    </Link>
  );
};

export default ListLink;

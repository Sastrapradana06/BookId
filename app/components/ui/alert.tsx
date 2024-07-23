import { CircleCheckBig, CircleX, Info } from "lucide-react";

export default function Alert({
  status,
  type,
  message,
}: {
  status: boolean;
  type: string;
  message: string;
}) {
  if (!status) return null;

  return (
    <div className="w-full h-max flex justify-center items-center fixed top-0 left-0 z-[1000]">
      <div
        className={`flex max-w-[90%] min-h-max lg:w-max items-center p-2 lg:p-4 mt-4 text-sm   border-2  rounded-lg bg-slate-100 shadow-sm  `}
        role="alert"
      >
        {type == "success" ? (
          <CircleCheckBig
            size={20}
            className="text-green-600  me-1"
            color="rgb(26, 221, 26)"
          />
        ) : type == "info" ? (
          <Info
            size={20}
            className="text-blue-600  me-1"
            color="rgb(26, 159, 221)"
          />
        ) : (
          <CircleX size={20} className="text-red-600  me-1" color="red" />
        )}
        <span className="sr-only">Info</span>
        <div>
          <p
            className={`text-[.9rem] ${
              type == "success"
                ? "text-green-500"
                : type == "info"
                ? "text-sky-500"
                : "text-red-500"
            } `}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

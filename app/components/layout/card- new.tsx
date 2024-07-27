import { CalendarRange, NotepadText, User } from "lucide-react";

export default function CardNew({
  cover,
  title,
  author,
  date,
  halaman,
}: {
  cover: string;
  title: string;
  author: string;
  date: string;
  halaman: string | number;
}) {
  return (
    <div className="w-[300px] h-[120px] bg-gray-600 rounded-lg mt-3 lg:h-[150px] flex items-center gap-6 p-2 lg:w-[400px] ">
      <img
        src={cover}
        alt="cover books"
        className="w-max h-[80%] object-cover"
      />
      <div className="w-max">
        <h1 className="font-semibold text-[1.5rem] capitalize text-indigo-200 lg:text-[1.9rem] zain">
          {title}
        </h1>
        <div className="flex items-center gap-1">
          <User color="white" size={15} />
          <p className="text-gray-300 text-[.7rem] lg:text-[.8rem]">{author}</p>
        </div>
        <div className="flex items-center gap-1">
          <CalendarRange color="white" size={15} />
          <p className="text-gray-300 text-[.7rem] lg:text-[.8rem]">{date}</p>
        </div>
        <div className="flex items-center gap-1">
          <NotepadText color="white" size={15} />
          <p className="text-gray-300 text-[.7rem] lg:text-[.8rem]">
            {halaman}
          </p>
        </div>
      </div>
    </div>
  );
}

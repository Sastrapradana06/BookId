import { useNavigate } from "@remix-run/react";
import { BookOpenText, Search } from "lucide-react";
import { useState } from "react";

export default function SearchInput({
  link,
  placeholder,
}: {
  link: string;
  placeholder: string;
}) {
  const [q, setQ] = useState<string>("");
  const navigate = useNavigate();
  const handelFormSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ q });
    // navigate(`/books?q=${q}`);
    navigate(`${link}=${q}`);
  };

  return (
    <form
      className="flex items-center w-full lg:w-[40%]"
      onSubmit={handelFormSearch}
    >
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-[90%] ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
          <BookOpenText color="black" size={20} />
        </div>
        <input
          type="text"
          id="simple-search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className=" border bg-white shadow-lg border-gray-400 text-gray-900 text-sm rounded-3xl  block w-full ps-12 p-3.5 bg-transparent outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          required={true}
        />
      </div>
      <button
        type="submit"
        className="p-3 ms-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-700 shadow-lg"
      >
        <Search color="white" size={20} />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}

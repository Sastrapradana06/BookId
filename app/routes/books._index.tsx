import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import {
  BookOpenText,
  ChevronRight,
  PencilLine,
  ScanEye,
  Search,
  Trash2,
} from "lucide-react";
import Container from "~/components/layout/container";
import { getBooks } from "~/services/supabase/fetch.server";
import { BookDB } from "~/utils/type";
import { formatDate } from "~/utils/utils";

type LoaderData = {
  status: boolean;
  data?: BookDB[];
  error?: {
    code: string;
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Data Books" },
    { name: "Data Books", content: "Welcome to Data books" },
  ];
};

export const loader: LoaderFunction = async () => {
  const dataBuku = await getBooks();
  if (dataBuku.status === false) {
    return json({ status: false, error: dataBuku.error });
  }
  console.log({ dataBuku });
  return json({ status: true, data: dataBuku.data });
};

export default function Books() {
  const { pathname } = useLocation();

  const { data } = useLoaderData<LoaderData>();

  // const books = [
  //   {
  //     id: 1,
  //     judul: "The Great Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     genre: "Fiction",
  //     language: "English",
  //     pages: 180,
  //     status: "tersedia",
  //     tahunTerbit: 1925,
  //     tahunPengadaan: "12 Februari 2024",
  //     stok: 10,
  //     terpinjam: 2,
  //     pengembalian: 4,
  //   },
  //   {
  //     id: 2,
  //     judul: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     genre: "Fiction",
  //     language: "English",
  //     pages: 281,
  //     status: "tersedia",
  //     tahunTerbit: 1960,
  //     tahunPengadaan: "12 Februari 2024",
  //     stok: 7,
  //     terpinjam: 1,
  //     pengembalian: 4,
  //   },
  //   {
  //     id: 3,
  //     judul: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     language: "English",
  //     pages: 328,
  //     status: "tersedia",
  //     tahunTerbit: 1949,
  //     tahunPengadaan: "12 Februari 2024",
  //     stok: 5,
  //     terpinjam: 3,
  //     pengembalian: 4,
  //   },
  //   {
  //     id: 4,
  //     judul: "Pride and Prejudice",
  //     author: "Jane Austen",
  //     genre: "Romance",
  //     language: "English",
  //     pages: 279,
  //     status: "tersedia",
  //     tahunTerbit: 1813,
  //     tahunPengadaan: "12 Februari 2024",
  //     stok: 8,
  //     terpinjam: 2,
  //     pengembalian: 4,
  //   },
  //   {
  //     id: 5,
  //     judul: "The Catcher in the Rye",
  //     author: "J.D. Salinger",
  //     genre: "Fiction",
  //     language: "English",
  //     pages: 214,
  //     status: "tersedia",
  //     tahunTerbit: 1951,
  //     tahunPengadaan: "12 Februari 2024",
  //     stok: 6,
  //     terpinjam: 1,
  //     pengembalian: 4,
  //   },
  // ];

  return (
    <Container>
      <section className="mt-1 lg:mt-0">
        <div className="w-max flex items-center gap-1">
          <Link
            to="/books"
            className={`font-semibold text-[.8rem]  lg:text-[.9rem] ${
              pathname === "/books" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Buku
          </Link>
          <ChevronRight size={18} className="mt-[1px]" />
          <Link
            to="add"
            className={`font-semibold text-[.8rem]  lg:text-[.9rem] ${
              pathname === "/books/add" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Tambah Buku
          </Link>
        </div>
        <div className="w-full h-max mt-4 flex  flex-wrap lg:justify-between lg:items-center">
          <form className="flex items-center w-full lg:w-[40%]">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <BookOpenText color="black" size={20} />
              </div>
              <input
                type="text"
                id="simple-search"
                className=" border-2 border-gray-400 text-gray-900 text-sm rounded-lg  block w-full ps-10 p-2.5 bg-transparent outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cari buku"
                required={true}
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-700"
            >
              <Search color="white" size={20} />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="min-h-max max-h-[450px] relative overflow-auto  mt-7 border border-gray-400 rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Judul Buku
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Cover
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Tersedia
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Stok
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Terpinjam
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Pengembalian
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Tahun Pengadaan
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((book, i) => (
                <tr className="bg-transparent border-b border-gray-400" key={i}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                  >
                    {book.judul_buku}
                  </th>
                  <th scope="row" className="px-6 py-4 ">
                    <img
                      src={book.cover}
                      alt="book_cover"
                      className="w-[50px] h-[50px] object-cover"
                    />
                  </th>

                  <td className="px-6 py-4">
                    {book.stok - (book.terpinjam + book.pengembalian) > 0 ? (
                      <p className="capitalize font-semibold text-green-500">
                        {book.stok - (book.terpinjam + book.pengembalian)}
                      </p>
                    ) : (
                      <p className="capitalize font-semibold text-red-500">
                        0{" "}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">{book.stok}</td>
                  <td className="px-6 py-4">{book.terpinjam}</td>
                  <td className="px-6 py-4">{book.pengembalian}</td>
                  <td className="px-6 py-4">{formatDate(book.created_at)}</td>

                  <td className="">
                    <div className="flex items-center gap-3 justify-center">
                      <Link to={`detail/${book.id}`}>
                        <ScanEye size={20} color="green" />
                      </Link>
                      <Link to={`/books/edit/`}>
                        <PencilLine size={20} color="purple" />
                      </Link>
                      <button>
                        <Trash2 size={20} color="crimson" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Container>
  );
}

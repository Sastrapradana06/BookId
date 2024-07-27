import { Link, useLocation, useOutletContext } from "@remix-run/react";
import {
  BookOpenText,
  ChevronRight,
  PencilLine,
  Search,
  Trash2,
} from "lucide-react";
import Container from "~/components/layout/container";
import { UserContext } from "~/utils/type";

export default function Books() {
  const { user } = useOutletContext<UserContext>();
  console.log({ user }, "user");

  const { pathname } = useLocation();

  console.log({ pathname });

  const books = [
    {
      judul: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      language: "English",
      pages: 180,
      status: "tersedia",
      tahunTerbit: 1925,
      tahunPengadaan: 2020,
      stok: 10,
      terpinjam: 2,
    },
    {
      judul: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      language: "English",
      pages: 281,
      status: "tersedia",
      tahunTerbit: 1960,
      tahunPengadaan: 2018,
      stok: 7,
      terpinjam: 1,
    },
    {
      judul: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      language: "English",
      pages: 328,
      status: "tersedia",
      tahunTerbit: 1949,
      tahunPengadaan: 2019,
      stok: 5,
      terpinjam: 3,
    },
    {
      judul: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      language: "English",
      pages: 279,
      status: "tersedia",
      tahunTerbit: 1813,
      tahunPengadaan: 2021,
      stok: 8,
      terpinjam: 2,
    },
    {
      judul: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
      language: "English",
      pages: 214,
      status: "tersedia",
      tahunTerbit: 1951,
      tahunPengadaan: 2017,
      stok: 6,
      terpinjam: 1,
    },
    {
      judul: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      language: "English",
      pages: 310,
      status: "tersedia",
      tahunTerbit: 1937,
      tahunPengadaan: 2016,
      stok: 9,
      terpinjam: 4,
    },
    {
      judul: "Fahrenheit 451",
      author: "Ray Bradbury",
      genre: "Dystopian",
      language: "English",
      pages: 194,
      status: "tersedia",
      tahunTerbit: 1953,
      tahunPengadaan: 2020,
      stok: 8,
      terpinjam: 3,
    },
    {
      judul: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Adventure",
      language: "Portuguese",
      pages: 163,
      status: "tersedia",
      tahunTerbit: 1988,
      tahunPengadaan: 2019,
      stok: 12,
      terpinjam: 5,
    },
    {
      judul: "One Hundred Years of Solitude",
      author: "Gabriel Garcia Marquez",
      genre: "Magic Realism",
      language: "Spanish",
      pages: 417,
      status: "tersedia",
      tahunTerbit: 1967,
      tahunPengadaan: 2018,
      stok: 4,
      terpinjam: 2,
    },
    {
      judul: "Moby Dick",
      author: "Herman Melville",
      genre: "Adventure",
      language: "English",
      pages: 635,
      status: "tersedia",
      tahunTerbit: 1851,
      tahunPengadaan: 2021,
      stok: 3,
      terpinjam: 1,
    },
  ];

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
            to="/books/add"
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
                  Author
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Genre
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Language
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Pages
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Tahun Terbit
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Tahun Pengadaan
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => (
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {book.judul}
                  </th>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">{book.genre}</td>
                  <td className="px-6 py-4">{book.language}</td>
                  <td className="px-6 py-4">{book.pages}</td>
                  <td className="px-6 py-4">{book.tahunTerbit}</td>
                  <td className="px-6 py-4">{book.tahunPengadaan}</td>
                  <td className="px-6 py-4">
                    <p
                      className={`capitalize font-semibold ${
                        book.status == "tersedia"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {book.status}
                    </p>
                  </td>
                  <td className="">
                    <div className="flex items-center gap-3 justify-center">
                      <Link to={`/books/edit/`}>
                        <PencilLine size={20} color="purple" />
                      </Link>
                      <Link to={`/books/edit/`}>
                        <Trash2 size={20} color="crimson" />
                      </Link>
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

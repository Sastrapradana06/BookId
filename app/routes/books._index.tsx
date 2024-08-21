/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import useHandleAlert from "hooks/useHandleAlert";
import { ScanEye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "~/components/layout/container";
import ModalDelete from "~/components/layout/modal-delete";
import NavLink from "~/components/layout/nav-link";
import SearchInput from "~/components/layout/search-input";
import Alert from "~/components/ui/alert";
import { isAuthUser } from "~/services/auth.server";
import { getDataDb } from "~/services/supabase/fetch.server";
import { BookDB } from "~/utils/type";
import { formatDate } from "~/utils/utils";

type LoaderData = {
  status: boolean;
  data?: BookDB[];
  error?: {
    code: string;
  };
};

const dataLink = [
  {
    name: "buku",
    link: "/books",
  },
  {
    name: "tambah buku",
    link: "/books/add",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Data Books" },
    { name: "Data Books", content: "Welcome to Data books" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const dataBuku = await getDataDb("data buku");
  if (dataBuku.status === false) {
    return json({ status: false, error: dataBuku.error });
  }

  if (q !== null && dataBuku.data) {
    const filter = dataBuku.data.filter((item: BookDB) =>
      item.judul_buku.toLowerCase().includes(q.toLowerCase())
    );

    return json({ status: true, data: filter });
  }

  return json({ status: true, data: dataBuku.data });
};

export default function Books() {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const [urlCoverBook, setUrlCoverBook] = useState<string[]>([]);
  const [idAllDelete, setIdAllDelete] = useState<number[]>([]);

  const fetcher = useFetcher<any>();
  const { data } = useLoaderData<LoaderData>();

  const deleteBuku = async () => {
    fetcher.submit(
      { idAllDelete, urlCoverBook },
      { method: "post", action: "/api/delete-books" }
    );
  };

  const handleCheck = (id: number, urlCover: string) => {
    if (idAllDelete.includes(id)) {
      setIdAllDelete(idAllDelete.filter((item) => item !== id));
    } else {
      setIdAllDelete([...idAllDelete, id]);
    }

    if (urlCover !== "/cover-black.jpeg" && !urlCoverBook.includes(urlCover)) {
      setUrlCoverBook([...urlCoverBook, urlCover]);
    } else {
      setUrlCoverBook(urlCoverBook.filter((item) => item !== urlCover));
    }
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", "Berhasil menghapus buku");
        setIsDeleteModal(false);
        setIdAllDelete([]);
      } else {
        setIsDeleteModal(false);
        handleAlert("error", "Gagal menghapus buku");
      }
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Container>
      <>
        <ModalDelete
          type="buku"
          isModalOpen={isDeleteModal}
          setIsModalOpen={setIsDeleteModal}
          funcDelete={deleteBuku}
        />
        <Alert
          status={status}
          type={dataAlert?.type}
          message={dataAlert?.message}
        />
      </>
      <section className="mt-1 lg:mt-0">
        <NavLink dataLink={dataLink} />
        <div className="w-full h-max mt-4 flex gap-4  flex-wrap lg:justify-between lg:items-center">
          <SearchInput link="/books?q" placeholder="Cari Buku" />
          <div className="w-max h-max  flex items-center gap-2">
            {idAllDelete.length > 0 ? (
              <button
                name="button"
                title="Delete"
                onClick={() => setIsDeleteModal(true)}
                className="p-2 rounded-lg bg-red-300 shadow-md"
              >
                <Trash2 size={20} color="crimson" />
              </button>
            ) : (
              <button
                name="button"
                title="Delete"
                className="p-2 rounded-lg bg-red-100 cursor-not-allowed"
              >
                <Trash2 size={20} color="crimson" />
              </button>
            )}
          </div>
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
                        onChange={() => handleCheck(book.id, book.cover)}
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
                    {book.stok - book.terpinjam > 0 ? (
                      <p className="capitalize font-semibold text-green-500">
                        {book.stok - book.terpinjam}
                      </p>
                    ) : (
                      <p className="capitalize font-semibold text-red-500">
                        0{" "}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">{book.stok}</td>
                  <td className="px-6 py-4">{book.terpinjam}</td>
                  <td className="px-6 py-4">{formatDate(book.created_at)}</td>

                  <td className="">
                    <div className="flex items-center gap-3 justify-center">
                      <Link to={`detail/${book.id}`}>
                        <ScanEye size={20} color="green" />
                      </Link>
                      {/* <button
                        name="button"
                        title="Delete"
                        onClick={() => showDeleteModal(book.id, book.cover)}
                      >
                        <Trash2 size={20} color="crimson" />
                      </button> */}
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

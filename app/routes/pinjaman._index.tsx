/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useOutletContext } from "@remix-run/react";
import useHandleAlert from "hooks/useHandleAlert";
import { Check, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "~/components/layout/container";
import ModalDelete from "~/components/layout/modal-delete";
import NavLink from "~/components/layout/nav-link";
import SearchInput from "~/components/layout/search-input";
import FormEditPinjaman from "~/components/template/form-edit-pinjaman";
import Alert from "~/components/ui/alert";

import { isAuthUser } from "~/services/auth.server";
import { getDataDb } from "~/services/supabase/fetch.server";
import { PinjamanType, UserContext } from "~/utils/type";
import { formatTanggal, getFirstLetters } from "~/utils/utils";

type LoaderDataPinjaman = {
  status: boolean;
  data?: PinjamanType[];
};

const dataLink = [
  {
    name: "pinjaman",
    link: "/pinjaman",
  },
  {
    name: "buat pinjaman",
    link: "/pinjaman/add",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Pinjaman" },
    { name: "Data Pinjaman", content: "Welcome to Data Pinjaman" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user: any = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  const getData = await getDataDb("data pinjaman");
  if (getData.status === false) {
    return json({ success: false, message: "data pinjaman tidak ditemukan" });
  }

  const dataPinjamanBuku = getData.data;
  if (user.role !== "super admin" && user.role !== "admin") {
    const filterByUser = dataPinjamanBuku.filter((item: any) => {
      return item.id_member == user.id;
    });

    return json({ success: true, data: filterByUser });
  }
  return json({ success: true, data: dataPinjamanBuku });
};

export default function PinjamanIdex() {
  const { data } = useLoaderData<LoaderDataPinjaman>();
  const { user } = useOutletContext<UserContext>();
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [dataEdit, editData] = useState<PinjamanType>();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState<any>({});
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const fetcher = useFetcher<any>();
  const handleEdit = (data: PinjamanType) => {
    editData(data);
    setIsModalEdit(true);
  };

  const showDeleteModal = (id: number, idBuku: number, status: string) => {
    setDataDelete({ id, idBuku, status });
    setIsDeleteModal(true);
  };

  const deleteBukuTerpinjam = async () => {
    setIsDeleteModal(false);
    const formData = new FormData();
    formData.append("id", dataDelete.id);
    formData.append("idBuku", dataDelete.idBuku);
    formData.append("status", dataDelete.status);

    fetcher.submit(formData, {
      method: "post",
      action: "/api/delete-pinjaman",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", "Pinjaman buku berhasil di hapus");
      } else {
        handleAlert("error", fetcher.data.message);
      }
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Container>
      <>
        <Alert
          status={status}
          type={dataAlert?.type}
          message={dataAlert?.message}
        />
        <ModalDelete
          type="pinjaman"
          isModalOpen={isDeleteModal}
          setIsModalOpen={setIsDeleteModal}
          funcDelete={deleteBukuTerpinjam}
        />
        {isModalEdit && (
          <FormEditPinjaman
            setIsModalEdit={setIsModalEdit}
            dataEdit={dataEdit}
          />
        )}
      </>
      <section className="mt-1 lg:mt-0">
        <NavLink dataLink={dataLink} />
        <div className="w-full h-max mt-4 flex gap-4  flex-wrap lg:justify-between lg:items-center">
          <SearchInput link="/pinjaman?q" placeholder="Cari buku terpinjam" />
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
                  Nama Peminjam
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  No KTP
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Tgl Dipinjam
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Tgl Dikembalikan
                </th>
                {(user?.role == "super admin" || user?.role == "admin") && (
                  <th scope="col" className="px-6 py-3 text-white">
                    Member
                  </th>
                )}

                <th scope="col" className="px-6 py-3 text-white">
                  Status
                </th>

                <th scope="col" className="px-6 py-3 text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length == 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-3 font-semibold text-red-400"
                  >
                    Belum ada buku terpinjam
                  </td>
                </tr>
              )}
              {data?.map((item, i) => (
                <tr className="bg-transparent border-b border-gray-400" key={i}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        // onChange={() => handleCheck(item.id, item.cover)}
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
                    {item.judul_buku}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                  >
                    <p className="text-red-500 font-semibold">
                      {item.nama_peminjam}
                    </p>
                  </th>
                  <td className="px-6 py-4">{item.no_ktp}</td>
                  <td className="px-6 py-4">
                    {formatTanggal(item.tgl_dipinjam)}
                  </td>
                  <td className="px-6 py-4">
                    {formatTanggal(item.tgl_pengembalian)}
                  </td>
                  {(user?.role == "super admin" || user?.role == "admin") && (
                    <td className="px-6 py-4">
                      <button
                        className="bg-amber-400 font-semibold uppercase p-2 rounded-md w-max text-white"
                        title={item.nama_member}
                      >
                        {getFirstLetters(item.nama_member)}
                      </button>
                    </td>
                  )}

                  <td className="px-6 py-4 capitalize">
                    <p
                      className={`font-semibold text-white p-2 text-[.8rem] rounded-md  ${
                        item.status === "terpinjam"
                          ? " bg-blue-500"
                          : item.status === "dikembalikan"
                          ? "bg-green-500"
                          : "bg-red-500 animate-pulse"
                      }`}
                    >
                      {item.status}
                    </p>
                  </td>

                  <td className="p-1">
                    <div className="flex items-center gap-2 justify-center">
                      <button
                        className="p-1 rounded-md bg-green-500"
                        name="button"
                        title="Dikembalikan"
                      >
                        <Check size={20} color="white" />
                      </button>
                      <button
                        className="p-1 rounded-md bg-yellow-500"
                        name="button"
                        title="edit"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil size={20} color="white" />
                      </button>
                      <button
                        className="p-1 rounded-md bg-red-500"
                        name="button"
                        title="delete"
                        onClick={() =>
                          showDeleteModal(item.id, item.id_buku, item.status)
                        }
                      >
                        <Trash2 size={20} color="white" />
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

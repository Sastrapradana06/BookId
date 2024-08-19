/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import useHandleAlert from "hooks/useHandleAlert";
import { useEffect } from "react";
import Container from "~/components/layout/container";
import NavLink from "~/components/layout/nav-link";
import Alert from "~/components/ui/alert";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import Loading from "~/components/ui/loading";
import { isAuthUser } from "~/services/auth.server";
import { getDataById, getDataDb } from "~/services/supabase/fetch.server";
import { insertDataDb } from "~/services/supabase/insert.server";
import { UserContext } from "~/utils/type";

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
    { title: "Tambah Pinjaman buku" },
    { name: "Tambah Pinjaman", content: "Welcome to Tambah Pinjaman" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  const getDataBuku = await getDataDb("data buku");
  if (getDataBuku.status === false) {
    return json({ success: false, message: "data buku tidak ditemukan" });
  }

  return json({ success: true, data: getDataBuku.data });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const data = {
    nama_peminjam: formData.get("nama_peminjam") as string,
    no_ktp: formData.get("no_ktp") as string,
    tgl_dipinjam: formData.get("tgl_dipinjam") as string,
    tgl_pengembalian: formData.get("tgl_pengembalian") as string,
    id_buku: formData.get("id_buku") as string,
    nama_buku: "",
    id_member: formData.get("idMember") as string,
  };

  const getBuku = await getDataById("data buku", parseInt(data.id_buku));

  if (getBuku.status === false) {
    return json({ success: false, message: "data buku tidak ditemukan" });
  }

  const dataBuku = getBuku.data[0];
  data.nama_buku = dataBuku.judul_buku;

  const simpanData = await insertDataDb("data pinjaman", data);

  if (simpanData.status === false) {
    if (simpanData.error.code === "23505") {
      return json({ success: false, message: "No KTP sudah terdaftar" });
    }
    return json({ success: false, message: "Data pinjaman gagal ditambahkan" });
  }

  return json({ success: true, message: "Data pinjaman berhasil ditambahkan" });
};

export default function TambahPinjaman() {
  const fetcher = useFetcher<any>();
  const { data: dataBuku } = useLoaderData<any>();
  const { user } = useOutletContext<UserContext>();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("idMember", user.id.toString());
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", "Member baru berhasil ditambahkan");
        navigate("/pinjaman");
      } else {
        handleAlert("error", fetcher.data.message);
      }
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Container>
      <>
        <Loading status={fetcher.state !== "idle"} />
        <Alert
          status={status}
          type={dataAlert?.type}
          message={dataAlert?.message}
        />
      </>
      <section className="mt-1 lg:mt-0">
        <NavLink dataLink={dataLink} />
        <div className="w-full h-max p-2 px-4 bg-slate-100 rounded-lg mt-6">
          <h1 className="zain text-[1.3rem] text-indigo-600 font-semibold">
            Form Tambah Peminjam
          </h1>
        </div>
        <div className="w-full h-max mt-1 py-2 px-4 bg-slate-100 rounded-lg">
          <fetcher.Form
            className="w-full h-max mt-4 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="w-full h-max flex flex-col justify-center gap-2 lg:flex-row borde-r">
              <div className="w-full">
                <Label htmlFor="nama_peminjam" teks="Nama Peminjam" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="nama_peminjam"
                  placeholder="lorem"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="no_ktp" teks="No KTP" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="no_ktp"
                  placeholder="1234xxxxx"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full ">
                <Label htmlFor="id_buku" teks="Nama buku" />
                <select
                  id="id_buku"
                  name="id_buku"
                  className="w-full rounded-lg  mt-2 h-[40px] px-2 text-[.9rem] bg-transparent border border-gray-300"
                >
                  {dataBuku.map((item: any, i: number) => (
                    <option value={item.id} key={i}>
                      {item.judul_buku}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <Label htmlFor="tgl_dipinjam" teks="Tanggal Dipinjam" />
                <Input
                  size="sm"
                  color="transparent"
                  type="date"
                  name="tgl_dipinjam"
                  placeholder="Pilih tanggal dipinjam"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col  gap-2 lg:flex-row borde-r">
              <div className="w-full lg:w-[50%]">
                <Label htmlFor="tgl_pengembalian" teks="Tanggal Pengembalian" />
                <Input
                  size="sm"
                  color="transparent"
                  type="date"
                  name="tgl_pengembalian"
                  placeholder="Pilih tanggal pengembalian"
                />
              </div>
            </div>
            <div className="w-full h-max mt-1">
              <button
                className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600"
                type="submit"
              >
                Simpan
              </button>
            </div>
          </fetcher.Form>
        </div>
      </section>
    </Container>
  );
}

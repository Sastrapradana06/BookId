import { ActionFunction, json } from "@remix-run/node";
import { getDataById } from "~/services/supabase/fetch.server";
import { insertDataDb } from "~/services/supabase/insert.server";
import { updateStokBook } from "~/services/supabase/update.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const data = {
    nama_peminjam: formData.get("nama_peminjam") as string,
    no_ktp: formData.get("no_ktp") as string,
    tgl_dipinjam: formData.get("tgl_dipinjam") as string,
    tgl_pengembalian: formData.get("tgl_pengembalian") as string,
    id_buku: formData.get("id_buku") as string,
    judul_buku: "",
    id_member: formData.get("idMember") as string,
    nama_member: formData.get("nama_member") as string,
  };

  const getBuku = await getDataById("data buku", parseInt(data.id_buku));

  if (getBuku.status === false) {
    return json({ success: false, message: "data buku tidak ditemukan" });
  }

  const dataBuku = getBuku.data[0];
  data.judul_buku = dataBuku.judul_buku;

  const simpanData = await insertDataDb("data pinjaman", data);
  console.log({ simpanData });

  if (simpanData.status === false) {
    const message =
      simpanData.error.code === "23505"
        ? "No KTP sudah terdaftar"
        : "Data pinjaman gagal ditambahkan";
    return json({ success: false, message });
  }

  const updateStok = await updateStokBook(dataBuku.id, dataBuku.terpinjam + 1);
  console.log({ updateStok });

  return json({ success: true, message: "Data pinjaman berhasil ditambahkan" });
};

export default function TambahPinjamanApi() {
  return null;
}

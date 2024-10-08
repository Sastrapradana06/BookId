import { ActionFunction, json } from "@remix-run/node";
import { getDataById } from "~/services/supabase/fetch.server";
import { insertDataDb } from "~/services/supabase/insert.server";
import { updateStokBook } from "~/services/supabase/update.server";

// const filterKetersediaanBuku = async () => {
//   const getData = await getDataDb("data buku");
//   if (getData.status === false) return;
//   const dataBuku = getData.data;
//   console.log({ dataBuku });

//   const data = dataBuku.filter((item) => {
//     return item.stok - item.terpinjam == 0;
//   });

//   if (data.length !== 0) {
//     const datadb: { judul_buku: string }[] = data.map((item) => ({
//       status: "ketersediaan",
//       judul_buku: item.judul_buku,
//     }));

//     console.log({ datadb });

//     const insertDataNotif = await insertMultipleDataDb("data notif", datadb);

//     console.log({ insertDataNotif });
//   }
// };

const notifKetersediaanBuku = async (id: number) => {
  const getData = await getDataById("data buku", id);
  const dataBuku = getData.data[0];

  if (dataBuku.terpinjam == dataBuku.stok) {
    const insertDataNotif = await insertDataDb("data notif", {
      status: "ketersediaan",
      judul_buku: dataBuku.judul_buku,
    });

    console.log({ insertDataNotif });
  }
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const data = {
    nama_peminjam: formData.get("nama_peminjam") as string,
    no_ktp: formData.get("no_ktp") as string,
    no_wa: formData.get("no_wa") as string,
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

  if (dataBuku.terpinjam >= dataBuku.stok) {
    return json({
      success: false,
      message: `Stok buku ${dataBuku.judul_buku} habis`,
    });
  }

  const simpanData = await insertDataDb("data pinjaman", data);

  if (simpanData.status === false) {
    const message =
      simpanData.error.code === "23505"
        ? "No KTP sudah terdaftar"
        : "Data pinjaman gagal ditambahkan";
    return json({ success: false, message });
  }

  await updateStokBook(dataBuku.id, dataBuku.terpinjam + 1);
  await notifKetersediaanBuku(parseInt(data.id_buku));

  return json({ success: true, message: "Data pinjaman berhasil ditambahkan" });
};

export default function TambahPinjamanApi() {
  return null;
}

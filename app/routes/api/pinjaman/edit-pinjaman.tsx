import { ActionFunction, json } from "@remix-run/node";
import { updateDataDb } from "~/services/supabase/update.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const dataUpdate = {
    nama_peminjam: formData.get("nama_peminjam") as string,
    no_ktp: formData.get("no_ktp") as string,
    tgl_dipinjam: formData.get("tgl_dipinjam") as string,
    tgl_pengembalian: formData.get("tgl_pengembalian") as string,
  };

  const update = await updateDataDb(
    "data pinjaman",
    parseInt(formData.get("id") as string),
    dataUpdate
  );
  if (update.status === false) {
    return json({ success: false, message: "Data pinjaman gagal diubah" });
  }

  return json({ success: true, message: "Data pinjaman berhasil diubah" });
};

export default function ApiEditPinjaman() {
  return null;
}

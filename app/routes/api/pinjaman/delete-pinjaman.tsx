import { ActionFunction, json } from "@remix-run/node";
import { deleteDataDb } from "~/services/supabase/delete.server";
import { getDataById } from "~/services/supabase/fetch.server";
import { updateStokBook } from "~/services/supabase/update.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const idBuku = formData.get("idBuku") as string;
  const statusPinjaman = formData.get("status") as string;

  if (statusPinjaman == "terpinjam") {
    const getBook = await getDataById("data buku", parseInt(idBuku));
    if (getBook.status === false) {
      return json({ success: false, message: "terjadi kesalahan" });
    }
    const dataBuku = getBook.data[0];

    const updateStokBuku = await updateStokBook(
      parseInt(idBuku),
      parseInt(dataBuku.terpinjam) - 1
    );
    if (updateStokBuku.status === false) {
      return json({ success: false, message: "terjadi kesalahan" });
    }
  }

  const deletePinjaman = await deleteDataDb("data pinjaman", parseInt(id));
  if (deletePinjaman.status === false) {
    return json({ success: false, message: "terjadi kesalahan" });
  }

  return json({ success: true, message: "Pinjaman buku berhasil di hapus" });
};

export default function ApiDeletePinjaman() {
  return null;
}

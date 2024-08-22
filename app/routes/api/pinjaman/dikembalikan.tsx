import { ActionFunction, json } from "@remix-run/node";
import { getDataById } from "~/services/supabase/fetch.server";
import {
  updateStatusPinjaman,
  updateStokBook,
} from "~/services/supabase/update.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const idBuku = formData.get("idBuku") as string;
  const status = formData.get("status") as string;

  const getBuku = await getDataById("data buku", parseInt(idBuku));
  if (getBuku.status === false) {
    return json({ success: false, message: "terjadi kesalahan" });
  }

  const dataBuku = getBuku.data[0];
  const resultBuku = await updateStokBook(
    parseInt(idBuku),
    parseInt(dataBuku.terpinjam) - 1
  );

  if (resultBuku.status === false) {
    return json({ success: false, message: "terjadi kesalahan " });
  }

  const result = await updateStatusPinjaman(parseInt(id), status);
  if (result.status === false) {
    return json({ success: false, message: "terjadi kesalahan" });
  }

  return json({ success: true, message: result.message });
};

export default function ApiPinjamanDikembalikan() {
  return null;
}

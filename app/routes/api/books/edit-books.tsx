import { ActionFunction, json } from "@remix-run/node";
import { updateBook } from "~/services/supabase/update.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = Number(formData.get("id"));
  const dataUpdate = {
    judul_buku: formData.get("judul_buku"),
    penulis: formData.get("penulis"),
    genre: formData.get("genre"),
    bahasa: formData.get("bahasa"),
    tahun_terbit: formData.get("tahun_terbit"),
    pages: parseInt(formData.get("pages") as string, 10),
    stok: parseInt(formData.get("stok") as string, 10),
  };

  const result = await updateBook(id, dataUpdate);
  if (result.status === false) {
    return json({ success: false, error: result.error });
  }

  return json({ success: true, dataUpdate });
};

export default function ApiEditBooks() {
  return (
    <div className="">
      <h1>Api Edit Books</h1>
    </div>
  );
}

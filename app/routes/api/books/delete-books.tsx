import { ActionFunction, json } from "@remix-run/node";
import { deleteBooksIds } from "~/services/supabase/delete.server";
import { extractFilePathArr } from "~/utils/utils";
import { deleteImg } from "~/services/supabase/storage.server";
// import { extractFilePath } from "~/utils/utils";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const idsString = formData.get("idAllDelete") as string;
  const urlCoverBook = formData.get("urlCoverBook") as string;

  const ids = idsString.split(",").map((id) => parseInt(id, 10));

  if (urlCoverBook) {
    const urls = extractFilePathArr(urlCoverBook.split(","));
    const deleteCover = await deleteImg(urls);
    if (!deleteCover)
      return json({ success: false, error: "Gagal menghapus cover buku" });
  }

  const result = await deleteBooksIds(ids);
  return json({ success: result.status });
};

export default function ApiDeleteBooks() {
  return (
    <div className="">
      <h1>Api Delete Books</h1>
    </div>
  );
}

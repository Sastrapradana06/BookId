import { ActionFunction, json } from "@remix-run/node";
import { deleteBooksIds } from "~/services/supabase/delete.server";
// import { deleteImg } from "~/services/supabase/storage.server";
// import { extractFilePath } from "~/utils/utils";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const idsString = formData.get("idAllDelete") as string;
  const ids = idsString.split(",").map((id) => parseInt(id, 10));

  // const urlCover = String(formData.get("book_cover"));

  // if (urlCover !== "/cover-black.jpeg") {
  //   const url = extractFilePath(urlCover);
  //   await deleteImg(url);
  // }
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

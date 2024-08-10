import { ActionFunction, json } from "@remix-run/node";
import { deleteDataById } from "~/services/supabase/delete.server";
import { extractFilePathArr } from "~/utils/utils";
import { deleteImg } from "~/services/supabase/storage.server";
// import { extractFilePath } from "~/utils/utils";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const idMember = formData.get("idMember");
  const urlFotoProfil = formData.get("urlFotoProfil") as string;

  if (urlFotoProfil) {
    const urls = extractFilePathArr(urlFotoProfil.split(","));
    const deleteFotoProfil = await deleteImg(urls);
    if (!deleteFotoProfil)
      return json({ success: false, error: "Gagal menghapus foto profil" });
  }

  const result = await deleteDataById(
    "data members",
    parseInt(idMember as string)
  );
  return json({ success: result.status });
};

export default function ApiDeleteMembers() {
  return (
    <div className="">
      <h1>Api Delete Members</h1>
    </div>
  );
}

import { ActionFunction, json } from "@remix-run/node";
import {
  deleteImg,
  uploadImgProfile,
} from "~/services/supabase/storage.server";
import { updateDataDb } from "~/services/supabase/update.server";
import { extractFilePath } from "~/utils/utils";

type UpdateDataMembers = {
  status: boolean;
  error?: {
    code: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const imgUpdate = formData.get("img_update");
    const imgLama = formData.get("foto_profil") as string;
    const idMembers = formData.get("idMembers");
    console.log({ idMembers });

    if (imgLama != "/pp-cewek.jpeg" && imgLama != "/pp-cowok.jpeg") {
      const urls = extractFilePath(imgLama);

      const deleteFotoProfil = await deleteImg([urls]);

      if (!deleteFotoProfil)
        return json({ success: false, error: "Gagal update foto profil" });
    }

    const dataForm = {
      foto_profil: imgLama,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      wa: formData.get("wa") as string,
      jekel: formData.get("jekel") as string,
      tgl_lahir: formData.get("tgl_lahir") as string,
      alamat: formData.get("alamat") as string,
    };

    if (imgUpdate && imgUpdate instanceof File) {
      if (imgUpdate.size != 0 && imgUpdate.name != "") {
        const upload = await uploadImgProfile(imgUpdate);

        if (upload) {
          dataForm.foto_profil = upload;
        } else {
          return json({
            success: false,
            message: "Gagal update foto profil",
          });
        }
      }
    }

    const updateMembers: UpdateDataMembers = await updateDataDb(
      "data members",
      parseInt(idMembers as string),
      dataForm
    );
    if (!updateMembers.status)
      return json({ success: false, message: "Gagal update profil" });

    return json({ success: true, message: "Profil berhasil diupdate" });
  } catch (error) {
    return json({ success: false, message: (error as Error).message });
  }
};

export default function ApiUpdateProfile() {
  return null;
}

import { ActionFunction, json } from "@remix-run/node";
import { insertMembers } from "~/services/supabase/insert.server";
import { uploadImgProfile } from "~/services/supabase/storage.server";
import { generatePassword } from "~/utils/utils";

type InsertDataMembers = {
  status: boolean;
  error?: {
    code: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const imgProfil = formData.get("img_profil");

    const dataForm = {
      foto_profil: "",
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      wa: formData.get("wa") as string,
      jekel: formData.get("jekel") as string,
      status: formData.get("status") as string,
      role: formData.get("role") as string,
      tgl_lahir: formData.get("tgl_lahir") as string,
      alamat: formData.get("alamat") as string,
      password: generatePassword(formData.get("role") as string),
    };

    if (imgProfil && imgProfil instanceof File) {
      if (imgProfil.size != 0 && imgProfil.name != "") {
        const upload = await uploadImgProfile(imgProfil);

        if (upload) {
          dataForm.foto_profil = upload;
        } else {
          return json({
            success: false,
            message: "foto profil gagal diunggah",
          });
        }
      } else {
        if (dataForm.jekel == "laki-laki") {
          dataForm.foto_profil = "/pp-cowok.jpeg";
        } else {
          dataForm.foto_profil = "/pp-cewe.jpeg";
        }
      }
    }

    const insertMember: InsertDataMembers = await insertMembers(dataForm);

    if (insertMember.status) {
      return json({ success: true, message: "Member buku ditambahkan" });
    } else {
      if (insertMember.error?.code == "23505") {
        return json({ success: false, message: "Email sudah terdaftar" });
      } else {
        return json({ success: false, message: "Member gagal ditambahkan" });
      }
    }
  } catch (error) {
    return json({ success: false, message: (error as Error).message });
  }
};

export default function ApiTambahMembers() {
  return (
    <div className="">
      <h1>Api Tambah Members</h1>
    </div>
  );
}

import { ActionFunctionArgs, json } from "@remix-run/node";
import { insertBook } from "~/services/supabase/insert.server";
import { uploadImgProfile } from "~/services/supabase/storage.server";

type InsertDataBuku = {
  status: boolean;
  error?: {
    code: string;
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const fileCover = formData.get("cover");

    const dataForm = {
      cover: "/cover-black.jpeg",
      judul_buku: formData.get("judul"),
      penulis: formData.get("penulis"),
      genre: formData.get("genre"),
      bahasa: formData.get("bahasa"),
      pages: parseInt(formData.get("jumlah_halaman") as string, 10),
      tahun_terbit: formData.get("tahun_terbit"),
      stok: parseInt(formData.get("stok") as string, 10),
    };

    if (fileCover && fileCover instanceof File) {
      if (fileCover.size != 0 && fileCover.name != "") {
        const upload = await uploadImgProfile(fileCover);

        if (upload) {
          dataForm.cover = upload;
        } else {
          return json({
            success: false,
            message: "Cover buku gagal ditambahkan",
          });
        }
      }
    }

    const insertDataBuku: InsertDataBuku = await insertBook(dataForm);

    if (insertDataBuku.status) {
      return json({ success: true, message: "Data buku ditambahkan" });
    } else {
      if (insertDataBuku.error?.code == "23505") {
        return json({ success: false, message: "Judul buku sudah ada" });
      }
    }
  } catch (error) {
    return json({ success: false, message: (error as Error).message });
  }
};

export default function ApiTambahBooks() {
  return (
    <div className="">
      <h1>Api Tambah Books</h1>
    </div>
  );
}

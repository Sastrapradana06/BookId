/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "~/lib/supabase";

// interface InsertBook {
//   cover: string;
//   judul_buku: FormDataEntryValue | string;
//   penulis: FormDataEntryValue | string;
//   genre: FormDataEntryValue | string;
//   bahasa: FormDataEntryValue | string;
//   pages: number;
//   tahun_terbit: FormDataEntryValue | string;
//   stok: number;
//   terpinjam?: number;
//   pengembalian?: number;
// }

export async function insertBook(data: any) {
  try {
    const { error } = await supabase.from("data buku").insert([data]);

    if (error) {
      throw error;
    }

    return { status: true };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
}

export async function insertMembers(data: any) {
  try {
    const { error } = await supabase.from("data members").insert([data]);

    if (error) {
      throw error;
    }

    return { status: true };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
}

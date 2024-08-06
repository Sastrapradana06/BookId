import supabase from "~/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function deleteBookId(id: number) {
  try {
    const { error } = await supabase.from("data buku").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return { status: true };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
}

export async function deleteBooksIds(ids: number[]) {
  try {
    const { error } = await supabase.from("data buku").delete().in("id", ids);

    if (error) {
      throw error;
    }

    return { status: true };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
}

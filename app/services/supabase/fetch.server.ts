import supabase from "~/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getBooks() {
  try {
    const { data, error } = await supabase
      .from("data buku")
      .select()
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    return { status: true, data };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
}

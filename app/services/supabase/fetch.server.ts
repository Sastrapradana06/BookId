import supabase from "~/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Books
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

export async function getBooksId(id: number) {
  try {
    const { data, error } = await supabase
      .from("data buku")
      .select()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return { status: true, data };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
}

// members
export async function getMembers() {
  try {
    const { data, error } = await supabase
      .from("data members")
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
export async function getMembersId(id: number) {
  try {
    const { data, error } = await supabase
      .from("data members")
      .select()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return { status: true, data };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
}

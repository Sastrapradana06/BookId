import supabase from "~/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getDataDb(db: string) {
  try {
    const { data, error } = await supabase
      .from(db)
      .select()
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    return { status: true, data };
  } catch (error: any) {
    return {
      status: false,
      error: { code: error.code || "UNKNOWN_ERROR" },
      data: [],
    };
  }
}

export async function getuserByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from("data members")
      .select()
      .eq("email", email);

    if (error) {
      throw error;
    }

    return { status: true, data };
  } catch (error: any) {
    return {
      status: false,
      error: { code: error.code || "UNKNOWN_ERROR" },
      data: [],
    };
  }
}

export async function getDataById(db: string, id: number) {
  try {
    const { data, error } = await supabase.from(db).select().eq("id", id);

    if (error) {
      throw error;
    }

    return { status: true, data };
  } catch (error: any) {
    return {
      status: false,
      error: { code: error.code || "UNKNOWN_ERROR" },
      data: [],
    };
  }
}

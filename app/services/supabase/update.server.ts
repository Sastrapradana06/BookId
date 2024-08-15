import supabase from "~/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateBook = async (id: number, data: any) => {
  try {
    const { error } = await supabase
      .from("data buku")
      .update(data)
      .eq("id", id);
    if (error) {
      throw error;
    }
    return { status: true };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
};

export const updateDataDb = async (db: string, id: number, data: any) => {
  try {
    const { error } = await supabase.from(db).update(data).eq("id", id);
    if (error) {
      throw error;
    }
    return { status: true };
  } catch (error: any) {
    return { status: false, error: { code: error.code || "UNKNOWN_ERROR" } };
  }
};
// members
export const updateStatusMembers = async (id: number, status: string) => {
  try {
    const { error } = await supabase
      .from("data members")
      .update({ status })
      .eq("id", id);
    if (error) {
      throw error;
    }
    return { status: true, message: "Status member diperbarui" };
  } catch (error: any) {
    return { status: false, message: { code: error.code || "UNKNOWN_ERROR" } };
  }
};

export const updateRoleMembers = async (id: number, newRole: string) => {
  try {
    const { error } = await supabase
      .from("data members")
      .update({ role: newRole })
      .eq("id", id);
    if (error) {
      throw error;
    }
    return { status: true, message: "Role member berhasil diperbarui" };
  } catch (error: any) {
    return { status: false, message: { code: error.code || "UNKNOWN_ERROR" } };
  }
};

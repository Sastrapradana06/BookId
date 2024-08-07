import supabase from "~/lib/supabase";
interface GetPublicUrlResponse {
  data: {
    publicUrl: string;
  };
  error?: Error;
}
export const uploadImg = async (file: File) => {
  const { error } = await supabase.storage
    .from("cover_book")
    .upload(`${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.log(error);
    return null;
  }

  const { data, error: urlError }: GetPublicUrlResponse = supabase.storage
    .from("cover_book")
    .getPublicUrl(`${file.name}`);

  if (urlError) {
    console.log(urlError);
    return null;
  }
  return data.publicUrl;
};

export const deleteImg = async (arrUrl: string[]) => {
  const { error } = await supabase.storage.from("cover_book").remove(arrUrl);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
};

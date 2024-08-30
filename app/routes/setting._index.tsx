/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import useHandleAlert from "hooks/useHandleAlert";
import useHandleFile from "hooks/useHandleFile";
import useHandleInput from "hooks/useHandleInput";
import { Camera } from "lucide-react";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import Container from "~/components/layout/container";
import Alert from "~/components/ui/alert";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import Loading from "~/components/ui/loading";
import { isAuthUser } from "~/services/auth.server";
import { getDataDb } from "~/services/supabase/fetch.server";
import {
  deleteImg,
  uploadImgProfile,
} from "~/services/supabase/storage.server";
import { updateDataDb } from "~/services/supabase/update.server";
import useAppStore from "~/store";
import { extractFilePath } from "~/utils/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Setting" },
    { name: "Setting", content: "Welcome to Setting" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const fomData = await request.formData();
  const cover = fomData.get("cover") as File;
  const coverLama = fomData.get("coverLama") as string;
  const nama = fomData.get("nama") as string;

  if (nama.length > 7) {
    return json({ success: false, message: "Nama max 7 karakter" });
  }

  const dataUpdate = {
    cover: coverLama,
    nama,
  };

  if (coverLama != "/gitbook.svg") {
    const urls = extractFilePath(coverLama);

    const deleteFotoProfil = await deleteImg([urls]);

    if (!deleteFotoProfil) {
      return json({ success: false, error: "Gagal update foto profil" });
    }
  }

  if (cover && cover instanceof File) {
    if (cover.size != 0 && cover.name != "") {
      const upload = await uploadImgProfile(cover);

      if (upload) {
        dataUpdate.cover = upload;
      } else {
        return json({
          success: false,
          message: "Gagal update foto profil",
        });
      }
    }
  }

  const update = await updateDataDb("data perpustakaan", 1, dataUpdate);
  if (update.status === false) {
    return json({ success: false, message: "Data perpustakaan gagal diubah" });
  }

  return json({
    success: true,
    message: "Data perpustakaan berhasil diubah",
    data: update.data?.length ? update.data[0] : null,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  const getData = await getDataDb("data perpustakaan");
  const dataPerpus = getData.data[0];

  return json({ user, dataPerpus });
};

export default function IndexSeting() {
  const { dataPerpus } = useLoaderData<any>();
  const fileRef = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher<any>();

  const { urlImg, handleFile } = useHandleFile();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { data: dataInput, onChange } = useHandleInput({
    nama: dataPerpus ? dataPerpus.nama : "",
  });
  const [setDataPerpus] = useAppStore(
    useShallow((state: any) => [state.setDataPerpus])
  );

  const handleInputFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("coverLama", dataPerpus.cover);
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", fetcher.data.message);
        if (fetcher.data.data) {
          const { cover, nama } = fetcher.data.data;
          setDataPerpus({ cover, nama });
        }
      } else {
        handleAlert("error", fetcher.data.message);
      }
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Container>
      <>
        <Loading status={fetcher.state != "idle"} />
        <Alert
          status={status}
          type={dataAlert?.type}
          message={dataAlert?.message}
        />
      </>
      <section className="w-full h-max p-2">
        <h1 className="font-semibold text-slate-700">
          Pengaturan Perpustakaan
        </h1>
        <div className="w-full  mt-4 ">
          <div className="w-max h-max relative py-3">
            <img
              src={urlImg || dataPerpus.cover}
              alt="img_cover"
              className="w-[130px] h-[130px] rounded-full border-2 border-indigo-500"
            />
            <button
              className="absolute bottom-0 right-0 p-2 rounded-lg bg-orange-400 shadow-2xl hover:bg-orange-500"
              onClick={handleInputFile}
            >
              <Camera size={20} color="white" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="w-full mt-4">
            <input
              type="file"
              name="cover"
              className="hidden"
              ref={fileRef}
              onChange={handleFile}
            />
            <div className="w-full lg:w-[48%]">
              <Label htmlFor="nama" teks="Nama Perpustakaan" />
              <Input
                size="sm"
                color="transparent"
                type="text"
                name="nama"
                value={dataInput.nama}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <Button
                type="submit"
                name="simpan"
                text="Simpan"
                color="green"
                size="px-4 py-1 rounded-lg"
              />
            </div>
          </form>
        </div>
      </section>
    </Container>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookDB } from "~/utils/type";
import Input from "../ui/input";
import Label from "../ui/label";
import useHandleInput from "hooks/useHandleInput";
import { useEffect } from "react";
import Loading from "../ui/loading";
import useHandleAlert from "hooks/useHandleAlert";
import Alert from "../ui/alert";
import { useFetcher, useLoaderData } from "@remix-run/react";

export default function FormEdit({
  isModal,
  setIsModal,
  data,
}: {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: BookDB | null;
}) {
  const { status, data: alert, handleAlert } = useHandleAlert();
  const fetcher = useFetcher<any>();
  const loader = useLoaderData<any>();

  const { data: dataInput, onChange, editData } = useHandleInput({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = dataInput;
    fetcher.submit(formData, {
      method: "post",
      action: "/books/detail/" + data?.id,
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      handleFetchResponse();
    }

    if (fetcher.state === "idle" && loader) {
      editData(loader.data[0]);
    }
  }, [fetcher.data, fetcher.state, loader.data]);

  const handleFetchResponse = () => {
    if (fetcher.data.success) {
      handleAlert("success", "Berhasil edit buku");
      setIsModal(false);
    } else {
      handleAlert("error", "Gagal edit buku");
    }
  };

  return (
    <>
      <Loading status={fetcher.state === "loading"} />
      <Alert status={status} type={alert?.type} message={alert?.message} />

      {isModal && (
        <div className="modal">
          <form
            onSubmit={handleSubmit}
            className="w-[95%] h-max bg-slate-100 rounded-lg p-3 lg:w-[50%] flex flex-col gap-4 pb-4"
          >
            <div className="w-full h-max flex flex-col justify-center gap-2 lg:flex-row borde-r">
              <div className="w-full">
                <Label htmlFor="judul" teks="Judul Buku" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="judul_buku"
                  value={dataInput?.judul_buku}
                  onChange={onChange}
                  placeholder="Masukkan Judul Buku"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="penulis" teks="Penulis" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="penulis"
                  value={dataInput?.penulis}
                  onChange={onChange}
                  placeholder="Penulis buku"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full">
                <Label htmlFor="genre" teks="Genre" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="genre"
                  value={dataInput?.genre}
                  onChange={onChange}
                  placeholder="Genre buku"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="bahasa" teks="Bahasa" />
                <select
                  id="bahasa"
                  name="bahasa"
                  value={dataInput?.bahasa}
                  onChange={onChange}
                  className="w-full rounded-lg mt-2 h-[40px] px-2 text-[.9rem] bg-transparent border border-gray-300"
                >
                  <option value="" disabled>
                    Pilih Bahasa
                  </option>
                  <option value="indonesia">Bahasa Indonesia</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full">
                <Label htmlFor="tahun_terbit" teks="Tahun Terbit" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="tahun_terbit"
                  value={dataInput?.tahun_terbit}
                  onChange={onChange}
                  placeholder="Tahun Terbit"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="jumlah_halaman" teks="Jumlah Halaman" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="pages"
                  value={dataInput?.pages}
                  onChange={onChange}
                  placeholder="Jumlah Halaman"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full">
                <Label htmlFor="stok" teks="Jumlah Stok" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="stok"
                  value={dataInput?.stok}
                  onChange={onChange}
                  placeholder="Stok Buku"
                />
              </div>
            </div>
            <div className="w-full h-max flex gap-3">
              <button
                className="w-[130px] py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={() => setIsModal(false)}
                title="Close"
                type="button"
              >
                Batal
              </button>
              <button
                className="w-[130px] py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                title="Save"
                type="submit"
              >
                Edit Buku
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetcher } from "@remix-run/react";
import Input from "../ui/input";
import Label from "../ui/label";
import useHandleInput from "hooks/useHandleInput";
import { PinjamanType } from "~/utils/type";
import { useEffect } from "react";
import useHandleAlert from "hooks/useHandleAlert";
import Loading from "../ui/loading";
import Alert from "../ui/alert";

export default function FormEditPinjaman({
  dataEdit,
  setIsModalEdit,
}: {
  dataEdit: PinjamanType | undefined;
  setIsModalEdit: any;
}) {
  const fetcher = useFetcher<any>();
  const { data: input, onChange, reset } = useHandleInput(dataEdit);
  const { status, data: dataAlert, handleAlert } = useHandleAlert();

  const handleFormEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetcher.submit(input, {
      method: "post",
      encType: "multipart/form-data",
      action: "/api/edit-pinjaman",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", "Data pinjaman berhasil diubah");
        setTimeout(() => {
          setIsModalEdit(false);
          reset();
        }, 1500);
      } else {
        handleAlert("error", "Data gagal diubah");
      }
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <>
      <>
        <Loading status={fetcher.state !== "idle"} />
        <Alert
          status={status}
          type={dataAlert?.type}
          message={dataAlert?.message}
        />
      </>
      <div className="modal">
        <form
          onSubmit={handleFormEdit}
          className="w-[95%] h-max py-4 px-3 lg:w-[55%] rounded-md bg-slate-50 flex flex-col gap-2"
        >
          <div className="w-full h-max flex flex-col justify-center gap-2 lg:flex-row borde-r">
            <div className="w-full">
              <Label htmlFor="nama_peminjam" teks="Nama Peminjam" />
              <Input
                size="sm"
                color="transparent"
                type="text"
                name="nama_peminjam"
                placeholder="lorem"
                value={input?.nama_peminjam}
                onChange={onChange}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="no_ktp" teks="No KTP" />
              <Input
                size="sm"
                color="transparent"
                type="text"
                name="no_ktp"
                value={input?.no_ktp}
                onChange={onChange}
                placeholder="1234xxxxx"
              />
            </div>
          </div>
          <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
            <div className="w-full ">
              <Label htmlFor="no_wa" teks="No Wa" />
              <Input
                size="sm"
                color="transparent"
                type="text"
                name="no_wa"
                value={input?.no_wa}
                onChange={onChange}
                placeholder="No Wa"
              />
            </div>
            <div className="w-full ">
              <Label htmlFor="judul_buku" teks="Judul buku" />
              <Input
                size="sm"
                color="transparent"
                type="text"
                name="judul_buku"
                value={input?.judul_buku}
                onChange={onChange}
                placeholder="Judul Buku"
                readOnly
              />
            </div>
          </div>
          <div className="w-full h-max flex flex-col  gap-2 lg:flex-row borde-r">
            <div className="w-full">
              <Label htmlFor="tgl_dipinjam" teks="Tanggal Dipinjam" />
              <Input
                size="sm"
                color="transparent"
                type="date"
                name="tgl_dipinjam"
                value={input?.tgl_dipinjam}
                onChange={onChange}
                placeholder="Pilih tanggal dipinjam"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="tgl_pengembalian" teks="Tanggal Pengembalian" />
              <Input
                size="sm"
                color="transparent"
                type="date"
                name="tgl_pengembalian"
                value={input?.tgl_pengembalian}
                onChange={onChange}
                placeholder="Pilih tanggal pengembalian"
              />
            </div>
          </div>
          <div className="w-full h-max mt-3">
            <button
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              type="submit"
            >
              Simpan
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 ml-3"
              type="button"
              onClick={() => setIsModalEdit(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

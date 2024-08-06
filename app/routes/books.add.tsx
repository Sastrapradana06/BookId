/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetaFunction } from "@remix-run/node";
import { Link, useFetcher, useLocation } from "@remix-run/react";
import useHandleAlert from "hooks/useHandleAlert";
import useHandleFile from "hooks/useHandleFile";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import Container from "~/components/layout/container";
import Alert from "~/components/ui/alert";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import Loading from "~/components/ui/loading";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Books" },
    { name: "Add Books", content: "Welcome to Add books" },
  ];
};

export default function AddBooks() {
  const fetcher = useFetcher<any>();

  const { pathname } = useLocation();

  const { urlImg, handleFile, reset } = useHandleFile();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();

  const refImg = useRef<HTMLInputElement>(null);
  const refForm = useRef<HTMLFormElement>(null);

  const handleInputFile = () => {
    if (refImg.current) {
      refImg.current.click();
    }
  };

  const resetForm = () => {
    if (refForm.current) {
      refForm.current.reset();
      reset();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      action: "/api/tambah-books",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", "Berhasil menambahkan data buku");
        resetForm();
      } else {
        handleAlert("error", fetcher.data.message);
      }
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Container>
      <>
        <Loading
          status={
            fetcher.state === "loading" || fetcher.state === "submitting"
              ? true
              : false
          }
        />
        <Alert
          status={status}
          type={dataAlert?.type}
          message={dataAlert?.message}
        />
      </>
      <section className="mt-1 lg:mt-0">
        <div className="w-max flex items-center gap-1">
          <Link
            to="/books"
            className={`font-semibold text-[.8rem]  lg:text-[.9rem] ${
              pathname === "/books" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Buku
          </Link>
          <ChevronRight size={18} className="mt-[1px]" />
          <Link
            to="/books/add"
            className={`font-semibold text-[.8rem]  lg:text-[.9rem] ${
              pathname === "/books/add" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Tambah Buku
          </Link>
        </div>
        <div className="w-full h-max p-2 px-4 bg-slate-100 rounded-lg mt-6">
          <h1 className="zain text-[1.3rem] text-indigo-600 font-semibold">
            Form Tambah Buku
          </h1>
        </div>
        <div className="w-full h-max mt-1 py-2 px-4 bg-slate-100 rounded-lg">
          <div className="w-max h-max ">
            <p>
              <span className="text-red-500">*</span> Cover Buku
            </p>
            <img
              src={urlImg ? urlImg : "/cover-black.jpeg"}
              alt="cover"
              className="w-[150px] h-[200px] rounded-md object-cover mt-1"
            />
            <button
              className="mt-2 text-[.9rem] w-[150px] py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
              onClick={handleInputFile}
            >
              Upload Cover
            </button>
          </div>
          <fetcher.Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            ref={refForm}
            className="w-full h-max mt-4 flex flex-col gap-4"
          >
            <div className="w-full h-max flex flex-col justify-center gap-2 lg:flex-row borde-r">
              <input
                type="file"
                name="cover"
                onChange={handleFile}
                ref={refImg}
                className="hidden"
              />
              <div className="w-full">
                <Label htmlFor="judul" teks="Judul Buku" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="judul"
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
                  placeholder="Penulis buku"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full ">
                <Label htmlFor="genre" teks="Genre" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="genre"
                  placeholder="Genre buku"
                />
              </div>
              <div className="w-full ">
                <Label htmlFor="bahasa" teks="Bahasa" />
                <select
                  id="bahasa"
                  name="bahasa"
                  className="w-full rounded-lg  mt-2 h-[40px] px-2 text-[.9rem] bg-transparent border border-gray-300"
                >
                  <option value="" disabled selected>
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
                  placeholder="Tahun Terbit"
                />
              </div>
              <div className="w-full ">
                <Label htmlFor="jumlah_halaman" teks="Jumlah Halaman" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="jumlah_halaman"
                  placeholder="Jumlah Halaman"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full ">
                <Label htmlFor="stok" teks="Jumlah Stok" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="stok"
                  placeholder="Stok Buku"
                />
              </div>
            </div>
            <div className="w-full h-max">
              <button
                className="w-[150px] py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600"
                type="submit"
              >
                Simpan Buku
              </button>
            </div>
          </fetcher.Form>
        </div>
      </section>
    </Container>
  );
}

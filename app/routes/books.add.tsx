/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useLocation } from "@remix-run/react";
import useHandleFile from "hooks/useHandleFile";
import { CalendarDays, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Container from "~/components/layout/container";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import supabase from "~/lib/supabase";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Books" },
    { name: "Add Books", content: "Welcome to Add books" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(process.env.SUPABASE_KEY);
  const formData = await request.formData();
  const dataForm = {
    judul_buku: formData.get("judul"),
    penulis: formData.get("penulis"),
    genre: formData.get("genre"),
    bahasa: formData.get("bahasa"),
    pages: formData.get("jumlah_halaman"),
    tahun_terbit: formData.get("tahun_terbit"),
    stok: parseInt(formData.get("stok") as string, 10),
  };

  try {
    const { error } = await supabase.from("data buku").insert([dataForm]);

    if (error) {
      throw error;
    }

    return json({ success: true, dataForm });
  } catch (error) {
    console.error("Error inserting data into Supabase:", error);
    return json({
      success: false,
      error: "Error inserting data into Supabase",
    });
  }
};

export default function AddBooks() {
  const actionData = useActionData();
  console.log({ actionData });

  const { pathname } = useLocation();

  const { urlImg, handleFile } = useHandleFile();
  const refImg = useRef<HTMLInputElement>(null);

  const handleInputFile = () => {
    if (refImg.current) {
      refImg.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const dataBuku = {
      cover: urlImg,
      judul: form.get("judul") as string,
      penulis: form.get("penulis") as string,
      genre: form.get("genre") as string,
      bahasa: form.get("bahasa") as string,
      tahun_terbit: form.get("tahun_terbit") as string,
      jumlah_halaman: form.get("jumlah_halaman") as string,
      tgl_pengadaan: form.get("tgl_pengadaan") as string,
      stok: form.get("stok") as string,
    };
    console.log(dataBuku);
  };

  return (
    <Container>
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
            to="add"
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
              src={
                urlImg
                  ? urlImg
                  : "https://ik.imagekit.io/ym7xz7t46/my.jpeg?updatedAt=1722262771247"
              }
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
          <Form
            method="post"
            encType="multipart/form-data"
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
                  plaseholder="Masukkan Judul Buku"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="penulis" teks="Penulis" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="penulis"
                  plaseholder="Penulis buku"
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
                  plaseholder="Genre buku"
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
              <div className="w-full ">
                <Label htmlFor="tahun_terbit" teks="Tahun Terbit" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="tahun_terbit"
                  plaseholder="Tahun Terbit"
                />
              </div>
              <div className="w-full ">
                <Label htmlFor="jumlah_halaman" teks="Jumlah Halaman" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="jumlah_halaman"
                  plaseholder="Jumlah Halaman"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              {/* <div className="w-full relative">
                <Label htmlFor="Tanggal Pengadaan" teks="Tgl. Pengadaan" />
                <input
                  type="date"
                  id="tgl_pengadaan"
                  name="tgl_pengadaan"
                  className="w-full rounded-lg  mt-2 h-[40px] px-2 text-[.9rem] bg-transparent border border-gray-300 pl-9"
                />
                <CalendarDays
                  size={20}
                  color="black"
                  className="absolute top-10 left-3"
                />
              </div> */}
              <div className="w-full ">
                <Label htmlFor="stok" teks="Jumlah Stok" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="stok"
                  plaseholder="Stok Buku"
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
          </Form>
        </div>
      </section>
    </Container>
  );
}

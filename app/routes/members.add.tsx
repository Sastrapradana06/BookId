/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetaFunction } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import useHandleAlert from "hooks/useHandleAlert";
import useHandleFile from "hooks/useHandleFile";
import { useEffect, useRef } from "react";
import Container from "~/components/layout/container";
import NavLink from "~/components/layout/nav-link";
import Alert from "~/components/ui/alert";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import Loading from "~/components/ui/loading";
const dataLink = [
  {
    name: "members",
    link: "/members",
  },
  {
    name: "tambah member",
    link: "/members/add",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Tambah Members" },
    { name: "Members", content: "Welcome to Members" },
  ];
};

export default function MembersAdd() {
  const { urlImg, handleFile, reset } = useHandleFile();
  const fetcher = useFetcher<any>();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const navigate = useNavigate();
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
      action: "/api/tambah-members",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", "Member baru berhasil ditambahkan");
        resetForm();
        navigate("/members");
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
        <NavLink dataLink={dataLink} />
        <div className="w-full h-max p-2 px-4 bg-slate-100 rounded-lg mt-6">
          <h1 className="zain text-[1.3rem] text-indigo-600 font-semibold">
            Form Tambah Member
          </h1>
        </div>
        <div className="w-full h-max mt-1 py-2 px-4 bg-slate-100 rounded-lg">
          <div className="w-max h-max ">
            <p>
              <span className="text-red-500">*</span> Foto Profil
            </p>
            <img
              src={urlImg ? urlImg : "/pp-cowok.jpeg"}
              alt="cover"
              className="w-[150px] h-[200px] rounded-md object-cover mt-1"
            />
            <button
              className="mt-2 text-[.9rem] w-[150px] py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
              onClick={handleInputFile}
            >
              Upload Foto
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
                name="img_profil"
                onChange={handleFile}
                ref={refImg}
                className="hidden"
              />
              <div className="w-full">
                <Label htmlFor="username" teks="Nama Lengkap" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="username"
                  placeholder="lorem"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="email" teks="Email" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="email"
                  placeholder="lorem@gmail.com"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full ">
                <Label htmlFor="wa" teks="No Wa" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="wa"
                  placeholder="08xxxxxxxxx"
                />
              </div>
              <div className="w-full ">
                <Label htmlFor="jekel" teks="Jenis Kelamin" />
                <select
                  id="jekel"
                  name="jekel"
                  className="w-full rounded-lg  mt-2 h-[40px] px-2 text-[.9rem] bg-transparent border border-gray-300"
                >
                  <option value="perempuan">Perempuan</option>
                  <option value="laki-laki">Laki-Laki</option>
                </select>
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full">
                <Label htmlFor="tgl_lahir" teks="Tgl Lahir" />
                <Input
                  size="sm"
                  color="transparent"
                  type="text"
                  name="tgl_lahir"
                  placeholder="12 Januari 2000"
                />
              </div>
              <div className="w-full ">
                <Label htmlFor="role" teks="Role member" />
                <select
                  id="role"
                  name="role"
                  className="w-full rounded-lg  mt-2 h-[40px] px-2 text-[.9rem] bg-transparent border border-gray-300"
                >
                  <option value="super admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
              </div>
            </div>
            <div className="w-full h-max flex flex-col justify-center gap-3 lg:flex-row borde-r">
              <div className="w-full ">
                <Label htmlFor="status" teks="Status Member" />
                <select
                  id="status"
                  name="status"
                  className="w-full rounded-lg  mt-2 h-[40px] px-2 text-[.9rem] bg-transparent border border-gray-300"
                >
                  <option value="aktif">Aktif</option>
                  <option value="non-aktif">Non-Aktif</option>
                </select>
              </div>
              <div className="w-full flex flex-col">
                <Label htmlFor="alamat" teks="Alamat" />
                <textarea
                  rows={2}
                  cols={30}
                  name="alamat"
                  id="alamat"
                  placeholder="Jl. lorem"
                  className="w-full rounded-lg  mt-2  p-2 text-[.9rem] bg-transparent border border-gray-300"
                ></textarea>
              </div>
            </div>
            <div className="w-full h-max ">
              <button
                className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600"
                type="submit"
              >
                Tambah Member
              </button>
            </div>
          </fetcher.Form>
        </div>
      </section>
    </Container>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useOutletContext } from "@remix-run/react";
import useHandleAlert from "hooks/useHandleAlert";
import useHandleFile from "hooks/useHandleFile";
import useHandleInput from "hooks/useHandleInput";
import { Camera } from "lucide-react";
import { useEffect, useRef } from "react";

import Container from "~/components/layout/container";
import NavLink from "~/components/layout/nav-link";
import Alert from "~/components/ui/alert";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import Loading from "~/components/ui/loading";
import { isAuthUser } from "~/services/auth.server";
import { UserContext } from "~/utils/type";
const dataLink = [
  {
    name: "profile",
    link: "/profile",
  },
  {
    name: "Edit Password",
    link: "/profile/edit-password",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Profile user" },
    { name: "Profile", content: "Welcome to Profile" },
  ];
};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  return json({ user });
};

export default function ProfileIndex() {
  const { user } = useOutletContext<UserContext>();
  const navigate = useNavigate();
  const { urlImg, handleFile } = useHandleFile();
  const fileRef = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher<any>();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { data, onChange } = useHandleInput({
    username: user.username,
    email: user.email,
    wa: user.wa,
    jekel: user.jekel,
    alamat: user.alamat,
    tgl_lahir: user.tgl_lahir,
  });

  const handleInputFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("foto_profil", user.foto_profil);
    formData.append("idMembers", user.id.toString());

    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      action: "/api/update-profile",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", "Profile berhasil diupdate");
        navigate("/api/auth/logout");
      } else {
        handleAlert("error", fetcher.data.message);
      }
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Container>
      <>
        <Loading status={fetcher.state !== "idle"} />
        <Alert
          status={status}
          type={dataAlert?.type}
          message={dataAlert?.message}
        />
      </>
      <section className="mt-1 lg:mt-0">
        <NavLink dataLink={dataLink} />
        <div className="w-full h-max mt-4  flex flex-col items-center p-3  ">
          <div className="w-max h-max relative py-3">
            <img
              src={urlImg || user.foto_profil}
              alt="avatar"
              className=" w-[125px] h-[125px] lg:h-[200px] lg:w-[200px]  shadow-md object-cover rounded-lg border-2 border-gray-400 "
            />
            <button
              className="absolute bottom-0 right-0 p-2 rounded-lg bg-[crimson] shadow-2xl hover:bg-red-500"
              onClick={handleInputFile}
            >
              <Camera size={20} color="white" />
            </button>
          </div>
          <form
            className="w-full h-max  mt-5 flex flex-col gap-3 "
            onSubmit={handleSubmit}
          >
            <>
              <input
                type="file"
                className="hidden"
                ref={fileRef}
                name="img_update"
                onChange={handleFile}
              />
            </>
            <div className="w-full h-max flex flex-col lg:flex-row justify-between gap-3">
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="username" teks="Nama anda" />
                <Input
                  size="lg"
                  color="slate"
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={onChange}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="email" teks="Email anda" />
                <Input
                  size="lg"
                  color="slate"
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col lg:flex-row justify-between gap-3">
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="wa" teks="Wa anda" />
                <Input
                  size="lg"
                  color="slate"
                  type="text"
                  name="wa"
                  value={data.wa}
                  onChange={onChange}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="jekel" teks="Jenis Kelamin" />
                <select
                  id="jekel"
                  name="jekel"
                  value={data.jekel}
                  onChange={onChange}
                  className="w-full h-[55px] rounded-lg  mt-2 px-3 text-[1rem] font-semibold bg-slate-300 border border-gray-300 outline-blue-500"
                >
                  <option value="perempuan">Perempuan</option>
                  <option value="laki-laki">Laki-Laki</option>
                </select>
              </div>
            </div>
            <div className="w-full h-max flex flex-col lg:flex-row justify-between gap-3">
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="tgl_lahir" teks="Tgl Lahir" />
                <Input
                  size="lg"
                  color="slate"
                  type="text"
                  name="tgl_lahir"
                  value={data.tgl_lahir}
                  onChange={onChange}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="alamat" teks="Alamat" />
                <textarea
                  rows={2}
                  cols={30}
                  name="alamat"
                  id="alamat"
                  value={data.alamat}
                  onChange={onChange}
                  className="w-full rounded-lg  mt-2  p-2 text-[1rem] font-semibold bg-slate-300 border border-gray-300 outline-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="w-full ">
              <Button
                type="submit"
                name="button"
                text="Simpan"
                color="green"
                size="px-4 py-1.5 rounded-md"
              />
            </div>
          </form>
        </div>
      </section>
    </Container>
  );
}

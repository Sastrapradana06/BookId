/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutletContext } from "@remix-run/react";
import useHandleFile from "hooks/useHandleFile";
import useHandleInput from "hooks/useHandleInput";
import { useEffect, useRef, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { UserContext } from "~/utils/type";
import Label from "../ui/label";
import Input from "../ui/input";
import Button from "../ui/button";
import { Camera } from "lucide-react";
import useHandleAlert from "hooks/useHandleAlert";
import Loading from "../ui/loading";
import Alert from "../ui/alert";

export default function FormEditProfile() {
  const { user } = useOutletContext<UserContext>();
  const fileRef = useRef<HTMLInputElement>(null);

  const fetcher = useFetcher<any>();
  const navigate = useNavigate();

  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const [isEdit, setIsEdit] = useState(true);

  const { urlImg, handleFile } = useHandleFile();
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

    if (isEdit) {
      setIsEdit(false);
      return;
    }

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
        setTimeout(() => {
          navigate("/api/auth/logout");
        }, 3000);
      } else {
        handleAlert("error", fetcher.data.message);
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
      <div className="w-full h-max mt-4  flex flex-col items-center p-3  ">
        <div className="w-max h-max relative py-3">
          <img
            src={urlImg || user.foto_profil}
            alt="avatar"
            className=" w-[125px] h-[125px] lg:h-[200px] lg:w-[200px]  shadow-md object-cover rounded-lg border-2 border-gray-400 "
          />
          {isEdit ? (
            <button className="absolute bottom-0 right-0 p-2 rounded-lg bg-gray-400 shadow-2xl hover:bg-gray-500 cursor-not-allowed">
              <Camera size={20} color="white" />
            </button>
          ) : (
            <button
              className="absolute bottom-0 right-0 p-2 rounded-lg bg-[crimson] shadow-2xl hover:bg-red-500"
              onClick={handleInputFile}
            >
              <Camera size={20} color="white" />
            </button>
          )}
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
                readOnly={isEdit}
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
                readOnly={isEdit}
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
                readOnly={isEdit}
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
                readOnly={isEdit}
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
                readOnly={isEdit}
                className="w-full rounded-lg  mt-2  p-2 text-[1rem] font-semibold bg-slate-300 border border-gray-300 outline-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="w-full ">
            <Button
              type="submit"
              name="button"
              text={isEdit ? "Edit Profile" : "Simpan Perubahan"}
              color={isEdit ? "red" : "green"}
              size="px-4 py-1.5 rounded-md"
            />
          </div>
        </form>
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetcher } from "@remix-run/react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import Alert from "../ui/alert";
import useHandleAlert from "hooks/useHandleAlert";
import Input from "../ui/input";
import Label from "../ui/label";
import Button from "../ui/button";
import useHandleInput from "hooks/useHandleInput";
import Loading from "../ui/loading";

export default function FormLogin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { status, data, handleAlert, reset } = useHandleAlert();
  const fetcher = useFetcher<any>();

  const { data: dataInput, onChange } = useHandleInput({
    email: "sastra@gmail.com",
    password: "superadmin123",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    fetcher.submit(dataInput, {
      method: "post",
      action: "api/auth/login",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success === false) {
        handleAlert("error", fetcher.data.message);
        console.log("gagal");
        fetcher.data = null;
      }
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <>
      <Alert status={status} type={data?.type} message={data?.message} />
      <Loading status={fetcher.state != "idle"} />
      <form
        method="post"
        onSubmit={handleSubmit}
        className="w-full h-max flex flex-col items-center gap-6  lg:w-[50%]"
      >
        <div className="text-center ">
          <h1 className="text-[1.5rem] font-semibold">Sign In</h1>
          <p className="text-[.8rem] text-gray-400 font-semibold">
            Masuk dengan akun anda
          </p>
        </div>
        <div className="w-full h-max lg:w-[90%]">
          <Label htmlFor="email" teks="Email" />
          <Input
            size="sm"
            color="transparent"
            type="email"
            name="email"
            value={dataInput.email}
            onChange={onChange}
            placeholder="Masukkan email anda"
          />
        </div>
        <div className="w-full h-[110px]  relative lg:w-[90%] ">
          <Label htmlFor="password" teks="Password" />
          <Input
            size="sm"
            color="transparent"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={dataInput.password}
            onChange={onChange}
            placeholder="Masukkan password anda"
          />

          <button
            className="absolute bottom-[2.8rem] right-2"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            type="button"
          >
            {isPasswordVisible ? <EyeOff color="gray" /> : <Eye color="gray" />}
          </button>
        </div>
        <div className="w-full h-max lg:w-[90%] -mt-6">
          <Button
            type="submit"
            name="button"
            text="Masuk"
            color="indigo"
            size="w-full h-[40px] rounded-lg"
          />
        </div>
      </form>
    </>
  );
}

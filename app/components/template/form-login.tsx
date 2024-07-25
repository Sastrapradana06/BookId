/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@remix-run/react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import Alert from "../ui/alert";
import useHandleAlert from "hooks/useHandleAlert";
import Input from "../ui/input";
import Label from "../ui/label";
import Button from "../ui/button";

export default function FormLogin({ actionData }: { actionData: any }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { status, data, handleAlert } = useHandleAlert();
  useEffect(() => {
    if (!actionData) return;

    if (actionData?.success == false) {
      handleAlert("error", actionData?.message);
    }
  }, [actionData]);

  return (
    <>
      <Alert status={status} type={data?.type} message={data?.message} />
      <Form
        method="post"
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
            plaseholder="Masukkan email anda"
          />
          {actionData?.errors?.email ? (
            <p className="text-red-500 ml-1 text-[.8rem]">
              {actionData?.errors.email}
            </p>
          ) : null}
        </div>
        <div className="w-full h-[110px]  relative lg:w-[90%] ">
          <Label htmlFor="password" teks="Password" />
          <Input
            size="sm"
            color="transparent"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            plaseholder="Masukkan password anda"
          />
          {actionData?.errors?.password ? (
            <p className="text-red-500 ml-1 text-[.8rem]">
              {actionData?.errors.password}
            </p>
          ) : null}
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
      </Form>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@remix-run/react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import Alert from "../ui/alert";
import useHandleAlert from "hooks/useHandleAlert";

export default function FormLogin({ actionData }: { actionData: any }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { status, data, handleAlert } = useHandleAlert();

  useEffect(() => {
    if (actionData?.success) {
      handleAlert("success", actionData?.message);
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
          <label htmlFor="email">
            <span className="text-red-500 mr-1">*</span>Email
          </label>
          <input
            className="w-full h-[40px] rounded-lg bg-transparent border border-gray-300 mt-2 px-2 text-[.9rem]"
            type="text"
            name="email"
            placeholder="Masukkan email anda"
          />
          {actionData?.errors?.email ? (
            <p className="text-red-500 ml-1 text-[.8rem]">
              {actionData?.errors.email}
            </p>
          ) : null}
        </div>
        <div className="w-full h-[110px]  relative lg:w-[90%] ">
          <label htmlFor="password">
            <span className="text-red-500 mr-1">*</span>Password
          </label>
          <input
            className="w-full h-[40px] rounded-lg bg-transparent border border-gray-300 mt-2 px-2 text-[.9rem]"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="Masukkan password anda"
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
          <button
            className="w-full h-[40px] rounded-lg bg-indigo-500 text-white"
            type="submit"
            name="button"
          >
            Masuk
          </button>
        </div>
      </Form>
    </>
  );
}

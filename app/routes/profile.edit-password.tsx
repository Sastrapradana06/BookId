/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { useFetcher, useNavigate, useOutletContext } from "@remix-run/react";
import useHandleAlert from "hooks/useHandleAlert";
import useHandleInput from "hooks/useHandleInput";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "~/components/layout/container";
import NavLink from "~/components/layout/nav-link";
import Alert from "~/components/ui/alert";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import Loading from "~/components/ui/loading";
import { gantiPasswordUser } from "~/services/auth.server";
import { UserContext } from "~/utils/type";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit password user" },
    { name: "Profile", content: "Welcome to Profile" },
  ];
};

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const password_lama = formData.get("password_lama") as string;
  const password_baru = formData.get("password_baru") as string;
  const confirm_password = formData.get("confirm_password") as string;

  if (password_baru !== confirm_password) {
    return json(
      { success: false, message: "Confirm Password tidak sama" },
      { status: 400 }
    );
  }

  const result = await gantiPasswordUser({
    id: parseInt(id),
    password_lama,
    password_baru,
  });

  console.log({ result });

  return json({ success: result.success, message: result.message });
};

export default function EditPassword() {
  const fetcher = useFetcher<any>();
  const navigate = useNavigate();
  const { user } = useOutletContext<UserContext>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { data: dataInput, onChange } = useHandleInput({
    password_lama: "",
    password_baru: "",
    confirm_password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("id", user.id.toString());
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        handleAlert("success", "Password Berhasil diubah");
        setTimeout(() => {
          navigate("/api/auth/logout");
        }, 3000);
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
        <div className="w-full m-auto h-max p-2 px-4 bg-slate-100 rounded-lg mt-6 lg:w-[40%]">
          <h1 className="zain text-[1.3rem] text-indigo-600 font-semibold">
            Edit Password
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full m-auto h-max p-3 bg-slate-100 rounded-lg mt-1 lg:w-[40%]"
        >
          <div className="w-full h-[110px]  relative lg:w-[90%] ">
            <Label htmlFor="password_lama" teks="Password lama" />
            <Input
              size="sm"
              color="transparent"
              type={isPasswordVisible ? "text" : "password"}
              name="password_lama"
              value={dataInput.password_lama}
              onChange={onChange}
              placeholder="Masukkan password lama anda"
            />

            <button
              className="absolute bottom-[2.8rem] right-2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              type="button"
            >
              {isPasswordVisible ? (
                <EyeOff color="gray" />
              ) : (
                <Eye color="gray" />
              )}
            </button>
          </div>
          <div className="w-full h-[110px]  relative lg:w-[90%] -mt-6">
            <Label htmlFor="password_baru" teks="Password baru" />
            <Input
              size="sm"
              color="transparent"
              type={isPasswordVisible ? "text" : "password"}
              name="password_baru"
              value={dataInput.password_baru}
              onChange={onChange}
              placeholder="Masukkan password baru anda"
            />

            <button
              className="absolute bottom-[2.8rem] right-2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              type="button"
            >
              {isPasswordVisible ? (
                <EyeOff color="gray" />
              ) : (
                <Eye color="gray" />
              )}
            </button>
          </div>
          <div className="w-full h-[110px]  relative lg:w-[90%] -mt-6">
            <Label htmlFor="confirm_password" teks="Confirm password" />
            <Input
              size="sm"
              color="transparent"
              type={isPasswordVisible ? "text" : "password"}
              name="confirm_password"
              value={dataInput.confirm_password}
              onChange={onChange}
              placeholder="Masukkan konfirmasi password anda"
            />

            <button
              className="absolute bottom-[2.8rem] right-2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              type="button"
            >
              {isPasswordVisible ? (
                <EyeOff color="gray" />
              ) : (
                <Eye color="gray" />
              )}
            </button>
          </div>
          <Button
            name="Edit Password"
            type="submit"
            color="indigo"
            size="w-full py-2.5 rounded-2xl -mt-2"
            text="Simpan Perubahan"
          />
        </form>
      </section>
    </Container>
  );
}

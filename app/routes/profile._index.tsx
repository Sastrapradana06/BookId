import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { Camera } from "lucide-react";

import Container from "~/components/layout/container";
import NavLink from "~/components/layout/nav-link";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import { isAuthUser } from "~/services/auth.server";
import { UserContext } from "~/utils/type";
const dataLink = [
  {
    name: "profile",
    link: "/profile",
  },
  {
    name: "Ganti Password",
    link: "/ganti-password",
  },
];
export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  return json({ user });
};

export default function ProfileIndex() {
  const { user } = useOutletContext<UserContext>();
  return (
    <Container>
      <section className="mt-1 lg:mt-0">
        <NavLink dataLink={dataLink} />
        <div className="w-full h-[200px] mt-4  flex flex-col items-center p-3 ">
          <div className="w-max h-max relative py-3">
            <img
              src={user.foto_profil}
              alt="avatar"
              className=" w-[125px] h-[125px] lg:h-[200px] lg:w-[200px]  shadow-md object-cover rounded-lg border-2 border-gray-400 "
            />
            <button className="absolute bottom-0 right-0 p-2 rounded-lg bg-[crimson] shadow-2xl">
              <Camera size={20} color="white" />
            </button>
          </div>
          <div className="w-full h-max  mt-5 flex flex-col gap-3">
            <div className="w-full h-max flex flex-col lg:flex-row justify-between gap-3">
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="username" teks="Nama anda" />
                <Input
                  size="lg"
                  color="slate"
                  type="text"
                  name="username"
                  value={user.username}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="email" teks="Email anda" />
                <Input
                  size="lg"
                  color="slate"
                  type="text"
                  name="email"
                  value={user.email}
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
                  value={user.wa}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <Label htmlFor="jekel" teks="Jenis Kelamin" />
                <select
                  id="jekel"
                  name="jekel"
                  value={user.jekel}
                  className="w-full h-[55px] rounded-lg  mt-2 px-3 text-[1.1rem] font-semibold bg-slate-300 border border-gray-300"
                >
                  <option value="perempuan">Perempuan</option>
                  <option value="laki-laki">Laki-Laki</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

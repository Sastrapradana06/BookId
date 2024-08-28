/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetaFunction } from "@remix-run/node";
import Logo from "~/components/ui/logo";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import FormLogin from "~/components/template/form-login";
import { getDataDb } from "~/services/supabase/fetch.server";
import useAppStore from "~/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "BookID" },
    { name: "description", content: "Welcome to BookId" },
  ];
};

export const loader: LoaderFunction = async () => {
  const getData = await getDataDb("data perpustakaan");
  if (getData.status === false) return json({ data: null });
  const dataPerpus = getData.data[0];
  return json({ data: dataPerpus });
};

export default function Index() {
  const loader = useLoaderData<any>();
  const [setDataPerpus] = useAppStore(
    useShallow((state: any) => [state.setDataPerpus])
  );

  useEffect(() => {
    if (loader.data) {
      const { cover, nama } = loader.data;
      setDataPerpus({ cover, nama });
    }
  }, [loader.data]);

  return (
    <main className="w-full h-[100vh]   flex flex-col items-center justify-center ">
      <div className="w-max h-[100px]  ">
        <Logo />
      </div>
      <div className="w-[90%] h-max  flex lg:justify-center lg:items-center bg-slate-100 py-6 px-2 rounded-xl lg:w-[80%] -mt-6">
        <div className="w-max h-max hidden lg:inline-block ">
          <img
            src="/icons-login1.png"
            alt="icons-login "
            className="w-[400px]  object-contain"
          />
        </div>
        <FormLogin />
      </div>
    </main>
  );
}

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import CardNotif from "~/components/layout/card-notif";
import Container from "~/components/layout/container";
import { isAuthUser } from "~/services/auth.server";
import { deleteDataById } from "~/services/supabase/delete.server";
import { getDataDb } from "~/services/supabase/fetch.server";
import useAppStore from "~/store";
import { MembersDB, NotifDB } from "~/utils/type";

type LoaderDataType = {
  status: boolean;
  user?: MembersDB[];
  dataNotif?: NotifDB[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "Notifikasi" },
    { name: "Notifikasi", content: "Welcome to Notifikasi" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("idNotif") as string;
  const deleteNotif = await deleteDataById("data notif", parseInt(id));
  return json({ success: deleteNotif.status });
};

export const loader: LoaderFunction = async ({ request }) => {
  const user: any = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  const getDataNotif = await getDataDb("data notif");
  if (getDataNotif.status === false) {
    return json({ status: false, dataNotif: [] });
  }

  let dataNotif = getDataNotif.data;
  if (user.role == "super admin" || user.role == "admin") {
    return json({ status: true, dataNotif });
  }

  dataNotif = dataNotif.filter((item: any) => item.id_member == user.id);

  return json({ status: true, dataNotif });
};

export default function Notifikasi() {
  const { dataNotif } = useLoaderData<LoaderDataType>();

  const [setNotifCount] = useAppStore(
    useShallow((state: any) => [state.setNotifCount])
  );

  useEffect(() => {
    if (dataNotif?.length === 0) {
      setNotifCount(0);
    }
  }, [dataNotif]);

  return (
    <Container>
      <h1 className="zain text-[1.3rem] lg:text-[1.5rem] uppercase font-semibold tracking-[1px]">
        Notifikasi
      </h1>
      <div className="w-full min-h-max max-h-[600px] overflow-auto mt-3  rounded-md bg-slate-100 px-2 py-4 flex flex-col gap-4">
        {dataNotif?.length === 0 && (
          <p className="text-center">Tidak ada notifikasi</p>
        )}
        {dataNotif?.map((data, i) => (
          <CardNotif
            key={i}
            id={data.id}
            status={data.status}
            created_at={data.created_at}
            judul_buku={data.judul_buku}
            nama_peminjam={data.nama_peminjam}
          />
        ))}
      </div>
    </Container>
  );
}

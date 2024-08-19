import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/layout/container";
import NavLink from "~/components/layout/nav-link";
import SearchInput from "~/components/layout/search-input";
import { isAuthUser } from "~/services/auth.server";
import { getDataDb } from "~/services/supabase/fetch.server";
import { PinjamanType } from "~/utils/type";

type LoaderDataPinjaman = {
  status: boolean;
  data?: PinjamanType[];
};

const dataLink = [
  {
    name: "pinjaman",
    link: "/pinjaman",
  },
  {
    name: "buat pinjaman",
    link: "/pinjaman/add",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Pinjaman" },
    { name: "Data Pinjaman", content: "Welcome to Data Pinjaman" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  const getData = await getDataDb("data pinjaman");
  if (getData.status === false) {
    return json({ success: false, message: "data pinjaman tidak ditemukan" });
  }

  return json({ success: true, data: getData.data });
};

export default function PinjamanIdex() {
  const { data } = useLoaderData<LoaderDataPinjaman>();
  console.log({ data });

  return (
    <Container>
      <section className="mt-1 lg:mt-0">
        <NavLink dataLink={dataLink} />
        <div className="w-full h-max mt-4 flex gap-4  flex-wrap lg:justify-between lg:items-center">
          <SearchInput link="/pinjaman?q" placeholder="Cari buku terpinjam" />
        </div>
      </section>
    </Container>
  );
}

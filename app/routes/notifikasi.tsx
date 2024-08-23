import { MetaFunction } from "@remix-run/node";
import CardNotif from "~/components/layout/card-notif";
import Container from "~/components/layout/container";

export const meta: MetaFunction = () => {
  return [
    { title: "Notifikasi" },
    { name: "Notifikasi", content: "Welcome to Notifikasi" },
  ];
};

export default function Notifikasi() {
  const dataNotif = [
    {
      status: "ketersediaan",
      judul_buku: "Atomic Habits",
      date: "22 Ags 2022",
    },
    {
      status: "keterlambatan",
      judul_buku: "Laskar Pelangi",
      date: "20 Ags 2022",
      nama_peminjam: "Zainal Abidin",
    },
  ];

  return (
    <Container>
      <h1 className="zain text-[1.3rem] lg:text-[1.5rem] uppercase font-semibold tracking-[1px]">
        Notifikasi
      </h1>
      <div className="w-full min-h-max max-h-[600px] overflow-auto mt-3  rounded-md bg-slate-100 px-2 py-4 flex flex-col gap-4">
        {dataNotif.map((data, i) => (
          <CardNotif {...data} key={i} />
        ))}
      </div>
    </Container>
  );
}

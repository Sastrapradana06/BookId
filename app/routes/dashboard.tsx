/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { BookOpenText, BookUp, Layers3, Users } from "lucide-react";
import CardNew from "~/components/layout/card- new";
import CardInfo from "~/components/layout/card-info";
import CardPopular from "~/components/layout/card-popular";
import Container from "~/components/layout/container";
import { UserContext } from "~/utils/type";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { isAuthUser } from "~/services/auth.server";
import { getDataDb } from "~/services/supabase/fetch.server";
import { formatDate } from "~/utils/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  const dataBuku = await getDataDb("data buku");
  const dataPinjamanBuku = await getDataDb("data pinjaman");
  const dataMember = await getDataDb("data members");

  const totalPinjaman = dataPinjamanBuku.data.filter((item: any) => {
    return item.status == "terpinjam" || item.status == "terlambat";
  });

  const popularBooks = dataBuku.data
    .sort((a, b) => b.terpinjam - a.terpinjam)
    .slice(0, 3)
    .filter((item) => item.terpinjam != 0);

  const latestBooks = dataBuku.data.sort((a, b) => b.id - a.id).slice(0, 3);

  return json({
    user,
    totalBuku: dataBuku.data.length,
    totalPinjaman: totalPinjaman.length,
    totalMember: dataMember.data.length,
    popularBooks,
    latestBooks,
  });
};

export default function Dashboard() {
  const { user } = useOutletContext<UserContext>();
  const { totalBuku, totalPinjaman, totalMember, popularBooks, latestBooks } =
    useLoaderData<any>();

  return (
    <Container>
      <main className="">
        <div className="w-full h-[200px] bg-indigo-200 rounded-lg flex justify-center items-center p-2 gap-2">
          <div className="w-[50%] h-max ">
            <h1 className="text-[1.5rem] font-semibold zain lg:text-[2rem] capitalize">
              Hi, {user.username}
            </h1>
            <p className="text-[1rem] text-gray-500 zain font-semibold lg:text-[1.2rem]">
              &rdquo;Semoga kamu selalu semangat dalam menjalani hidupmu&rdquo;
            </p>
          </div>
          <div className="h-max w-max">
            <img
              src="/icons-login4.svg"
              alt="icons"
              className="w-[150px] h-[200px] object-contain lg:w-[300px] lg:h-[300px]"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-500 text-[.9rem] font-semibold ">Overview</p>
          <div className="w-full flex flex-wrap gap-3 items-center  mt-3  justify-between lg:gap-0">
            <CardInfo
              icons={<BookOpenText color="white" />}
              total={totalBuku}
              text="Jumlah buku"
              bgColor="bg-green-500"
            />
            <CardInfo
              icons={<Layers3 color="white" />}
              total={5}
              text="Jenis buku"
              bgColor="bg-amber-400"
            />
            <CardInfo
              icons={<BookUp color="white" />}
              total={totalPinjaman}
              text="Buku Dipinjam"
              bgColor="bg-pink-600"
            />
            <CardInfo
              icons={<Users color="white" />}
              total={totalMember}
              text="Anggota"
              bgColor="bg-sky-600"
            />
          </div>
        </div>
        <div className="mt-6 ">
          <p className="text-gray-500 text-[.9rem] font-semibold capitalize ">
            latest books
          </p>
          <div className="w-full h-max  overflow-x-scroll flex gap-4">
            <div className="min-w-max flex gap-4">
              {latestBooks.map((book: any) => (
                <CardNew
                  key={book.id}
                  cover={book.cover}
                  title={book.judul_buku}
                  author={book.penulis}
                  date={formatDate(book.created_at)}
                  halaman={book.pages}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 ">
          <p className="text-gray-500 text-[.9rem] font-semibold capitalize ">
            most popular books
          </p>
          <div className="w-full h-max  overflow-x-scroll flex gap-4">
            <div className="min-w-max flex gap-4 lg:gap-6">
              {popularBooks.map((book: any) => (
                <CardPopular
                  key={book.id}
                  cover={book.cover}
                  terpinjam={book.terpinjam}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

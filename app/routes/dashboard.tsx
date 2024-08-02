import { useOutletContext } from "@remix-run/react";
import { BookOpenText, BookUp, Layers3, Users } from "lucide-react";
import CardNew from "~/components/layout/card- new";
import CardInfo from "~/components/layout/card-info";
import CardPopular from "~/components/layout/card-popular";
import Container from "~/components/layout/container";
import { UserContext } from "~/utils/type";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { isAuthUser } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  return json({ user });
};

export default function Dashboard() {
  const { user } = useOutletContext<UserContext>();

  const latestBooks = [
    {
      id: 1,
      cover: "/Laskar Pelangi.jpeg",
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      release: "23 agustus 2020",
      page: 12,
    },
    {
      id: 2,
      cover: "/Read of the Day!.jpeg",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      release: "2 Maret 2007",
      page: 10,
    },
    {
      id: 3,
      cover: "/Negeri 5 Menara.jpeg",
      title: "Negeri 5 Menara",
      author: "Ahmad Fuadi",
      release: "10 Januari 2022",
      page: 23,
    },
  ];

  const popularBooks = [
    {
      id: 1,
      cover: "/Atomic Habits.jpeg",
      title: "Atomic Habits",
      author: "Andrea Hirata",
      release: "5 april 2018",
      page: 123,
      dipinjam: 150,
    },
    {
      id: 2,
      cover: "/Ayat-Ayat Cinta.jpeg",
      title: "Ayat-Ayat Cinta",
      author: "Habiburrahman El Shirazy",
      release: "2004",
      page: 95,
      dipinjam: 125,
    },
    {
      id: 3,
      cover: "/Sang Pemimpi.jpeg",
      title: "Sang Pemimpi",
      author: "Andrea Hirata",
      release: "2006",
      page: 76,
      dipinjam: 97,
    },
    {
      id: 4,
      cover: "/To Kill a Mockingbird.jpeg",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      release: "1960",
      page: 51,
      dipinjam: 73,
    },
  ];

  return (
    <Container>
      <main className="">
        <div className="w-full h-[200px] bg-indigo-200 rounded-lg flex justify-center items-center p-2 gap-2">
          <div className="w-[50%] h-max ">
            <h1 className="text-[1.5rem] font-semibold zain lg:text-[2rem]">
              Hi, {user.name}
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
              total={150}
              text="Jumlah buku"
              bgColor="bg-green-500"
            />
            <CardInfo
              icons={<Layers3 color="white" />}
              total={60}
              text="Jenis buku"
              bgColor="bg-amber-400"
            />
            <CardInfo
              icons={<BookUp color="white" />}
              total={92}
              text="Buku Dipinjam"
              bgColor="bg-pink-600"
            />
            <CardInfo
              icons={<Users color="white" />}
              total={6}
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
              {latestBooks.map((book) => (
                <CardNew
                  key={book.id}
                  cover={book.cover}
                  title={book.title}
                  author={book.author}
                  date={book.release}
                  halaman={book.page}
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
              {popularBooks.map((book) => (
                <CardPopular
                  key={book.id}
                  cover={book.cover}
                  terpinjam={book.dipinjam}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

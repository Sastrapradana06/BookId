import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BookOpenText, BookUp, Layers3, Users } from "lucide-react";
import CardNew from "~/components/layout/card- new";
import CardInfo from "~/components/layout/card-info";
import Container from "~/components/layout/container";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return user;
};

export default function Dashboard() {
  const user: { id: string; name: string; role: string } = useLoaderData();

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
          <p className="text-gray-500 text-[.9rem] font-semibold capitalize">
            latest books
          </p>
          <div className="w-full h-max  overflow-x-scroll flex gap-4">
            <div className="min-w-max flex gap-4">
              <CardNew
                cover="/Laskar Pelangi.jpeg"
                title="Laskar Pelangi"
                author="Andrea Hirata"
                date="23 agustus 2020"
                halaman={12}
              />
              <CardNew
                cover="/Read of the Day!.jpeg"
                title="Read of the Day!"
                author="OverDrive"
                date="2 Maret 2007"
                halaman={10}
              />
              <CardNew
                cover="/Negeri 5 Menara.jpeg"
                title="Negeri 5 Menara"
                author="Ahmad Fuadi"
                date="10 Januari 2022"
                halaman={23}
              />
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

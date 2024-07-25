import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BookOpenText, BookUp, Layers3, Users } from "lucide-react";
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
          <p className="text-gray-500 text-[.9rem]">Overview</p>
          <div className="w-full flex flex-wrap gap-3 items-center  mt-3  justify-between lg:gap-0">
            <div className="w-[48%] h-[100px] bg-green-500 rounded-lg lg:w-[23%] flex items-center justify-center gap-3 lg:h-[80px] shadow-md">
              <div className="p-2 rounded-xl bg-[#ffffff38]">
                <Layers3 color="white" />
              </div>
              <div className="text-white">
                <h1 className="text-white lg:text-[1.1rem]">202</h1>
                <p className="text-white text-[.7rem] lg:text-[.8rem]">
                  Jumlah Buku
                </p>
              </div>
            </div>
            <div className="w-[48%] h-[100px] bg-amber-400 rounded-lg lg:w-[23%] flex items-center justify-center gap-3 lg:h-[80px] shadow-md">
              <div className="p-2 rounded-xl bg-[#ffffff38]">
                <BookOpenText color="white" />
              </div>
              <div className="text-white">
                <h1 className="text-white lg:text-[1.1rem]">120</h1>
                <p className="text-white text-[.7rem] lg:text-[.8rem]">
                  Jenis buku
                </p>
              </div>
            </div>
            <div className="w-[48%] h-[100px] bg-pink-600 rounded-lg lg:w-[23%] flex items-center justify-center gap-3 lg:h-[80px] shadow-md">
              <div className="p-2 rounded-xl bg-[#ffffff38]">
                <BookUp color="white" />
              </div>
              <div className="text-white">
                <h1 className="text-white lg:text-[1.1rem]">48</h1>
                <p className="text-white text-[.7rem] lg:text-[.8rem]">
                  Terpinjam
                </p>
              </div>
            </div>
            <div className="w-[48%] h-[100px] bg-sky-600 rounded-lg lg:w-[23%] flex items-center justify-center gap-3 lg:h-[80px] shadow-md">
              <div className="p-2 rounded-xl bg-[#ffffff38]">
                <Users color="white" />
              </div>
              <div className="text-white">
                <h1 className="text-white lg:text-[1.1rem]">5</h1>
                <p className="text-white text-[.7rem] lg:text-[.8rem]">
                  Anggota
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

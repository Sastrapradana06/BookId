/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, MetaFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import Container from "~/components/layout/container";
import StarRating from "~/components/ui/star-rating";
import { getBooksId } from "~/services/supabase/fetch.server";
import { BookDB } from "~/utils/type";

type LoaderData = {
  status: boolean;
  data?: BookDB[];
  error?: {
    code: string;
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Detail Books" },
    { name: "Detail Books", content: "Welcome to detail books" },
  ];
};

export const loader = async ({ params }: { params: any }) => {
  const { id } = params;
  if (!id) {
    return redirect("/books");
  }
  const result = await getBooksId(id);
  console.log({ result });

  if (result.status === false) {
    return json({ success: false, error: result.error });
  }
  return json({ success: true, data: result.data });
};

export default function DetailBooks() {
  const { data } = useLoaderData<LoaderData>();
  if (!data) return null;
  const detailBook = data[0];
  console.log({ detailBook });

  return (
    <Container>
      <div className="w-full h-max ">
        <Link to="/books" className="flex items-center gap-1">
          <ChevronLeft size={23} color="black" />
          <p className="font-semibold text-gray-600">Kembali</p>
        </Link>
        <div className="w-full h-max flex flex-col items-center gap-5 mt-5 lg:flex-row lg:h-[77vh]  lg:gap-0 lg:mt-2">
          <div className="w-full  flex flex-col gap-1 items-center lg:w-[40%]">
            <img
              src={detailBook.cover}
              alt="cover"
              className="w-[60%] h-[300px] rounded-lg object-cover lg:w-[80%] lg:h-full shadow-xl"
            />
          </div>
          <div className="w-full  lg:w-[50%] lg:h-[400px] ">
            <div className="w-max h-max m-auto  lg:m-0 ">
              {/* <div className=" flex items-center gap-1 justify-center">
                {detailBook.genre.split(",").map((genre) => (
                  <p
                    className="text-red-500 font-semibold zain text-[1rem] lg:text-[1.1rem] capitalize"
                    key={genre}
                  >
                    {genre} .
                  </p>
                ))}
              </div> */}
              <h1 className="text-[1.3rem] font-semibold -mt-2 tracking-[1px] lg:text-[1.5rem] capitalize">
                {detailBook.judul_buku}
              </h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 items-center">
              <StarRating rate={2} />

              <p className="font-semibold text-center text-green-500 lg:text-start">
                123
              </p>
            </div>

            <div className="w-full p-2 rounded-lg ring-2 ring-indigo-500  m-auto h-full mt-2 lg:w-full lg:h-max">
              <table className="w-full h-max text-left">
                <tbody>
                  <tr className="border-b">
                    <th className="font-semibold tracking-[.1rem] lg:text-[1.1rem] p-1">
                      Penulis
                    </th>
                    <td className="text-gray-400 font-semibold p-1 capitalize">
                      : {detailBook.penulis}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="font-semibold tracking-[.1rem] lg:text-[1.1rem] p-1">
                      Genre
                    </th>
                    <td className="text-gray-400 font-semibold p-1 capitalize">
                      : {detailBook.genre}
                    </td>
                  </tr>
                  <tr>
                    <th className="font-semibold tracking-[.1rem] lg:text-[1.1rem] p-1">
                      Tahun
                    </th>
                    <td className="text-gray-400 font-semibold p-1 capitalize">
                      : {detailBook.tahun_terbit}
                    </td>
                  </tr>
                  <tr>
                    <th className="font-semibold tracking-[.1rem] lg:text-[1.1rem] p-1">
                      Bahasa
                    </th>
                    <td className="text-gray-400 font-semibold p-1 capitalize">
                      : {detailBook.bahasa}
                    </td>
                  </tr>
                  <tr>
                    <th className="font-semibold tracking-[.1rem] lg:text-[1.1rem] p-1">
                      Pages
                    </th>
                    <td className="text-gray-400 font-semibold p-1 capitalize">
                      : {detailBook.pages}
                    </td>
                  </tr>
                  <tr>
                    <th className="font-semibold tracking-[.1rem] lg:text-[1.1rem] p-1">
                      Stok
                    </th>
                    <td className="text-gray-400 font-semibold p-1 capitalize">
                      : {detailBook.stok}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full h-max flex items-center gap-4 mt-4">
              <button className="w-[100px] py-2 rounded-md bg-indigo-400 text-white hover:bg-indigo-500">
                Edit
              </button>
              <button className="w-[100px] py-2 rounded-md bg-red-400 text-white hover:bg-red-500">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

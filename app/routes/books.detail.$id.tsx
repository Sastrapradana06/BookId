/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, MetaFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import Container from "~/components/layout/container";
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
        <div className="w-full h-max flex flex-col items-center mt-5 lg:flex-row lg:h-[77vh] border border-blue-500">
          <div className="w-full  flex flex-col gap-1 items-center lg:w-[40%]">
            <img
              src={detailBook.cover}
              alt="cover"
              className="w-[60%] h-[300px] rounded-lg object-cover lg:w-[80%] lg:h-[400px]"
            />
            <div className="w-full h-max flex items-center gap-1 justify-center">
              {detailBook.genre.split(",").map((genre) => (
                <p
                  className="text-red-500 font-semibold zain text-[1rem] lg:text-[1.1rem] capitalize"
                  key={genre}
                >
                  {genre} .
                </p>
              ))}
            </div>
            <h1 className="text-[1.3rem] font-semibold -mt-2 tracking-[1px] lg:text-[1.4rem] capitalize">
              {detailBook.judul_buku}
            </h1>
          </div>
        </div>
      </div>
    </Container>
  );
}

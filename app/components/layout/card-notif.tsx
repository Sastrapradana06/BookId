import { Clock, X } from "lucide-react";

const CardNotif = ({
  status,
  judul_buku,
  date,
  nama_peminjam,
}: {
  status: string;
  judul_buku: string;
  date: string;
  nama_peminjam?: string;
}) => {
  return (
    <div className="w-full h-max flex gap-2 lg:gap-8 border-b-2 border-gray-300 pb-3">
      <button className=" w-max h-max p-1 rounded-md bg-gray-400">
        <X size={20} color="white" />
      </button>
      <div className="w-full h-max flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="w-full lg:w-[75%] ">
          {status == "ketersediaan" ? (
            <p className="p-1 text-white text-[.7rem] bg-red-500 w-max rounded-md font-semibold">
              Stok Buku Habis
            </p>
          ) : (
            <p className="p-1 text-white text-[.7rem] bg-yellow-500 w-max rounded-md font-semibold">
              Pengembalian Buku Terlambat
            </p>
          )}
          <p className="font-semibold text-[.9rem] mt-1 lg:text-[1rem]">
            Judul Buku: &rdquo;{judul_buku}&rdquo;
          </p>
          {status == "ketersediaan" ? (
            <p className="text-gray-500 text-[.8rem] mt-1 lg:text-[.9rem]">
              Ketersediaan buku{" "}
              <span className="font-semibold text-gray-600">
                &quot;{judul_buku}&quot;
              </span>{" "}
              telah habis. Silakan lakukan pemesanan ulang atau hapus buku dari
              daftar peminjaman.
            </p>
          ) : (
            <p className="text-gray-500 text-[.8rem] mt-1 lg:text-[.9rem]">
              Peminjam dengan nama{" "}
              <span className="font-semibold text-gray-600">
                {nama_peminjam}
              </span>{" "}
              terlambat dalam mengembalian buku{" "}
              <span className="font-semibold text-gray-600">
                &quot;{judul_buku}&quot; .
              </span>
              Silakan hubungi peminjam untuk segera mengembalikan buku.
            </p>
          )}
        </div>
        <div className="w-max h-max   flex items-center gap-1">
          <Clock size={15} color="gray" className="mt-[.1rem]" />
          <p className="text-gray-500 text-[.8rem] mt-1 lg:text-[.9rem] ">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardNotif;

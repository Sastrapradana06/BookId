import Navbar from "./navbar";

/* eslint-disable react/prop-types */
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-max max-h-max">
      <Navbar />
      <div className="w-full h-max mt-[70px] lg:mt-[80px] justify-center p-2 pb-10 lg:p-1 flex lg:justify-between flex-row-reverse ">
        <div className="w-full h-max lg:w-[80%] lg:p-3">{children}</div>
      </div>
    </main>
  );
}

import Navbar from "../ui/navbar";

/* eslint-disable react/prop-types */
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-[100vh] max-h-max">
      <Navbar />
      <div className="w-full h-[200px] mt-[70px] lg:mt-[80px] p-2  lg:pl-[22%] lg:pr-[5%]">
        {children}
      </div>
    </main>
  );
}

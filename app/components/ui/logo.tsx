/* eslint-disable @typescript-eslint/no-explicit-any */

import { useShallow } from "zustand/react/shallow";
import useAppStore from "~/store";

export default function Logo() {
  const [dataPerpus] = useAppStore(
    useShallow((state: any) => [state.dataPerpus])
  );
  return (
    <div className="w-max h-[70px]  lg:h-[80px] flex items-center justify-center gap-2 ">
      {dataPerpus.cover && (
        <img src={dataPerpus.cover} alt="icons" className="w-[50px]" />
      )}
      {dataPerpus.nama && (
        <p className="text-[1.3rem] font-semibold capitalize">
          {dataPerpus.nama}
        </p>
      )}
    </div>
  );
}

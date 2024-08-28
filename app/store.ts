/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const useAppStore = create((set) => ({
  notifCount: 0,
  setNotifCount: (notifCount: number) => set({ notifCount }),
  dataPerpus: { cover: "", nama: "" },
  setDataPerpus: (newDataPerpus: any) => set({ dataPerpus: newDataPerpus }),
}));

export default useAppStore;

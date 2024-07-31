import { Loader } from "lucide-react";

export default function Loading({ status }: { status: boolean }) {
  if (!status) return null;
  return (
    <div className="w-full h-[100vh] fixed top-0 left-0 bg-[black] opacity-50 flex justify-center items-center z-50">
      <Loader size={30} color="white" className="animate-spin " />
    </div>
  );
}

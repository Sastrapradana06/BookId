import { Trash2, X } from "lucide-react";

const ModalDelete = ({
  type,
  isModalOpen,
  setIsModalOpen,
  funcDelete,
}: {
  type: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  funcDelete: () => void;
}) => {
  return (
    isModalOpen && (
      <div className="modal">
        <div className="w-[90%] h-max pb-5 bg-slate-50 rounded-sm lg:w-[40%]">
          <div className="w-full h-max p-2 flex justify-between items-center border-b border-gray-500 px-3">
            <div className="flex items-center gap-1">
              <p className="font-semibold uppercase">Confirm</p>
            </div>
            <button
              name="button"
              title="Close"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={25} color="black" />
            </button>
          </div>
          <div className="w-[90%] mt-1 m-auto h-max flex justify-center items-center flex-col gap-2">
            <button className="p-2 rounded-full bg-red-200">
              <Trash2 size={23} color="crimson" />
            </button>
            <p className="text-center text-[1.1rem] lg:text-[1.3rem] zain">
              Apakah anda yakin ingin {type} ini?
            </p>
            <div className="w-[90%] h-max  flex items-center justify-center gap-4">
              <button
                className="w-[120px] py-2  border border-black"
                onClick={() => setIsModalOpen(false)}
              >
                Tidak
              </button>
              <button
                className="w-[120px] py-2  bg-red-500 text-white border border-red-400 hover:bg-red-600"
                onClick={funcDelete}
              >
                Yakin
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalDelete;

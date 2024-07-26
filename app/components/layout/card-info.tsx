const CardInfo = ({
  icons,
  total,
  text,
  bgColor,
}: {
  icons: React.ReactNode;
  total: number | string;
  text: string;
  bgColor?: string;
}) => {
  return (
    <div
      className={`w-[48%] h-[100px] ${bgColor} rounded-lg lg:w-[23%] flex items-center justify-center gap-3 lg:h-[80px] shadow-md lg:gap-5`}
    >
      <div className="p-2 rounded-xl bg-[#ffffff38]">{icons}</div>
      <div className="text-white">
        <h1 className="text-white text-[1.1rem] lg:text-[1.2rem] font-semibold">
          {total}
        </h1>
        <p className="text-white text-[.7rem] lg:text-[.8rem] capitalize">
          {text}
        </p>
      </div>
    </div>
  );
};

export default CardInfo;

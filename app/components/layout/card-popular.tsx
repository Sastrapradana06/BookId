const CardPopular = ({
  cover,
  terpinjam,
}: {
  cover: string;
  terpinjam: string | number;
}) => {
  return (
    <div className="w-[150px] h-max overflow-hidden rounded-lg mt-3 relative">
      <img src={cover} alt="cover" className="w-full h-[200px] object-cover" />
      <div className="w-[35px] h-[35px]  bg-orange-400 shadow-md backdrop-blur-lg flex justify-center items-center rounded-full absolute top-1 right-1">
        <p className="text-[.8rem] font-semibold text-white">{terpinjam}</p>
      </div>
    </div>
  );
};

export default CardPopular;

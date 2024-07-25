const Label = ({ htmlFor, teks }: { htmlFor: string; teks: string }) => {
  return (
    <label htmlFor={htmlFor}>
      <span className="text-red-500 mr-1">*</span>
      {teks}
    </label>
  );
};

export default Label;

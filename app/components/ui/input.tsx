interface InputProps {
  size: "sm" | "md" | "lg" | "xl";
  color: "transparent" | "white" | "slate";
  type: "text" | "password" | "email";
  name: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
}

export default function Input({
  size,
  color,
  type,
  name,
  value,
  onChange,
  readOnly,
  placeholder,
}: InputProps) {
  return (
    <input
      className={`w-full rounded-lg  mt-2 outline-blue-500 ${sizeInput[size]} ${colorInput[color]}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      required
    />
  );
}

const sizeInput = {
  sm: "h-[40px] px-2 text-[.9rem]",
  md: "h-[50px] px-3 text-[1rem]",
  lg: "h-[55px] px-3 text-[1rem] font-semibold",
  xl: "h-[70px] px-3 text-[1.2rem]",
};

const colorInput = {
  transparent: "bg-transparent border border-gray-300",
  white: "bg-white border border-gray-300",
  slate: "bg-slate-300 border border-gray-300",
};

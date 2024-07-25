interface InputProps {
  size: "sm" | "md" | "lg" | "xl";
  color: "transparent" | "white";
  type: "text" | "password" | "email";
  name: string;
  plaseholder?: string;
}

export default function Input({
  size,
  color,
  type,
  name,
  plaseholder,
}: InputProps) {
  return (
    <input
      className={`w-full rounded-lg  mt-2 ${sizeInput[size]} ${colorInput[color]}`}
      type={type}
      name={name}
      placeholder={plaseholder}
      required
    />
  );
}

const sizeInput = {
  sm: "h-[40px] px-2 text-[.9rem]",
  md: "h-[50px] px-3 text-[1rem]",
  lg: "h-[60px] px-4 text-[1.1rem]",
  xl: "h-[70px] px-5 text-[1.2rem]",
};

const colorInput = {
  transparent: "bg-transparent border border-gray-300",
  white: "bg-white border border-gray-300",
};

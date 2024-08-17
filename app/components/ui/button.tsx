interface ButtonProps {
  type: "submit" | "button";
  name: string;
  text: string;
  color: "indigo" | "green" | "red";
  size: string;
  onClick?: () => void;
}

const Button = ({ type, name, text, color, size, onClick }: ButtonProps) => {
  return (
    <button
      className={`${btnColor[color]} ${size}`}
      type={type}
      name={name}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const btnColor = {
  indigo: "bg-indigo-600 text-white hover:bg-indigo-700",
  green: "bg-green-600 text-white hover:bg-green-700",
  red: "bg-red-600 text-white hover:bg-red-700",
};

export default Button;

interface ButtonProps {
  type: "submit" | "button";
  name: string;
  text: string;
  color: "indigo" | "green";
  size: string;
}

const Button = ({ type, name, text, color, size }: ButtonProps) => {
  return (
    <button className={`${btnColor[color]} ${size}`} type={type} name={name}>
      {text}
    </button>
  );
};

const btnColor = {
  indigo: "bg-indigo-600 text-white hover:bg-indigo-700",
  green: "bg-green-600 text-white hover:bg-green-700",
};

export default Button;

import { useState } from "react";

export default function () {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({
    type: "",
    message: "",
  });

  const handleAlert = (type: string, message: string) => {
    setStatus(true);
    setData({ type, message });

    setTimeout(() => {
      setStatus(false);
    }, 2000);
  };

  const reset = () => {
    setStatus(false);
    setData({
      type: "",
      message: "",
    });
  };

  return { status, data, handleAlert, reset };
}

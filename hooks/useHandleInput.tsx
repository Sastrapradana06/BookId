/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function useHandleInput(initialValue: any) {
  const [data, setData] = useState(initialValue);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const reset = () => {
    setData(initialValue);
  };

  const editData = (data: any) => {
    setData(data);
  };

  return { data, onChange, reset, editData };
}

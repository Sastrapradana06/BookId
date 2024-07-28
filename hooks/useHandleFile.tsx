import { useState } from "react";

export default function useHandleFile() {
  const [file, setFile] = useState<File | null>(null);
  const [urlImg, setUrlImg] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setUrlImg(url);
    }
  };

  return { file, urlImg, handleFile };
}

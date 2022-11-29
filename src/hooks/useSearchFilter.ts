import { useEffect, useState } from "react";

export const useSearchFilter = (data: any[], keyword: string) => {
  const [result, setResult] = useState<any[]>([]);
  useEffect(() => {
    const filtered = data.filter((name: any) => {
    //   console.log("hiiii my name", name.name);
      if (keyword === "") {
        return Object.values(name)
          .join(" ")
          .toLowerCase()
          .includes(keyword.toLowerCase());
      } else {
        return name.name.toLowerCase().includes(keyword.toLowerCase());
      }
    });
    setResult(filtered);
  }, [data, keyword]);

  return result;
};

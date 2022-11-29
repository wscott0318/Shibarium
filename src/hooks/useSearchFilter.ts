import { useEffect, useState } from "react";
import * as Sentry from '@sentry/nextjs';


export const useSearchFilter = (data: any[], keyword: string) => {
  const [result, setResult] = useState<any[]>([]);
  useEffect(() => {
    try {
      const filtered = data.filter((name: any) => {
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
    } catch (err : any) {
      Sentry.captureMessage("useSearchFilter" , err);
    } 
  }, [data, keyword]);

  return result;
};

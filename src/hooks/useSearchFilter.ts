import { useEffect, useState } from "react";

export const useSearchFilter = (data: any[], keyword:string)=>{

    const [result, setResult] = useState<any[]>([]);
    useEffect(() => {
        const filtered = data.filter((name: any) => {
            // console.log("hiiiiurfn nkhf",name.name);
            
            return Object.values(name)
                  .join(" ")
                  .toLowerCase()
                  .includes(keyword.toLowerCase());
            });
        setResult(filtered);
    }, [data,keyword])

    return result;
}
import { useEffect, useState } from "react";

export const useSearchFilter = (data: any[], keyword:string)=>{

    const [result, setResult] = useState<any[]>([]);
    useEffect(() => {
        const filtered = data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.startsWith(keyword)));
        setResult(filtered);
    }, [data,keyword])

    return result;
}
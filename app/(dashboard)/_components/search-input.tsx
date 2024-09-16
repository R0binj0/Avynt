"use client"

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue ] = useState("");
    const deboundedValue = useDebounce(value, 500)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const url = qs.stringifyUrl({
            url : "/",
            query : {
                search: deboundedValue
            },
        }, {skipEmptyString: true, skipNull:true})
        router.push(url)
    }, [deboundedValue, router])

    return ( 
        <div className="w-full relative">
            <Search className="absolute top-1/2  left-3 transform -translate-y-1/2 text-[var(--text)] h-4 w-4"></Search>
            <Input onChange={handleChange} value={value} className="w-full max-w-[516px] pl-9 hover:border-[2px] focus:border-[2px] bg-white/20 opacity-60 hover:opacity-100 focus:opacity-100" placeholder="Search board"></Input>
        </div>
     );
}
 
export default SearchInput;
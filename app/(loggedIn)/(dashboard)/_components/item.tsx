"use client"

import Image from "next/image"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import Hint from "@/components/hint"

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

const Item = ({
    id,
    name,
    imageUrl
}:ItemProps) => {

    const { organization } = useOrganization()
    const { setActive } = useOrganizationList()

    const isActive = organization?.id === id

    const onClick = () => {
        if (!setActive) return;
        
        setActive({ organization: id })
    }

    return ( 
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={18}>
                <Image src={imageUrl} alt={name} fill onClick={onClick} className={cn("rounded-md cursor-pointer opacity-35 hover:opacity-100 transition border-[var(--foreground] border-[2px] border-solid", isActive && "opacity-100")}></Image>
            </Hint>
        </div>
     );
}
 
export default Item;
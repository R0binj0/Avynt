"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hint from "@/components/hint";
import { useRenameModal } from "@/store/user-rename-modal";

interface InfoProps {
    boardId: string
};

const TabSeparator = () => {
    return (
        <div className="text-[var(--text)] px-2">
            /
        </div>
    )
}

const Info = ({
    boardId,
}: InfoProps) => {
    const { onOpen } = useRenameModal()
    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">
    })

    if (!data) return <Loading></Loading>
    
    return ( 
        <div className="absolute top-2 left-2 bg-[var(--background-light)] rounded-md h-10 flex items-center justify-start shadow-md">
            <Hint label="Back to boards" side="bottom" sideOffset={10}>
                <Button variant="board" size="sm">
                    <Link href="/">
                        Boards
                    </Link>
                </Button>
            </Hint>
            <div className="flex items-center">
                <TabSeparator></TabSeparator>
                <Button variant="board" size="sm" className="text-base font-normal" onClick={() => onOpen(data._id, data.title)}>
                    {data.title}
                </Button>
                {/* <TabSeparator></TabSeparator>
                TODO: Add more routes with section selector */}
            </div>
        </div>
     );
}
 
export default Info;
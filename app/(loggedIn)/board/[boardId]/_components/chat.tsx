/* import ChatRooms from "./chatrooms"; */
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import ChatRooms from "./chatrooms";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ChatProps {
    boardId: string
}

const Chat = ({ boardId }: ChatProps) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">
    })

    const toggleWidth = () => {
        setIsExpanded(!isExpanded);
    };

    return ( 
        <div onClick={toggleWidth} className={cn("fixed top-[50%] -translate-y-[50%] right-0 bg-[var(--background-dark)] z-20 flex h-full px-1 items-center rounded-l-xl", isExpanded ? "w-[40%]" : "w-12", )} >
            {!isExpanded && (
                <Button variant="board" size="icon">
                    <CiSquareChevLeft className="text-2xl"/>
                </Button>
            )}

            {isExpanded && (
                <div className="flex items-center justify-center h-full">
                    <Button variant="board" size="icon">
                        <CiSquareChevRight className="text-2xl"/>
                    </Button>
                    <ChatRooms boardId={data?._id}></ChatRooms>
                </div>
            )}
            
        </div>
     );
}
 
export default Chat;
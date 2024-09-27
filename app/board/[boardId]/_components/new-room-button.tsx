"use client"

import { Plus } from "lucide-react"
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import Hint from "@/components/hint"
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

interface NewRoomButtonProps{
    boardId: Id<"boards">;
    disabled?: boolean;
}

const NewRoom = ({
    boardId,
    disabled
}:NewRoomButtonProps) => {

    const { mutate, pending } = useApiMutation(api.chatroom.create)
    const chatRooms = useQuery(api.chatroom.get, { boardId })

    const onClick = () => {
        if(!boardId)
        mutate({
            boardId: boardId,
            title: "untitled"
            })
            .then((id) => {
                toast.success("Room created")
            })
            .catch(() => toast.error("Failed to create room"))
    }

    if (!chatRooms) {
        return <div>Loading chat rooms...</div>;
    }

    return (
        <div className="aspect-square">
            <Hint label="Create room" side="right" align="start" sideOffset={18}>
                <button disabled={pending || disabled} onClick={onClick} className="bg-white/20 h-6 w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                    <Plus className="text-[var(--text)]"></Plus>
                </button>
            </Hint>
        </div>
     );
}
 
export default NewRoom;
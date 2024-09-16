"use client"

import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps{
    orgId: string;
    disabled?: boolean;
}

const NewBoardButton = ({
    orgId,
    disabled
}:NewBoardButtonProps) => {
    
    const router = useRouter()
    const { mutate, pending } = useApiMutation(api.board.create)
    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })
            .then((id) => {
                toast.success("Board created")
                router.push(`/board/${id}`)
            })
            .catch(() => toast.error("Failed to create board"))
    }

    return ( 
        <button disabled={pending || disabled} onClick={onClick} className={cn("col-span-1 aspect-[100/100] bg-white/20 opacity-60 rounded-lg hover:opacity-100 flex flex-col items-center justify-center py-6", (pending || disabled) && "opacity-75 cursor-not-allowed")}>
            <div></div>
            <Plus className="h-12 w-12 text-[var(--text)] stroke-1"></Plus>
            <p className="text-sm text-[var(--text)] font-light">
                New board
            </p>
        </button>
     );
}
 
export default NewBoardButton;
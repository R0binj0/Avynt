"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { ConfirmModal } from "./confirm-model"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/user-rename-modal"

interface ActionsProps{
    children: React.ReactNode
    side?: DropdownMenuContentProps["side"]
    sideOffset?: DropdownMenuContentProps["sideOffset"]
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {
    
    const  { onOpen } = useRenameModal()
    const { mutate, pending } = useApiMutation(api.board.remove)
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
            .then(() => toast.success("Link copied"))
            .catch(() => toast.error("Failed to copy link"))
    }

    const onDelete = () => {
        mutate({ id })
            .then (() => toast.success("Board deleted"))
            .catch(() => toast.error("failed to delete board"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()} side={side} sideOffset={sideOffset} className="w-60">
                <Button variant="ghost" onClick={onCopyLink} className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                    <Link2 className="h-4 w-4 mr-2"></Link2>
                    Copy board link
                </Button>
                <Button variant="ghost" onClick={() => onOpen(id, title)} className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                    <Pencil className="h-4 w-4 mr-2"></Pencil>
                    Rename
                </Button>
                <ConfirmModal header="Delete board?" description="This will delete the board and all of its content." disabled={pending} onConfirm={onDelete}>
                    <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                        <Trash2 className="h-4 w-4 mr-2"></Trash2>
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
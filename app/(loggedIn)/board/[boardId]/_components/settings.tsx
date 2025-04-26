import { CiSettings } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/user-rename-modal";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Loading from "./loading";

interface SettingsProps {
    boardId: string
};

const Settings = ({
    boardId
}:SettingsProps) => {
    const { onOpen } = useRenameModal()
    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">
    })

    if (!data) return <Loading></Loading>

    return (
        <Popover>
            <PopoverTrigger>
                <Button size="icon" variant={"board"}>
                    <CiSettings className="text-2xl"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-[var(--background-dark)] text-[var(--text)] w-[20vw]">
                <h2 className="pb-2 text-2xl border-b-[1px] border-[var(--background)]">{data.title}</h2>
                <div className="flex flex-col gap-2 py-2">
                    <Button variant="board" size="sm" className="text-base justify-start  font-normal w-full" onClick={() => onOpen(data._id, data.title)}>
                        Share
                    </Button>
                    <Button variant="board" size="sm" className="text-base justify-start  font-normal w-full" onClick={() => onOpen(data._id, data.title)}>
                        Rename
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
 
export default Settings;
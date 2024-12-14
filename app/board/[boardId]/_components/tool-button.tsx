"use client"

import Hint from "@/components/hint"
import { Button } from "@/components/ui/button"

interface ToolButtonProps{
    label: string
    children: React.ReactNode
    onClick: () => void
    isActive?: boolean
    isDisabeld?: boolean
}

const ToolButton = ({
    label,
    children,
    onClick,
    isActive,
    isDisabeld,
}:ToolButtonProps) => {
    return ( 
        <Hint label={label} side={"right"} sideOffset={14}>
            <Button disabled={isDisabeld} onClick={onClick} size="icon" variant={isActive ? "boardActive" : "board"}>
                { children }
            </Button>
        </Hint>
     );
}
 
export default ToolButton;
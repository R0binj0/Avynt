"use client"

import { useState } from "react";
import { CanvasState, CanvasMode } from "@/types/canvas";
import "@/app/globals.css";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import Chat from "./chat";
import { useHistory, useSelf,  useCanRedo, useCanUndo } from "@liveblocks/react";
import Loading from "./loading";

interface CanvasProps {
    boardId: string
}

const Canvas = ({
    boardId,
}: CanvasProps) => {

    const [ canvasState, setCanvaState] = useState<CanvasState>({
        mode: CanvasMode.None,
    })

    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    const currentUser = useSelf((me) => me.info)

    if (!currentUser) {
        return <Loading></Loading>;
    } 

    return ( 
        <main className="h-full w-full relative touch-none sitegrid">
            <Info boardId={boardId}></Info>
            <Toolbar canvasState={canvasState} setCanvaState={setCanvaState} canRedo={canRedo} canUndo={canUndo} undo={history.undo} redo={history.redo}></Toolbar>
            <Participants></Participants>
            <Chat boardId={boardId}></Chat>
        </main>
     );
}
 
export default Canvas;
"use client"

import "@/app/globals.css";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface CanvasProps {
    boardId: string
}

const Canvas = ({
    boardId,
}: CanvasProps) => {
    return ( 
        <main className="h-full w-full relative touch-none sitegrid">
            <Info></Info>
            <Participants></Participants>
            <Toolbar></Toolbar>
        </main>
     );
}
 
export default Canvas;
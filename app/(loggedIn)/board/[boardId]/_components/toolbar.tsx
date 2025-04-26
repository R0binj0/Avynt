import { CiViewBoard, CiPen, CiBoxList, CiLink, CiViewTable, CiImageOn, CiFileOn, CiChat2, CiRoute, CiLocationArrow1, CiRedo, CiUndo, CiText } from "react-icons/ci";
import ToolButton from "./tool-button";
import { CanvasMode, CanvasState, LayerTypes } from "@/types/canvas";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Hint from "@/components/hint";

interface ToolbarProps {
    canvasState: CanvasState
    setCanvaState: (newState: CanvasState) => void
    undo: () => void
    redo: () => void
    canUndo: boolean
    canRedo: boolean

}

const Toolbar = ({
    canvasState,
    setCanvaState,
    undo,
    redo,
    canUndo,
    canRedo
}: ToolbarProps) => {
    return ( 
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-[var(--background-dark)] rounded-md flex gap-y-1 flex-col items-center shadow-md">
                <div>
                    <ToolButton label="Mouse" onClick={() => setCanvaState({ mode: CanvasMode.None,})} 
                    isActive={
                        canvasState.mode === CanvasMode.None || 
                        canvasState.mode === CanvasMode.Translating || 
                        canvasState.mode === CanvasMode.SelectionNet || 
                        canvasState.mode === CanvasMode.Pressing || 
                        canvasState.mode === CanvasMode.Resizing
                        }>
                        <CiLocationArrow1 className="text-2xl"/>
                    </ToolButton>
                </div>
{/*                 <div>
                    <ToolButton label="Section" onClick={() => {}} isActive={false}>
                        <CiViewBoard className="text-2xl"/>
                    </ToolButton>
                </div> */}
                <div>
                    <ToolButton label="Text" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Text})} 
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerTypes.Text
                        }>
                        <CiText className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger className="h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-[var(--foreground)] border-2 border-[var(--background-dark)]">
                            <Hint sideOffset={14} side="right" label="Shapes">
                                <rect className="border-[1.5px] w-4 h-4"></rect>   
                            </Hint>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col items-center absolute left-8 -bottom-10 border-none bg-[var(--background-dark)] text-[var(--text)] w-12 h-27">
                            <div>
                                <ToolButton label="Rectangle" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Rectangle})} 
                                isActive={
                                    canvasState.mode === CanvasMode.Inserting && 
                                    canvasState.layerType === LayerTypes.Rectangle}>
                                    <rect className="border-[1.5px] w-4 h-4"></rect>
                                </ToolButton>
                            </div>
                            <div>
                                <ToolButton label="Ellipse" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Ellipse})} 
                                isActive={
                                    canvasState.mode === CanvasMode.Inserting &&
                                    canvasState.layerType === LayerTypes.Ellipse
                                }>
                                    <ellipse className="border-[1.5px] rounded-full w-4 h-4"></ellipse>
                                </ToolButton>
                            </div>
{/*                             <div>
                                <ToolButton label="Triangle" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Triangle})} 
                                isActive={
                                    canvasState.mode === CanvasMode.Inserting &&
                                    canvasState.layerType === LayerTypes.Triangle
                                }>
                                    <div className="triangle"></div>
                                </ToolButton>
                            </div> */}
                        </PopoverContent>
                    </Popover>
                </div>
{/*                 <div>
                    <ToolButton label="Connect" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Connect})} 
                    isActive={
                        canvasState.mode === CanvasMode.Inserting && 
                        canvasState.layerType === LayerTypes.Connect}>
                        <CiRoute className="text-2xl"/>
                    </ToolButton>
                </div> */}
                <div>
                    <ToolButton label="Draw" onClick={() => setCanvaState({ mode: CanvasMode.Pencil,})} 
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    }>
                        <CiPen className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="To-Do" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.ToDo})} 
                    isActive={
                        canvasState.mode === CanvasMode.Inserting && 
                        canvasState.layerType === LayerTypes.ToDo}>
                        <CiBoxList className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Link" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Link})} 
                    isActive={
                        canvasState.mode === CanvasMode.Inserting && 
                        canvasState.layerType === LayerTypes.Link}>
                        <CiLink className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Table" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Table})} 
                    isActive={
                        canvasState.mode === CanvasMode.Inserting && 
                        canvasState.layerType === LayerTypes.Table}>
                        <CiViewTable className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Comment" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Comment})} 
                        isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerTypes.Comment
                        }>
                        <CiChat2 className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Image" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Image})} 
                    isActive={
                        canvasState.mode === CanvasMode.Inserting && 
                        canvasState.layerType === LayerTypes.Image}>
                        <CiImageOn className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Upload File" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.File})} 
                    isActive={
                        canvasState.mode === CanvasMode.Inserting && 
                        canvasState.layerType === LayerTypes.File}>
                        <CiFileOn className="text-2xl"/>
                    </ToolButton>
                </div>
            </div>
            <div className="bg-[var(--background-dark)] rounded-md flex flex-col items-center shadow-md">
                <div>
                    <ToolButton isDisabeld={!canUndo} label="Undo" onClick={undo}>
                        <CiUndo className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton isDisabeld={!canRedo} label="Redo" onClick={redo}>
                        <CiRedo className="text-2xl"/>
                    </ToolButton>
                </div>
            </div>
        </div>
     );
}
 
export default Toolbar;
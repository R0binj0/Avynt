import { CiViewBoard, CiPen, CiBoxList, CiLink, CiViewTable, CiImageOn, CiFileOn, CiChat2, CiRoute, CiLocationArrow1, CiRedo, CiUndo, CiText, CiStop1 } from "react-icons/ci";
import ToolButton from "./tool-button";
import { CanvasMode, CanvasState, LayerTypes } from "@/types/canvas";

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
            <div className="bg-[var(--background-light)] rounded-md flex gap-y-1 flex-col items-center shadow-md">
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
                <div>
                    <ToolButton label="Section" onClick={() => {}} isActive={false}>
                        <CiViewBoard className="text-2xl"/>
                    </ToolButton>
                </div>
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
                    <ToolButton label="Shapes" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Rectangle})} 
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerTypes.Rectangle
                        }>
                        {/* For Ellipse
                        onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Ellipse})} isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerTypes.Elipse
                        }> */}
                        <CiStop1 className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Connect" onClick={() => {}} isActive={false}>
                        <CiRoute className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Draw" onClick={() => setCanvaState({ mode: CanvasMode.Pencil,})} 
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    }>
                        <CiPen className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="To-Do" onClick={() => {}} isActive={false}>
                        <CiBoxList className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Link" onClick={() => {}} isActive={false}>
                        <CiLink className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Table" onClick={() => {}} isActive={false}>
                        <CiViewTable className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Comment" onClick={() => setCanvaState({ mode: CanvasMode.Inserting, layerType: LayerTypes.Note})} 
                        isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerTypes.Note
                        }>
                        <CiChat2 className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Image" onClick={() => {}} isActive={false}>
                        <CiImageOn className="text-2xl"/>
                    </ToolButton>
                </div>
                <div>
                    <ToolButton label="Upload File" onClick={() => {}} isActive={false}>
                        <CiFileOn className="text-2xl"/>
                    </ToolButton>
                </div>
            </div>
            <div className="bg-[var(--background-light)] rounded-md flex flex-col items-center shadow-md">
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
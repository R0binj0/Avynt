"use client"

import { memo } from "react";
import { LayerTypes, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side, initialBounds:XYWH) => void
}

const HANDLE_WIDTH = 8
const HANDLE_HEIGHT = 8

export const SelectionBox = memo(({onResizeHandlePointerDown}: SelectionBoxProps ) => {
    const soleLayerId = useSelf((me) =>
        me.presence.selection.length === 1 ? me.presence.selection[0] : null
    )

    const isShowingHandle = useStorage((root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerTypes.Path
    )

    const selectedLayer = useStorage((root) => 
        soleLayerId ? root.layers.get(soleLayerId) : null
    )

    const isTodoLayer = selectedLayer?.type === LayerTypes.ToDo

    const bounds = useSelectionBounds()

    if(!bounds) {
        return null
    }

    return (
        <>
            <rect 
                className="fill-transparent stroke-blue-600 stroke-1 pointer-events-none" 
                x={0} 
                y={0} 
                width={bounds.width} 
                height={bounds.height} 
                style={{transform: `translate(${bounds.x}px, ${bounds.y}px)`}}
            />
            {isShowingHandle && (
                <>
                    {!isTodoLayer && (
                        <>
                            <rect 
                                className="fill-white start-1 stroke-blue-600" 
                                x={0} 
                                y={0} 
                                onPointerDown={(e) => {
                                    e.stopPropagation()
                                    onResizeHandlePointerDown(Side.Top + Side.Left, bounds)
                                }} 
                                style={{cursor:"nwse-resize", width: `${HANDLE_WIDTH}px`, height: `${HANDLE_HEIGHT}px`, transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_HEIGHT / 2}px)`}}
                            />
                            <rect 
                                className="fill-white start-1 stroke-blue-600" 
                                x={0} 
                                y={0} 
                                onPointerDown={(e) => {
                                    e.stopPropagation()
                                    onResizeHandlePointerDown(Side.Top, bounds)
                                }} 
                                style={{cursor:"ns-resize", width: `${HANDLE_WIDTH}px`, height: `${HANDLE_HEIGHT}px`, transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_HEIGHT / 2}px)`}}
                            />
                            <rect 
                                className="fill-white start-1 stroke-blue-600" 
                                x={0} 
                                y={0} 
                                onPointerDown={(e) => {
                                    e.stopPropagation()
                                    onResizeHandlePointerDown(Side.Top + Side.Right, bounds)
                                }} 
                                style={{cursor:"nesw-resize", width: `${HANDLE_WIDTH}px`, height: `${HANDLE_HEIGHT}px`, transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_HEIGHT / 2}px)`}}
                            />
                        </>
                    )}
                    <rect 
                        className="fill-white start-1 stroke-blue-600" 
                        x={0} 
                        y={0} 
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Right, bounds)
                        }} 
                        style={{cursor:"ew-resize", width: `${HANDLE_WIDTH}px`, height: `${HANDLE_HEIGHT}px`, transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y + bounds.height/ 2 - HANDLE_HEIGHT / 2}px)`}}
                    />
                    {!isTodoLayer && (
                        <>
                            <rect 
                                className="fill-white start-1 stroke-blue-600" 
                                x={0} 
                                y={0} 
                                onPointerDown={(e) => {
                                    e.stopPropagation()
                                    onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds)
                                }} 
                                style={{cursor:"nwse-resize", width: `${HANDLE_WIDTH}px`, height: `${HANDLE_HEIGHT}px`, transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_HEIGHT / 2 + bounds.height}px)`}}
                            />
                            <rect 
                                className="fill-white start-1 stroke-blue-600" 
                                x={0} 
                                y={0} 
                                onPointerDown={(e) => {
                                    e.stopPropagation()
                                    onResizeHandlePointerDown(Side.Bottom, bounds)
                                }} 
                                style={{cursor:"ns-resize", width: `${HANDLE_WIDTH}px`, height: `${HANDLE_HEIGHT}px`, transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_HEIGHT / 2 + bounds.height}px)`}}
                            />
                            <rect 
                                className="fill-white start-1 stroke-blue-600" 
                                x={0} 
                                y={0} 
                                onPointerDown={(e) => {
                                    e.stopPropagation()
                                    onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds)
                                }} 
                                style={{cursor:"nesw-resize", width: `${HANDLE_WIDTH}px`, height: `${HANDLE_HEIGHT}px`, transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_HEIGHT / 2 + bounds.height}px)`}}
                            />
                        </>
                    )}
                    <rect 
                        className="fill-white start-1 stroke-blue-600" 
                        x={0} 
                        y={0} 
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Left, bounds)
                        }} 
                        style={{cursor:"ew-resize", width: `${HANDLE_WIDTH}px`, height: `${HANDLE_HEIGHT}px`, transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_HEIGHT / 2 + bounds.height / 2}px)`}}
                    />
                </>
            )}
        </>
    )
})

SelectionBox.displayName = "SelectionBox"

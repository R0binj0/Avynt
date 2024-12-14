"use client"

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color, LayerTypes } from "@/types/canvas"
import { useMutation, useSelf, useStorage } from "@liveblocks/react";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2, Minus, Plus } from "lucide-react";

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(({
    camera,
    setLastUsedColor,
}: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection) ?? []
    
    const selectedLayer = useStorage((root) => 
        selection.length === 1 ? root.layers.get(selection[0]) : null
    )

    const isTextLayer = selectedLayer?.type === LayerTypes.Text

    const setFontSize = useMutation(({ storage }, fontSize: number) => {
        if (!isTextLayer || selection.length !== 1) return;
        
        const liveLayers = storage.get("layers")
        const layer = liveLayers.get(selection[0])
        if (layer) {
            layer.update({ fontSize })
        }
    }, [isTextLayer, selection])

    const moveToBack = useMutation(({ storage }) => {
        const liveLayersIds = storage.get("layerIds")
        const indices: number[] = []

        const arr = liveLayersIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
            if(selection.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayersIds.move(indices[i], i)
        }
    }, [selection])

    const moveToFront = useMutation(({ storage }) => {
        const liveLayersIds = storage.get("layerIds")
        const indices: number[] = []

        const arr = liveLayersIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
            if(selection.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = indices.length -1; i >= 0; i--) {
            liveLayersIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i))
        }
    }, [selection])

    const setFill = useMutation(({storage}, fill: Color) => {
        const liveLayers = storage.get("layers")
        setLastUsedColor(fill)
        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill)
        })
    }, [selection, setLastUsedColor])

    const deleteLayers = useDeleteLayers()

    const selectionBounds = useSelectionBounds()
    if (!selectionBounds) {
        return null
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y

    return (
        <div className="absolute p-1.5 rounded-xl bg-[var(--background)] text-[var(--text)] shadow-sm border flex select-none" style={{transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`}}>
            <ColorPicker onChange={setFill}></ColorPicker>
            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to front">
                    <Button onClick={moveToFront} variant="board" size="icon" className="w-6 h-6 p-0.5">
                        <BringToFront></BringToFront>
                    </Button>
                </Hint>
                <Hint label="Send to back" side={"bottom"}>
                    <Button onClick={moveToBack} variant="board" size="icon" className="w-6 h-6 p-0.5">
                        <SendToBack></SendToBack>
                    </Button>
                </Hint>
            </div>
            {isTextLayer && (
                <div className="flex items-center gap-x-2 border-l border-neutral-200 pl-2 ml-2">
                    <Hint label="Decrease font size">
                        <Button 
                            variant="board" 
                            size="icon" 
                            className="h-5 w-5 p-0.5"
                            onClick={() => setFontSize(Math.max(1, (selectedLayer?.fontSize ?? 16) - 1))}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                    </Hint>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={`${selectedLayer?.fontSize ?? 16}px`}
                            onChange={(e) => {
                                const newSize = parseInt(e.target.value) || 16;
                                setFontSize(newSize);
                            }}
                            className="w-12 bg-transparent text-center outline-none"
                        />
                    </div>
                    <Hint label="Increase font size">
                        <Button 
                            variant="board" 
                            size="icon" 
                            className="h-5 w-5 p-0.5"
                            onClick={() => setFontSize((selectedLayer?.fontSize ?? 16) + 1)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
                <Hint label="Delete">
                    <Button variant="board" size="icon" onClick={deleteLayers} className="w-6 h-6 p-0.5">
                        <Trash2></Trash2>
                    </Button>
                </Hint>
            </div>
        </div>
    )
})

SelectionTools.displayName = "SelectionTools"

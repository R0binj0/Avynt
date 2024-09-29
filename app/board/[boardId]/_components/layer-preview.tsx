"use client"

import { LayerTypes } from "@/types/canvas"
import { useStorage } from "@liveblocks/react"
import { memo } from "react"
import { Rectangle } from "./rectangle"

interface LayerPreviewProps {
    id: string,
    onLayerPointerDown: (e:React.PointerEvent, layerId:string) => void,
    selectionColor?: string
}

export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor
}:LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))

    if (!layer) {
        return null
    }
    
    switch ( layer.type ) {
        case LayerTypes.Rectangle:
            return (
                <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor}></Rectangle>
            )
        default:
            return null
    }
})

LayerPreview.displayName = "LayerPreview"
"use client"

import { LayerTypes } from "@/types/canvas"
import { useStorage } from "@liveblocks/react"
import { memo } from "react"
import { Rectangle } from "./tools/rectangle"
import { Ellipse } from "./tools/ellipse"
import { Text } from "./tools/text"
import { Comment } from "./tools/comment"
import { Link } from "./tools/link"
import ImageUpload from "./tools/image"
import { ToDo } from "./tools/to-do"
import { Table } from "./tools/table"
import { File } from "./tools/file"
import { Path } from "./tools/path"
import { colorToCss } from "@/lib/utils"

interface LayerPreviewProps {
    id: string,
    onLayerPointerDown: (e:React.PointerEvent, layerId:string) => void,
    radius?: number,
    selectionColor?: string
}

export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    radius,
    selectionColor
}:LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))

    if (!layer) {
        return null
    }
    
    switch ( layer.type ) {
        case LayerTypes.Path:
            return (
                <Path key={id} points={layer.points} onPointerDown={(e) => onLayerPointerDown(e, id)} x={layer.x} y={layer.y} fill={layer.fill ? colorToCss(layer.fill) : "#FFF"} stroke={selectionColor} />
            )
        case LayerTypes.File:
            return (
                <File id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
            )
        case LayerTypes.Image:
            return (
                <ImageUpload id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
            )
        case LayerTypes.Table:
            return (
                <Table id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
            )
        case LayerTypes.Link:
            return (
                <Link id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor}></Link>
            )
        case LayerTypes.ToDo:
            return (
                <ToDo id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
            )
        case LayerTypes.Connect:
            return (
                <div></div>
            )
        case LayerTypes.Comment:
            return (
                <Comment id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor}></Comment>
            )
        case LayerTypes.Text:
            return (
                <Text id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor}></Text>
            )
        case LayerTypes.Triangle:
            return (
                <div></div>
            )
        case LayerTypes.Ellipse: 
            return (
                <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor}></Ellipse>
            )
        case LayerTypes.Rectangle:
            return (
                <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} radius={radius} selectionColor={selectionColor}></Rectangle>
            )
        default:
            return null
    }
})

LayerPreview.displayName = "LayerPreview"

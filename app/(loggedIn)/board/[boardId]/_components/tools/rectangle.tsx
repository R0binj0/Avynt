import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas"

interface RectangleProps{
    id: string
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void
    radius?: number
    selectionColor?: string
}

export const Rectangle = ({
    id,
    layer,
    onPointerDown,
    radius,
    selectionColor
}:RectangleProps) => {
    const { x, y, width, height, fill} = layer

    return (
        <rect className="drop-shadow-md" 
            onPointerDown={(e) => onPointerDown(e, id)} 
            style={{transform: `translate(${x}px, ${y}px)`}}
            x={0}
            y={0}
            rx={radius || 10}
            ry={radius || 10}
            width={width}
            height={height}
            strokeWidth={2}
            stroke={selectionColor || "transparent"}
            fill={fill ? colorToCss(fill) : "#2F2F2F"}
        />
    )
}
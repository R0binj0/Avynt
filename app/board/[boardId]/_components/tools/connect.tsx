import { ConnectLayer } from "@/types/canvas"
import { colorToCss } from "@/lib/utils";

interface ConnectProps{
    id: string
    layer: ConnectLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Connect = ({
    id, 
    layer, 
    onPointerDown,
    selectionColor
}:ConnectProps) => {
    const { x, y, width, height, fill } = layer;

    const startPoint = { x, y };
    const endPoint = { x: x + width, y: y + height };

    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const arrowHeadSize = 10;

    return (
        <g
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{ cursor: 'move' }}
        >
            <line
                x1={startPoint.x}
                y1={startPoint.y}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke={selectionColor || "black"}
                strokeWidth={2}
            />
            <polygon
                points={`0,-${arrowHeadSize / 2} ${arrowHeadSize},0 0,${arrowHeadSize / 2}`}
                fill={fill ? colorToCss(fill) : "#2F2F2F"}
                transform={`translate(${endPoint.x},${endPoint.y}) rotate(${angle})`}
            />
            {selectionColor && (
                <>
                    <circle
                        cx={startPoint.x}
                        cy={startPoint.y}
                        r={5}
                        fill={fill ? colorToCss(fill) : "#2F2F2F"}
                    />
                    <circle
                        cx={endPoint.x}
                        cy={endPoint.y}
                        r={5}
                        fill={fill ? colorToCss(fill) : "#2F2F2F"}
                    />
                </>
            )}
        </g>
    );

}
 
export default Connect;
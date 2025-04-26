import { Kalam } from "next/font/google"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { cn, colorToCss } from "@/lib/utils"
import { TextLayer } from "@/types/canvas"
import { useMutation } from "@liveblocks/react"

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})

interface TextProps {
    id: string
    layer: TextLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Text = ({
    layer,
    onPointerDown,
    id,
    selectionColor
}: TextProps) => {
    const { x, y, width, height, fill, value, fontSize } = layer
    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get("layers")
        liveLayers.get(id)?.set("value", newValue)
    }, [])
    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value)
    }

    const minWidth = 80
    const minHeight = 40

    return ( 
        <foreignObject 
            x={x} 
            y={y} 
            width={Math.max(width, minWidth)} 
            height={Math.max(height, minHeight)} 
            onPointerDown={(e) => onPointerDown(e, id)} 
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none"
            }}
        >
            <ContentEditable 
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full p-2 outline-none overflow-hidden",
                    font.className
                )}
                style={{
                    color: colorToCss(fill),
                    minWidth: `${minWidth}px`,
                    minHeight: `${minHeight}px`,
                    fontSize: `${fontSize}px`,
                }}
            />
        </foreignObject>
    )
}

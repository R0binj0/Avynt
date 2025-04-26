import { Kalam } from "next/font/google"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils"
import { CommentLayer } from "@/types/canvas"
import { useMutation } from "@liveblocks/react"

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})

interface CommentProps {
    id: string
    layer: CommentLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Comment = ({
    layer,
    onPointerDown,
    id,
    selectionColor
}: CommentProps) => {
    const { x, y, width, height, fill, value } = layer
    const minWidth = 100
    const minHeight = 60
    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get("layers")
        
        liveLayers.get(id)?.set("value", newValue)
    }, [])
    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value)
    }

    const backgroundColor = fill ? colorToCss(fill) : "#2F2F2F"
    const textColor = fill ? getContrastingTextColor(fill) : "#FFFFFF"

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
            <div 
                className="relative w-full h-full"
                style={{
                    filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
                }}
            >
                <div 
                    className="bubble"
                    style={{ 
                        backgroundColor,
                    }}
                >
                    <ContentEditable 
                        html={value || "Comment"}
                        onChange={handleContentChange}
                        className={cn(
                            "h-full w-full p-2 outline-none overflow-hidden",
                            font.className
                        )}
                        style={{ color: textColor }}
                    />
                </div>
            </div>
        </foreignObject>
    )
}
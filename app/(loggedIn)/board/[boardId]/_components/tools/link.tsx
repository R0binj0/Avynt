import { useState } from "react"
import { LayerTypes, LinkLayer } from "@/types/canvas"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils"
import { useMutation } from "@liveblocks/react"
import { CiLink } from "react-icons/ci"

interface LinkProps {
    id: string
    layer: LinkLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Link = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: LinkProps) => {
    const { x, y, width, height, fill, value, url } = layer
    const [linkUrl, setLinkUrl] = useState(url || "")
    const [isHovering, setIsHovering] = useState(false)
    const minWidth = 160
    const minHeight = 40

    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get("layers")
        liveLayers.get(id)?.set("value", newValue)
    }, [])

    const updateUrl = useMutation(({ storage }, newUrl: string) => {
        const liveLayers = storage.get("layers")
        const layer = liveLayers.get(id)
        if (layer && layer.get("type") === LayerTypes.Link) {
            (layer as unknown as { set(key: "url", value: string): void }).set("url", newUrl)
        }
    }, [])

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value)
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value
        setLinkUrl(newUrl)
        updateUrl(newUrl)
    }

    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        if (linkUrl) {
            window.open(linkUrl, "_blank", "noopener,noreferrer")
        }
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
                backgroundColor,
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
                borderRadius: "10px",
            }}
        >
            <div 
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative"
                onClick={handleLinkClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <CiLink 
                    className={cn(
                        "absolute w-8 h-8 left-2 top-1/2 transform -translate-y-1/2 transition-all duration-300 link-hover hover:scale-110"
                    )}
                    style={{
                        color: textColor,
                    }}
                />
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <ContentEditable 
                        html={value || "Link"}
                        onChange={handleContentChange}
                        className={cn("w-full text-center outline-none px-10 overflow-hidden text-ellipsis cursor-text")}
                        style={{ color: textColor }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    
                    <input
                        type="text"
                        value={linkUrl}
                        onChange={handleUrlChange}
                        placeholder="Enter URL"
                        className={cn(
                            "w-full bg-transparent text-center px-10 text-xs outline-none overflow-hidden text-ellipsis transition-all duration-300",
                            isHovering ? "max-h-[20px] text-gray-500 hover:text-gray-500/70" : "opacity-0 max-h-0"
                        )}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </div>
        </foreignObject>
    );
}

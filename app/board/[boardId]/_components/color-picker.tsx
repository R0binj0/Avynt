"use client"

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas"

interface ColorPickerProps {
    onChange: (color: Color ) => void
}

export const ColorPicker = ({
    onChange
}:ColorPickerProps) => {
    return ( 
        <div className="flex flex-wrap gap-2 items-center max-w-[100px] pr-2 mr-2 border-r border-neutral-200">
            <ColorButton onClick={onChange} color={{ r:31, g:72, b:126}} />
            <ColorButton onClick={onChange} color={{ r:229, g:99, b:153}} />
            <ColorButton onClick={onChange} color={{ r:209, g:0, b:0}} />
            <ColorButton onClick={onChange} color={{ r:255, g:177, b:0}} />
            <ColorButton onClick={onChange} color={{ r:11, g:110, b:79}} />
            <ColorButton onClick={onChange} color={{ r:155, g:153, b:135}} />
            <ColorButton onClick={onChange} color={{ r:248, g:247, b:255}} />
            <ColorButton onClick={onChange} color={{ r:67, g:67, b:67}} />
        </div>
     );
}

interface ColorButtonProps {
    onClick : ( color: Color) => void,
    color: Color
}

const ColorButton = ({
    onClick,
    color
}: ColorButtonProps) => {
    return (
        <button onClick={() => onClick(color)} className="w-4 h-4 flex items-center justify-center hover:opacity-75 transition">
            <div className="h-4 w-4 rounded-md border border-neutral-300" style={{background: colorToCss(color)}}></div>
        </button>
    )
}

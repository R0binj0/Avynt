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
        <div className="flex flex-wrap gap-2 items-center max-w-[140px] pr-2 mr-2 border-r border-neutral-200">
            <ColorButton onClick={onChange} color={{ r:243, g:84, b:24}} />
            <ColorButton onClick={onChange} color={{ r:243, g:243, b:24}} />
            <ColorButton onClick={onChange} color={{ r:24, g:84, b:24}} />
            <ColorButton onClick={onChange} color={{ r:24, g:84, b:243}} />
            <ColorButton onClick={onChange} color={{ r:24, g:243, b:24}} />
            <ColorButton onClick={onChange} color={{ r:243, g:84, b:243}} />
            <ColorButton onClick={onChange} color={{ r:243, g:243, b:243}} />
            <ColorButton onClick={onChange} color={{ r:24, g:24, b:24}} />
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
        <button onClick={() => onClick(color)} className=" w-6 h-6 flex items-center justify-center hover:opacity-75 transition">
            <div className="h-6 w-6 rounded-md border border-neutral-300" style={{background: colorToCss(color)}}></div>
        </button>
    )
}

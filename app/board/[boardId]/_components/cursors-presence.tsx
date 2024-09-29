"use client"

import { memo } from "react"
import { useOthersConnectionIds } from "@liveblocks/react"
import { Cursor } from "./cursor"

const Cursors = () => {
    const ids = useOthersConnectionIds()

    return ( 
        <>
            {ids.map((connectionId) => (
                <Cursor key={connectionId} connectionId={connectionId}></Cursor>
            ))}
        </>
    )
}
export const CursorsPresence = memo(() => {
    return (
        <>
            <Cursors></Cursors>
        </>
    )
})

CursorsPresence.displayName = "CursorsPresence"
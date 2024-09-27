"use client"

import { useOthers, useSelf } from "@liveblocks/react";
import UserAvatar from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOW_USERS = 3

const Participants = () => {

    const users = useOthers()
    const currentUser = useSelf()
    const hasMoreUsers = users.length > MAX_SHOW_USERS

    return ( 
        <div className="absolute h-12 top-2 right-14 bg-[var(--background-light)] rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_SHOW_USERS)
                .map(({ connectionId, info }) => {
                    return (
                        <UserAvatar borderColor={connectionIdToColor(connectionId)} key={connectionId} src={info?.picture} name={info?.name} fallback={info?.name?.[0] || "A"}></UserAvatar>
                    )
                })}
                { currentUser && (
                    <UserAvatar borderColor={connectionIdToColor(currentUser.connectionId)}  src={currentUser.info?.picture} name={`${currentUser.info?.name} (You)`} fallback={currentUser.info?.name?.[0]}></UserAvatar>
                )}

                {hasMoreUsers &&  (
                    <UserAvatar borderColor="#000000" name={`${users.length - MAX_SHOW_USERS} more`} fallback={`+${users.length - MAX_SHOW_USERS}`}></UserAvatar>
                )}
            </div>
        </div>
     );
}
 
export default Participants;
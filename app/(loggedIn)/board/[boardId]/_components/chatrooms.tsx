import NewRoom from "./new-room-button";

interface ChatRoomProps {
    boardId: string;
}

const ChatRooms = ({ boardId }: ChatRoomProps) => {

    return ( 
        <div className="border-x-[1px] border-[var(--background)] flex flex-col h-full w-32 mx-2 pt-2 px-2 gap-2 ">
            <button className="text-xl border-b-[1px] text-start font-light opacity-60 hover:opacity-100 py-[2px]">general</button>
            <NewRoom boardId={boardId}></NewRoom>
        </div>
     );
}
 
export default ChatRooms;
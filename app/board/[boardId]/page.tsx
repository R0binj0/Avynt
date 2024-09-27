import Canvas from "./_components/canvas";
import Room from "@/components/room";
import Loading from "./_components/loading";

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = ({
    params,
}: BoardIdPageProps) => {

    return ( 
        <Room roomId={params.boardId} fallback={<Loading></Loading>}>
            <Canvas boardId={params.boardId}></Canvas>
        </Room>
     );
}
 
export default BoardIdPage;
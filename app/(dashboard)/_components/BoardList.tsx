"use client"

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyBoards from "./EmptyBoards";
import EmptyFavorites from "./EmptyFavorites";
import EmptySearch from "./EmptySearch";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    }
}

const BoardList = ( { orgId, query }: BoardListProps) => {

    const data = useQuery(api.boards.get, { orgId, ...query})

    if (data === undefined) {
        return (
            <div>
                <h2 className="text-3xl">
                    {query.favorites ? "Favorites boards" : "Team boards"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewBoardButton orgId={orgId} disabled></NewBoardButton>
                    <BoardCard.Skeleton></BoardCard.Skeleton>
                    <BoardCard.Skeleton></BoardCard.Skeleton>
                    <BoardCard.Skeleton></BoardCard.Skeleton>
                </div>
            </div>
        )
    }
    
    if (!data?.length && query.search) {
        return (
            <EmptySearch></EmptySearch>
        )
    }

    if (!data?.length && query.favorites) {
        return (
            <EmptyFavorites></EmptyFavorites>
        )
    }

    if (!data?.length) {
        return (
            <EmptyBoards></EmptyBoards>
        )
    }

    return ( 
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorites boards" : "Team boards"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewBoardButton orgId={orgId}></NewBoardButton>
                {data?.map((board) => (
                    <BoardCard key={board._id} id={board._id} title={board.title} imageUrl={board.imageUrl} authorId={board.authorId} authorName={board.authorName} createdAt={board._creationTime} orgId={board.orgId} isFavorite={board.isFavorite}>

                    </BoardCard>
                ))}
            </div>
        </div>
     );
}
 
export default BoardList;
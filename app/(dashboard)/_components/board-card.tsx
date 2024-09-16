"use client"

import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import { FormatDateOptions, formatDistance, formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import BoardFooter from "./board-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

const BoardCard = ({
    id,
    title,
    authorId,
    authorName,
    createdAt,
    imageUrl,
    orgId,
    isFavorite
}: BoardCardProps) => {

    const { userId } = useAuth()
    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });
    
    const {
        mutate: onFavorite,
        pending: pendingFavorite
    } = useApiMutation(api.board.favorite)
    const {
        mutate: onUnFavorite,
        pending: pendingUnFavorite
    } = useApiMutation(api.board.unfavorite)

    const toggleFavorite = () => {
        if (isFavorite) {
            onUnFavorite({ id })
                .catch(() => toast.error("Failed to unfavorite"))
        } else {
            onFavorite({ id, orgId })
                .catch(() => toast.error("Failed to favorite"))
        }
    }

    return ( 
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/100] boarder rounded-lg flex flex-col justify-between overflow-hidden border-[2px] border-[var(--forground)]">
                <div className="relative flex-1 bg-[var(--foreground)]">
                    <Image src={imageUrl} alt="Doodle" fill className="object-contain"></Image>
                    <Overlay></Overlay>
                    <Actions id={id} title={title} side="right" >
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-[var(--text)] opacity-75 hover:opacity-100 transition-opacity"></MoreHorizontal>
                        </button>
                    </Actions>
                </div>
                <BoardFooter isFavorite={isFavorite} title={title} authorLabel={authorLabel} createdAtLabel={createdAtLabel} onClick={toggleFavorite} disabled={pendingFavorite || pendingUnFavorite}></BoardFooter> 
            </div>
        </Link>
     );
}
 
export default BoardCard;

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/100] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full"></Skeleton>
        </div>
    )
}
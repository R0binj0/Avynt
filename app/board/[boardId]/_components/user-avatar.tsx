import Hint from "@/components/hint"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


interface UserAvatarProps {
    src?: string
    name?:string
    fallback?: string
    borderColor?:string
}

const UserAvatar = ({
    src,
    name,
    fallback,
    borderColor
}: UserAvatarProps) => {
    return ( 
        <Hint label={name || "Anonymouse"} side="bottom" sideOffset={10}>
            <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
                <AvatarImage src={src}></AvatarImage>
                <AvatarFallback className="text-xs font-semibold text-[var(--background)]">
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Hint>
     );
}
 
export default UserAvatar;
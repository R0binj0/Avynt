import { Loader2 } from "lucide-react";

const Loading = () => {
    return ( 
        <main className="h-full w-full relative touch-none flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin"></Loader2>
        </main>
     );
}
 
export default Loading;
"use client"

import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Hint from "@/components/hint"

const NewButton = () => {
    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint label="Create team" side="right" align="start" sideOffset={18}>
                        <button className="bg-white/20 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-[var(--text)]"></Plus>
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent>
                <CreateOrganization routing="hash">
                    
                </CreateOrganization>
            </DialogContent>
        </Dialog>
     );
}
 
export default NewButton;
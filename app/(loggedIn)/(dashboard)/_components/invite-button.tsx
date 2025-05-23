import { Settings } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

const InviteButton = () => {
    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Settings className="h-4 w-4 mr-2"></Settings>
                    Organization Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
                <OrganizationProfile routing="hash"></OrganizationProfile>
            </DialogContent>
        </Dialog>
     );
}
 
export default InviteButton;
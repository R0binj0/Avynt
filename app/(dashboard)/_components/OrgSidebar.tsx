"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/logo-colors";

const OrgSidebar = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");

    return ( 
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 border-r-[2px] border-[var(-background)] pr-5">
            <Link href="/">
                <div className="flex items-center justify-center gap-x-2">
                    <Logo></Logo>
                </div>
            </Link>
            <div className="space-y-1 w-full">
                <Button variant={favorites ? "outline" : "secondary"} asChild size="lg" className="font-normal justify-start px-2 w-full border-[2px]">
                    <Link href="/">
                        <LayoutDashboard className="h-4 w-4 mr-2"></LayoutDashboard>
                        Team board
                    </Link>
                </Button>
            </div>
            <div className="space-y-1 w-full">
                <Button variant={favorites ? "secondary" : "outline"} asChild size="lg" className="font-normal justify-start px-2 w-full border-[2px]">
                    <Link href={{
                        pathname: "/",
                        query: { favorites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2"></Star>
                        Favorite boards
                    </Link>
                </Button>
            </div>
        </div>
     );
}
 
export default OrgSidebar;
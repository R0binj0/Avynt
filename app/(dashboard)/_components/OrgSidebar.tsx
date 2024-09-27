"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/logo-colors";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Feedback from "@/components/feedback";
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';
import { Engine, ISourceOptions } from 'tsparticles-engine';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

interface OrgSidebarProps {
    quizId: Id<"quiz">;
}

const OrgSidebar = ({ quizId }:OrgSidebarProps) => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadConfettiPreset(engine);
    }, []);
    
    const userFeedback = useQuery(api.feedback.get, {
        quizId: quizId,
    });
    
    const options: ISourceOptions = {
        preset: 'confetti',
        emitters: {
        direction: 'top',
            position: {
                x: 10,
                y: 100,
            },
            rate: {
                delay: 0.9,
                quantity: 40,
            },
            size: {
                width: 10,
                height: 50,
            },
            life: {
                duration: 0,
                delay: 0,
            },
        },
    };

    return ( 
        <div className="hidden lg:flex flex-col items-center space-y-6 w-[206px] pl-5 pt-5 border-r-[2px] border-[var(--background-light)] pr-5">
            <Link href="/">
                <div className="flex items-center justify-center gap-x-2">
                    <Logo></Logo>
                </div>
            </Link>
            <div className="space-y-1 w-full">
                <OrganizationSwitcher hidePersonal appearance={{
                    elements: {
                        rootBox: "flex justify-center items-center w-full mb-6",
                        avatarImage: "border-2 border-white rounded-md ",
                        organizationSwitcherTrigger: "p-[6px] w-full justify-between border-2 border-[var(--text)] text-[var(--foreground)] bg-[var(--background)] hover:text-[var(--background)] focus:text-[var(--background)] hover:bg-[var(--foreground)] focus:bg-[var(--foreground)]"
                    },
                }} />
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
            { quizId && quizId !== "k17argp7fcfhwsjs2xzfjx9r9n71fzsv" && !userFeedback ? (
                <div className="absolute bottom-4 flex items-center flex-col gap-3 rounded-md p-2 feedback-bounce">
                    <Particles id="tsparticles" init={particlesInit} options={options} />
                    <div className="absolute  bottom-16 text-center feedback-neon">
                        <p className="uppercase">I will be gone if you give us your feedback 😄👍</p>
                    </div>
                    <Feedback quizId={quizId}></Feedback>
                </div>
            ) : <div></div> }
        </div>
     );
}
 
export default OrgSidebar;
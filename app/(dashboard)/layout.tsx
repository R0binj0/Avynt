"use client"

import Navbar from "./_components/Navbar";
import OrgSidebar from "./_components/OrgSidebar";
import Sidebar from "./_components/Sidebar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    
    const activeQuiz = useQuery(api.quiz.getActive) ;
    const quizId =  activeQuiz ? activeQuiz._id : "k17argp7fcfhwsjs2xzfjx9r9n71fzsv" as Id<"quiz">;
    return ( 
        <main className="h-full">
            <Sidebar></Sidebar>
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar quizId={quizId}></OrgSidebar>
                    <div className="h-full flex-1">
                        <Navbar></Navbar>
                        {children}   
                    </div>
                </div>
            </div>
        </main>
     );
}
 
export default DashboardLayout;
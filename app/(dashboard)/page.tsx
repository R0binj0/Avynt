"use client"

import BoardList from "./_components/BoardList";
import EmptyOrg from "./_components/EmptyOrg";
import { useOrganization } from "@clerk/nextjs";

interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    }
}

const Dashboard = ({ searchParams }: DashboardPageProps) => {
    const { organization } = useOrganization()
    return ( 
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {!organization ? (
                <EmptyOrg></EmptyOrg>
            ) : (
                <BoardList orgId={organization.id} query={searchParams}></BoardList>
            )}
        </div>
     );
}
 
export default Dashboard;
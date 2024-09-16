import Navbar from "./_components/Navbar";
import OrgSidebar from "./_components/OrgSidebar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return ( 
        <main className="h-full">
            <Sidebar></Sidebar>
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar></OrgSidebar>
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
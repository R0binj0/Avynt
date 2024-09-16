
import List from "./list";
import NewButton from "./new-button";

const Sidebar = () => {
    return ( 
        <aside className="fixed z-10 left-0 bg-[--background-light] h-full w-[60px] flex p-3 flex-col gap-y-4 text-[var(--text)]">
            <List></List>
            <NewButton></NewButton>
        </aside>
     );
}
 
export default Sidebar;
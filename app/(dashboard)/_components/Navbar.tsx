"use client"

import { UserButton, OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import SearchInput from "./search-input";
import InviteButton from "./invite-button";

const Navbar = () => {
    const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10", 
      },
    };

    const { organization } = useOrganization()

    return ( 
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput></SearchInput>
            </div>
            <div className="block lg:hidden flex-1">
              <SearchInput></SearchInput>
            </div>
            {organization && (
              <InviteButton></InviteButton>
            )}
            <UserButton appearance={userButtonAppearance}></UserButton>        
        </div>
     );
}
 
export default Navbar;
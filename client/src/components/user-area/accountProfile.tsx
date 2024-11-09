import { NavLink, useParams } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { RiDashboard3Line } from "react-icons/ri";

const UserAreaAccountProfile = () => {

    const { user_id } = useParams();
    const pathName = window.location.href;
    const navLinks = [`/user/workspace/${user_id}`, `/user/settings/${user_id}`];

    const handleLogOut = () => {
        console.log("Hey");
    }

    return (
        <>
            <div className="h-[40px]">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="bg-white dark:bg-zinc-800 w-[40px] h-[40px] border border-solid border-zinc-200 dark:border-zinc-600 flex items-center justify-center rounded-full font-poppins text-[18px] font-semibold text-zinc-500 dark:text-zinc-300">
                            <span className="uppercase">a</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[170px] apddm">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={`menu-item cursor-pointer ${pathName.includes(navLinks[0]) ? 'active' : ''}`}>
                            <NavLink
                                to={`/user/workspace/${1}`}
                                title="My Workspace"
                            >
                                <div className="flex gap-x-[5px] py-[5px]">
                                    <RiDashboard3Line size={20} className="!w-[20px] !h-[20px]" />
                                    <span>My Workspace</span>
                                </div>
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className={`menu-item cursor-pointer ${pathName.includes(navLinks[1]) ? 'active' : ''}`}>
                            <NavLink
                                to={`/user/settings/${1}`}
                                title="Settings"
                            >
                                <div className="flex gap-x-[5px] py-[5px]">
                                    <CiSettings size={20} className="!w-[20px] !h-[20px]" />
                                    <span>Settings</span>
                                </div>
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            title="Logout"
                            className="menu-item cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                            onClick={handleLogOut}
                        >
                            <RiLogoutBoxRLine size={16} />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

export default UserAreaAccountProfile;
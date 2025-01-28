import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Box, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetUserInfo } from "@/tanstack-query/queries/queries";

const UserAreaAccountProfile = () => {

    const { user_id } = useParams();
    const navigate = useNavigate();
    const pathName = window.location.href;
    const navLinks = [`/user/my-workspaces/${user_id}`, `/user/settings/${user_id}`];
    const [uNm, sUNM] = useState("a");

    const handleLogOut = () => {
        localStorage.removeItem("Auth");
        navigate("/");
    }

    let tkn = null;
    const lsi = localStorage.getItem("Auth");
    if (lsi) {
        tkn = JSON.parse(lsi);
    }

    const { data } = useGetUserInfo({
        token: tkn,
        required_data_code: "115521"
    });

    useEffect(() => {
        sUNM(data?.user?.user_full_name?.charAt(0) ?? "a");
    }, [data]);

    return (
        <>
            <div className="h-[40px]">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="bg-white dark:bg-zinc-800 cursor-pointer w-[40px] h-[40px] border border-solid border-zinc-200 dark:border-zinc-600 flex items-center justify-center rounded-full font-poppins text-[18px] font-semibold text-zinc-500 dark:text-zinc-300">
                            <span className="uppercase">{uNm}</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[170px] apddm">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className={`menu-item cursor-pointer ${pathName.includes(navLinks[0]) ? 'active' : ''}`}>
                            <NavLink
                                to={`/user/my-workspaces/${user_id}`}
                                title="My Workspaces"
                            >
                                <div className="flex gap-x-[5px] py-[5px]">
                                    <Box size={20} className="!w-[20px] !h-[20px]" />
                                    <span>My Workspaces</span>
                                </div>
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className={`menu-item cursor-pointer ${pathName.includes(navLinks[1]) ? 'active' : ''}`}>
                            <NavLink
                                to={`/user/settings/${user_id}`}
                                title="Settings"
                            >
                                <div className="flex gap-x-[5px] py-[5px]">
                                    <Settings size={20} className="!w-[20px] !h-[20px]" />
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
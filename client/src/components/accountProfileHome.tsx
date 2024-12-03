import { NavLink, useNavigate } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu";
import { FiUserPlus } from "react-icons/fi";
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
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import { UserLoginTokenType } from "@/types/tenstack-query/auth/authTypes";

const AccountProfileHome = (props: { cb?: () => void }) => {

    const { cb } = props;
    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false);
    const [userID, setUserID] = useState<string>("");
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleLogOut = () => {
        cookies.remove("Auth");
        navigate("/");
        setIsLoggedInUser(false);
        setUserID("");
    }

    useEffect(() => {
        const gtCo = cookies.get("Auth");
        if (gtCo) {
            setIsLoggedInUser(true);
            const decodeToken: UserLoginTokenType = jwtDecode(gtCo);
            setUserID(decodeToken.user_id);
        } else {
            setIsLoggedInUser(false);
            setUserID("");
        }
    }, []);

    return (
        <>
            {
                isLoggedInUser ?
                    (
                        <>
                            <div className="h-[40px]">
                                <DropdownMenu onOpenChange={(open) => {
                                    if (open === true) {
                                        if (cb) cb();
                                    }
                                }}>
                                    <DropdownMenuTrigger>
                                        <div className="bg-white dark:bg-zinc-800 w-[40px] h-[40px] border border-solid border-zinc-200 dark:border-zinc-600 flex items-center justify-center rounded-full font-poppins text-[18px] font-semibold text-zinc-500 dark:text-zinc-300">
                                            <span className="uppercase">a</span>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[170px] apddm">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild className="menu-item cursor-pointer">
                                            <NavLink
                                                to={`/user/my-workspaces/${userID}`}
                                                title="My Workspaces"
                                            >
                                                <div className="flex gap-x-[5px] py-[5px]">
                                                    <Box size={20} className="!w-[20px] !h-[20px]" />
                                                    <span>My Workspaces</span>
                                                </div>
                                            </NavLink>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="menu-item cursor-pointer">
                                            <NavLink
                                                to={`/user/settings/${userID}`}
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
                    :
                    (

                        <NavLink
                            to="/auth/login"
                            title="Sign In"
                            className={`${buttonVariants({ variant: "default" })} relative w-[40px] md:w-auto`}
                        >
                            <div className="hidden md:flex gap-x-[10px] items-center">
                                Sign In
                                <LuArrowRight size={18} />
                            </div>
                            <div className="visible md:hidden">
                                <FiUserPlus size={20} className="!w-[20px] !h-[20px] absolute top-[9px] left-[10px]" />
                            </div>
                        </NavLink>
                    )
            }
        </>
    )
}

export default AccountProfileHome;
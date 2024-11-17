import { NavLink } from "react-router-dom";
import SiteLogo from "../siteLogo";
import UserAreaAccountProfile from "./accountProfile";

const UserAreaHeader = () => {
    return (
        <>
            <header className="w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 border-solid dark:border-zinc-800">
                <div className="site-container">
                    <div className="flex items-center gap-x-[15px] py-[15px]">
                        <div>
                            <NavLink to="/" title="Home">
                                <SiteLogo />
                            </NavLink>
                        </div>
                        <div className="ml-auto">
                            <UserAreaAccountProfile />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
};

export default UserAreaHeader;
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu";
import { FiUserPlus } from "react-icons/fi";

const AccountProfile = () => {

    const isLoggedInUser: boolean = false;

    return (
        <>
            {
                isLoggedInUser ?
                    (
                        <>

                        </>
                    )
                    :
                    (

                        <NavLink
                            to="/register"
                            title="Sign Up"
                            className={`${buttonVariants({ variant: "default" })} relative w-[40px] md:w-auto`}
                        >
                            <div className="hidden md:flex gap-x-[10px] items-center">
                                Sign Up
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

export default AccountProfile;
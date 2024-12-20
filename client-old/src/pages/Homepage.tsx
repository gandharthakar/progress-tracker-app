import { buttonVariants } from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu";
import { BiRightArrow } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Homepage = () => {
    return (
        <div className="flex items-center justify-center py-[100px] px-[20px] min-h-screen bg-white dark:bg-zinc-950 grid-bg">
            <div className="max-w-[550px] text-center">
                <div className="pb-[10px] md:pb-[10px]">
                    <h1 className="font-poppins font-bold text-[28px] md:text-[45px] text-zinc-900 dark:text-zinc-100">
                        Beyond Tracking.
                    </h1>
                </div>
                <div className="pb-[20px] md:pb-[25px]">
                    <h2 className="font-roboto_mono text-[14px] md:text-[18px] text-zinc-600 dark:text-zinc-400">
                        This is very simple tool where you can track your dailly tasks & its progress visually.
                    </h2>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[10px]">
                    <div>
                        <NavLink
                            to="/auth/register"
                            title="Get Started"
                            className={buttonVariants({ variant: "default" })}
                        >
                            Get Started
                            <LuArrowRight size={18} />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to="/how-it-works"
                            title="How It Works"
                            className={`${buttonVariants({ variant: "outline" })} dark:text-zinc-300`}
                        >
                            How It Works
                            <BiRightArrow size={18} />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
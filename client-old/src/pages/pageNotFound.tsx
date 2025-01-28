import ThemeChecker from "@/utils/themeChecker";
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PageNotFound = () => {
    return (
        <>
            <ThemeChecker />
            <div className="flex justify-center items-center py-[50px] px-[20px] min-h-screen relative bg-white dark:bg-zinc-950 grid-bg">
                <div className="w-full max-w-[600px] p-[20px] rounded-[7px] border border-solid border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 shadow-lg dark:shadow-zinc-900">
                    <div className="pb-[10px] text-center">
                        <h1 className="inline-block font-roboto_mono text-[30px] md:text-[40px] font-bold text-zinc-900 dark:text-zinc-100">
                            404
                        </h1>
                    </div>
                    <div className="pb-[10px] text-center">
                        <h2 className="inline-block font-poppins font-semibold text-[18px] md:text-[20px] text-zinc-700 dark:text-zinc-200">
                            Oops! Page Not Found
                        </h2>
                    </div>
                    <div className="pb-[15px] text-center max-w-[300px] mx-auto">
                        <p className="inline-block font-poppins text-[14px] md:text-[16px] text-zinc-400">
                            We couldn't find the page you were looking for.
                        </p>
                    </div>
                    <div className="text-center">
                        <NavLink
                            to="/"
                            title="Go Home"
                            className={buttonVariants({ variant: "default", size: "sm" })}
                        >
                            <ArrowLeft size={20} />
                            Go Home
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PageNotFound;
import SiteLogo from "@/components/siteLogo";
import ThemeChecker from "@/utils/themeChecker";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Power, Send } from "lucide-react";
import { useEffect } from "react";

const LoginVerificationRedirect = () => {

    const navigate = useNavigate();

    const handleResendLink = () => {
        const gli = localStorage.getItem("Auth");
        if (gli) {
            const prsGli = JSON.parse(gli);
            console.log(prsGli);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("Auth");
        navigate("/");
    }

    useEffect(() => {
        const gli = localStorage.getItem("Auth");
        if (!gli) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <ThemeChecker />
            <div className="flex justify-center items-center py-[50px] px-[20px] min-h-screen relative bg-white dark:bg-zinc-950 grid-bg">
                <div className="w-full max-w-[460px] p-[20px] rounded-[7px] border border-solid border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 shadow-lg dark:shadow-zinc-900">
                    <div className="pb-[10px] pt-[5px] text-center">
                        <NavLink to="/" title="Home" className="inline-block">
                            <SiteLogo />
                        </NavLink>
                    </div>
                    <div className="pb-[20px] text-center">
                        <h1 className="inline-block font-poppins text-[20px] md:text-[24px] font-bold text-zinc-950 dark:text-zinc-50">
                            Email Verification Required
                        </h1>
                    </div>
                    <div className="pb-[30px]">
                        <div className="block font-roboto_mono text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                            <b>Dear User,</b>
                            <div style={{ height: "10px" }}></div>
                            Please verify yourself first otherwise you can't able to login & use our services again. If you already received verification Link & OTP then please verify first then try to login.
                            <div style={{ height: "10px" }}></div>
                            In case if your verification link is expired then click on below button "Resend Link" to send new link to your registered email address or otherwise you can click "logout" button to logout.
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-[15px] gap-y-[15px] pb-[10px]">
                        <Button
                            type="button"
                            title="Resend Link"
                            onClick={handleResendLink}
                        >
                            <Send size={15} />
                            Resend Link
                        </Button>
                        <Button
                            type="button"
                            title="Logout"
                            className="bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-500 dark:text-zinc-200"
                            onClick={handleLogout}
                        >
                            <Power size={15} />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LoginVerificationRedirect;
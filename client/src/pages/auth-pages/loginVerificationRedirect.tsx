import SiteLogo from "@/components/siteLogo";
import ThemeChecker from "@/utils/themeChecker";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Power, Send } from "lucide-react";
import { useEffect, useState } from "react";
import SiteDialog from "@/components/SiteDialog";
import Swal from "sweetalert2";
import { emlverlnkreqFormValidationSchema, emlverlnkreqFormValidationSchemaVS } from "@/zod/schemas/userAreaValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import { useReVerifyEmailLinkViaOptEmlAdrs, useReVerifyEmailLinkViaToken } from "@/tanstack-query/mutations/auth/authMutations";

const LoginVerificationRedirect = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<emlverlnkreqFormValidationSchemaVS>({
        resolver: zodResolver(emlverlnkreqFormValidationSchema)
    });

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/`);
                        reset();
                    }
                });
                // Redirect to Home page.
                const st = setTimeout(() => {
                    navigate(`/`);
                    reset();
                    clearTimeout(st);
                }, 4000);
            }
        }
    }

    const callbackOnErr = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (!resp.success) {
                Swal.fire({
                    title: "Error!",
                    text: resp.message,
                    icon: "error",
                    timer: 5000
                });
            }
        }
    }

    const callbackErr = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (!resp.success) {
                Swal.fire({
                    title: "Error!",
                    text: resp.message,
                    icon: "error",
                    timer: 5000
                });
            }
        }
    }

    const { mutate, isPending } = useReVerifyEmailLinkViaOptEmlAdrs({ onSuccessCB: (resp) => callbackOnSuc(resp), errorCB: (resp) => callbackErr(resp), onErrorCB: (resp) => callbackOnErr(resp) });

    const handleFormSubmit: SubmitHandler<emlverlnkreqFormValidationSchemaVS> = (formdata) => {
        const gli = localStorage.getItem("Auth");
        if (gli) {
            const prsGli = JSON.parse(gli);
            mutate({ token: prsGli, user_email: formdata.email });
        }
    }

    const callbackOnSuc_velvt = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/`);
                    }
                });
                // Redirect to Home page.
                const st = setTimeout(() => {
                    navigate(`/`);
                    clearTimeout(st);
                }, 4000);
            }
        }
    }

    const callbackOnErr_velvt = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (!resp.success) {
                Swal.fire({
                    title: "Error!",
                    text: resp.message,
                    icon: "error",
                    timer: 3000
                });
            }
        }
    }

    const callbackErr_velvt = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (!resp.success) {
                Swal.fire({
                    title: "Error!",
                    text: resp.message,
                    icon: "error",
                    timer: 3000
                });
            }
        }
    }

    const velvt = useReVerifyEmailLinkViaToken({ onSuccessCB: (resp) => callbackOnSuc_velvt(resp), onErrorCB: (resp) => callbackOnErr_velvt(resp), errorCB: (resp) => callbackErr_velvt(resp) });

    const handleTokenLink = () => {
        const gli = localStorage.getItem("Auth");
        if (gli) {
            const prsGli = JSON.parse(gli);
            velvt.mutate({ token: prsGli });
        }
    }

    const handleResendLink = () => {
        const gli = localStorage.getItem("Auth");
        if (gli) {
            setShowModal(true);
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
        //eslint-disable-next-line
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

            {/* Resend Link Modal */}
            <SiteDialog
                openState={showModal}
                setOpenState={setShowModal}
                modal_heading="Request Email Verification Link."
                hide_modal_on_backdrop_click={true}
                roundedModal={true}
                roundness="10px"
                modal_max_width={500}
            >
                <div className="p-[20px]">
                    <div className="block font-roboto_mono text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                        If you are existing user with correct email address without spelling mistakes and just want to get new verification link via email then please <NavLink to="#" title="Click Here" className="font-semibold underline underline-offset-2 font-poppins text-zinc-900 dark:text-zinc-200" onClick={handleTokenLink}>Click Here</NavLink>.
                        <div style={{ height: "10px" }}></div>
                        Or ...
                        <div style={{ height: "10px" }}></div>
                        If you did any mistakes while updating your email address then re-enter your email address to recieve verification link on correct email address.
                        <div style={{ height: "10px" }}></div>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="pb-[15px]">
                                <label
                                    htmlFor="ru_eml"
                                    className="font-poppins text-[14px] text-zinc-900 dark:text-zinc-200"
                                >
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="ru_eml"
                                    placeholder="test@example.com"
                                    {...register("email")}
                                    autoComplete="off"
                                />
                                {errors.email && (<div className="block mt-[2px] font-poppins text-[12px] text-red-600 dark:text-red-400">{errors.email?.message}</div>)}
                            </div>
                            <div className="flex items-center gap-x-[20px] justify-between">
                                {
                                    velvt.isPending ? (<Loader2 className="animate-spin text-zinc-800 dark:text-zinc-100" />) : (<div></div>)
                                }
                                <Button
                                    type="submit"
                                    title={isPending ? "Sending ..." : "Submit"}
                                    disabled={isPending}
                                >
                                    {
                                        isPending ?
                                            (<>
                                                <Loader2 className="animate-spin" />
                                                Sending ...
                                            </>)
                                            : ("Submit")
                                    }

                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </SiteDialog>
        </>
    )
};

export default LoginVerificationRedirect;
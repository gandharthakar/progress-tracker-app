import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SettingsNav from "@/components/user-area/settingsNav";
import { NavLink, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { userResetPasswordFormVS, userResetPasswordFormValidationSchema } from "@/zod/schemas/userAreaValidationSchemas";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import Swal from "sweetalert2";
import { useUpdatePasswordSettings } from "@/tanstack-query/mutations/user/userMutations";

const PasswordSettings = () => {

    const { user_id } = useParams();
    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [showConfPwd, setShowConfPwd] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<userResetPasswordFormVS>({
        resolver: zodResolver(userResetPasswordFormValidationSchema)
    });

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                });
                reset();
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
                    timer: 3000
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
                    timer: 3000
                });
            }
        }
    }

    const { mutate, isPending } = useUpdatePasswordSettings({ onSuccessCB: (resp) => callbackOnSuc(resp), errorCB: (resp) => callbackErr(resp), onErrorCB: (resp) => callbackOnErr(resp) });

    const handleFormSubmit: SubmitHandler<userResetPasswordFormVS> = (formdata) => {
        const glsi = localStorage.getItem("Auth");
        if (glsi) {
            const prs_glsi = JSON.parse(glsi);
            mutate({
                token: prs_glsi,
                user_password: formdata.password,
                confirm_user_password: formdata.confirmPassword
            });
        }
    }

    return (
        <>
            <div className="py-[25px] md:py-[50px] bg-theme-grey-1 dark:bg-zinc-900">
                <div className="site-container">
                    <div className="pb-[5px]">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <NavLink to={`/user/my-workspaces/${user_id}`} title="My Workspaces">
                                            My Workspaces
                                        </NavLink>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <NavLink to={`/user/settings/${user_id}`} title="Settings">
                                            Settings
                                        </NavLink>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Password</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <h1 className="font-poppins font-semibold text-[18px] md:text-[22px] text-zinc-900 dark:text-zinc-200">
                        Settings
                    </h1>
                </div>
            </div>

            <div className="py-[25px] md:py-[50px] min-h-[100vh] bg-white dark:bg-zinc-950">
                <div className="site-container">
                    <div className="flex flex-col mdl-1:flex-row gap-x-[30px] gap-y-[25px]">
                        <div className="w-full max-w-none min-w-[auto] mdl-1:max-w-[300px] mdl-1:min-w-[300px]">
                            <SettingsNav user_id={user_id ?? ""} />
                        </div>
                        <div className="w-full mdl-1:flex-1">
                            <div className="p-[20px] border border-solid border-zinc-200 dark:border-zinc-800 rounded-[7px]">
                                <div className="pb-[15px]">
                                    <h2 className="font-poppins text-[16px] md:text-[18px] font-semibold text-zinc-950 dark:text-zinc-100">
                                        Password Settings
                                    </h2>
                                </div>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="pb-[15px]">
                                        <label
                                            htmlFor="uu_pwd"
                                            className="font-poppins text-[14px] text-zinc-900 dark:text-zinc-200 inline-block pb-[5px]"
                                        >
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type={showPwd ? "text" : "password"}
                                                id="uu_pwd"
                                                className="pr-[45px]"
                                                {...register("password")}
                                                autoComplete="off"
                                            />
                                            {
                                                showPwd ?
                                                    (<EyeOff
                                                        size={16}
                                                        className="w-[16px] h-[16px] cursor-pointer text-zinc-900 dark:text-zinc-200 absolute top-[13px] right-[15px]"
                                                        onClick={() => setShowPwd(false)}
                                                    />)
                                                    :
                                                    (<Eye
                                                        size={16}
                                                        className="w-[16px] h-[16px] cursor-pointer text-zinc-900 dark:text-zinc-200 absolute top-[13px] right-[15px]"
                                                        onClick={() => setShowPwd(true)}
                                                    />)
                                            }
                                        </div>
                                        {errors.password && (<div className="block mt-[2px] font-poppins text-[12px] text-red-600 dark:text-red-400">{errors.password?.message}</div>)}
                                    </div>
                                    <div className="pb-[15px]">
                                        <label
                                            htmlFor="uu_cpwd"
                                            className="font-poppins text-[14px] text-zinc-900 dark:text-zinc-200 inline-block pb-[5px]"
                                        >
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type={showConfPwd ? "text" : "password"}
                                                id="uu_cpwd"
                                                {...register("confirmPassword")}
                                                autoComplete="off"
                                            />
                                            {
                                                showConfPwd ?
                                                    (<EyeOff
                                                        size={16}
                                                        className="w-[16px] h-[16px] cursor-pointer text-zinc-900 dark:text-zinc-200 absolute top-[13px] right-[15px]"
                                                        onClick={() => setShowConfPwd(false)}
                                                    />)
                                                    :
                                                    (<Eye
                                                        size={16}
                                                        className="w-[16px] h-[16px] cursor-pointer text-zinc-900 dark:text-zinc-200 absolute top-[13px] right-[15px]"
                                                        onClick={() => setShowConfPwd(true)}
                                                    />)
                                            }
                                        </div>
                                        {errors.confirmPassword && (<div className="block mt-[2px] font-poppins text-[12px] text-red-600 dark:text-red-400">{errors.confirmPassword?.message}</div>)}
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            type="submit"
                                            title={isPending ? "Updating ..." : "Update"}
                                            disabled={isPending}
                                        >
                                            {
                                                isPending ?
                                                    (<>
                                                        <Loader2 className="animate-spin" />
                                                        Updating ...
                                                    </>)
                                                    : ("Update")
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PasswordSettings;
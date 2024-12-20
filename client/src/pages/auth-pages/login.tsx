import SiteLogo from "@/components/siteLogo";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { userLoginFormVS, userLoginFormValidationSchema } from "@/zod/schemas/userAreaValidationSchemas";
import Swal from "sweetalert2";
import { CommonAPIResponseAuth, UserLoginTokenType } from "@/types/tanstack-query/auth/authTypes";
import { useLoginUser } from "@/tanstack-query/mutations/auth/authMutations";
import { jwtDecode } from "jwt-decode";

const Login = () => {

    const navigate = useNavigate();
    const [showPwd, setShowPwd] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<userLoginFormVS>({
        resolver: zodResolver(userLoginFormValidationSchema)
    });

    const callbackOnSuc = (resp: (CommonAPIResponseAuth | undefined)) => {
        if (resp) {
            if (resp.success) {
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 2000
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (resp.token) {
                            localStorage.setItem("Auth", JSON.stringify(resp.token));
                            const decodeToken: UserLoginTokenType = jwtDecode(resp.token ?? "");
                            const apt = setTimeout(() => {
                                navigate(`/user/my-workspaces/${decodeToken.user_id}`);
                                clearTimeout(apt);
                            }, 100);
                        }
                    }
                });
                reset();
                // Redirect to verification page.
                const st = setTimeout(() => {
                    if (resp.token) {
                        localStorage.setItem("Auth", JSON.stringify(resp.token));
                        const decodeToken: UserLoginTokenType = jwtDecode(resp.token ?? "");
                        const apt = setTimeout(() => {
                            navigate(`/user/my-workspaces/${decodeToken.user_id}`);
                            clearTimeout(apt);
                        }, 100);
                    }
                    clearTimeout(st);
                }, 2000);
            }
        }
    }

    const callbackOnErr = (resp: (CommonAPIResponseAuth | undefined)) => {
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

    const callbackErr = (resp: (CommonAPIResponseAuth | undefined)) => {
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

    const { mutate, isPending } = useLoginUser({ onSuccessCB: (resp) => callbackOnSuc(resp), errorCB: (resp) => callbackErr(resp), onErrorCB: (resp) => callbackOnErr(resp) });

    const handleFormSubmit: SubmitHandler<userLoginFormVS> = (formdata) => {
        mutate({
            user_email: formdata.email,
            user_password: formdata.password
        });
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-950 grid-bg py-[50px] px-[20px]">
                <div className="max-w-[400px] w-full">
                    <div className="w-full bg-white dark:bg-zinc-900 p-[20px] rounded-[10px] border border-solid border-zinc-300 dark:border-zinc-700">
                        <div className="pt-[10px] pb-[20px] text-center">
                            <div className="inline-block">
                                <NavLink to="/" title="Go to Home">
                                    <SiteLogo />
                                </NavLink>
                            </div>
                        </div>

                        <div className="pb-[20px]">
                            <div className="pb-[5px] text-center">
                                <h1 className="inline-block font-poppins font-bold text-[18px] md:text-[20px] text-zinc-800 dark:text-zinc-200">
                                    Login
                                </h1>
                            </div>
                            <div className="max-w-[250px] mx-auto text-center">
                                <p className="block font-roboto_mono text-[12px] text-zinc-700 dark:text-zinc-400">
                                    Please login with your credentials and track your progress.
                                </p>
                            </div>
                        </div>

                        <div className="max-w-[300px] mx-auto">
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
                                <div className="pb-[15px]">
                                    <label
                                        htmlFor="ru_pwd"
                                        className="font-poppins text-[14px] text-zinc-900 dark:text-zinc-200"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showPwd ? "text" : "password"}
                                            id="ru_pwd"
                                            className="pr-[50px]"
                                            {...register("password")}
                                            autoComplete="off"
                                        />
                                        <div className="absolute right-[10px] top-[6px] z-[5]">
                                            <button
                                                type="button"
                                                title={showPwd ? "Hide" : "Show"}
                                                className="font-poppins text-[12px] text-zinc-600 dark:text-zinc-400"
                                                onClick={() => setShowPwd(!showPwd)}
                                            >
                                                {showPwd ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.password && (<div className="block mt-[2px] font-poppins text-[12px] text-red-600 dark:text-red-400">{errors.password?.message}</div>)}
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        title={isPending ? "Please Wait ..." : "Login"}
                                        className="w-full text-center"
                                        disabled={isPending}
                                    >
                                        {
                                            isPending ?
                                                (<>
                                                    <Loader2 className="animate-spin" />
                                                    Please wait ...
                                                </>)
                                                : ("Login")
                                        }

                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="pt-[15px] text-center">
                        <p className="font-poppins text-[12px] text-zinc-600 dark:text-zinc-400">
                            Don't have an account ? <NavLink to="/auth/register" title="Please Register" className="underline text-zinc-900 dark:text-zinc-200">Please Register</NavLink>
                        </p>
                    </div>
                    <div className="pt-[15px] text-center">
                        <p className="font-poppins text-[12px] text-zinc-600 dark:text-zinc-400">
                            <NavLink to="/auth/forgot-password" title="Forgot your password ?" className="underline text-zinc-900 dark:text-zinc-200">Forgot your password ?</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;
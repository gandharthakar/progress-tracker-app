import SiteLogo from "@/components/siteLogo";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { userForgotPasswordFormVS, userForgotPasswordFormValidationSchema } from "@/zod/schemas/userAreaValidationSchemas";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import Swal from "sweetalert2";
import { useForgotPassword } from "@/tanstack-query/mutations/auth/authMutations";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<userForgotPasswordFormVS>({
        resolver: zodResolver(userForgotPasswordFormValidationSchema)
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
                        navigate(`/auth/login`);
                    }
                });
                reset();
                // Redirect to login page.
                const st = setTimeout(() => {
                    navigate(`/auth/login`);
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

    const { mutate, isPending } = useForgotPassword({ onSuccessCB: (resp) => callbackOnSuc(resp), errorCB: (resp) => callbackErr(resp), onErrorCB: (resp) => callbackOnErr(resp) });

    const handleFormSubmit: SubmitHandler<userForgotPasswordFormVS> = (formdata) => {
        mutate({
            user_email: formdata.email
        })
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
                                    Forgot Password
                                </h1>
                            </div>
                            <div className="max-w-[250px] mx-auto text-center">
                                <p className="block font-roboto_mono text-[12px] text-zinc-700 dark:text-zinc-400">
                                    Please enter email for reset password link.
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
                                <div>
                                    <Button
                                        type="submit"
                                        title={isPending ? "Please Wait ..." : "Submit"}
                                        className="w-full text-center"
                                        disabled={isPending}
                                    >
                                        {
                                            isPending ?
                                                (<>
                                                    <Loader2 className="animate-spin" />
                                                    Please wait ...
                                                </>)
                                                : ("Submit")
                                        }
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="pt-[15px] text-center">
                        <p className="font-poppins text-[12px] text-zinc-600 dark:text-zinc-400">
                            <NavLink to="/auth/login" title="Back to login" className="underline text-zinc-900 dark:text-zinc-200">Back to login</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ForgotPassword;
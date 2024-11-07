import SiteLogo from "@/components/siteLogo";
import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

const ResetPassword = () => {

    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [showConfPwd, setShowConfPwd] = useState<boolean>(false);
    const isLoading = false;

    const validationSchema = z.object({
        password: z.string({
            invalid_type_error: "Password must be in string format."
        }).min(8).max(16),

        confirmPassword: z.string({
            invalid_type_error: "Confirm password must be in string format."
        }).min(8).max(16)

    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Your password didn't match."
    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema)
    });

    const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
        console.log(formdata);
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
                                    Reset Password
                                </h1>
                            </div>
                            <div className="max-w-[250px] mx-auto text-center">
                                <p className="block font-roboto_mono text-[12px] text-zinc-700 dark:text-zinc-400">
                                    Enter new password to set new password for your account.
                                </p>
                            </div>
                        </div>

                        <div className="max-w-[300px] mx-auto">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                                    {errors.password && (<div className="block mt-[2px] font-poppins text-[12px] text-red-600">{errors.password?.message}</div>)}
                                </div>
                                <div className="pb-[15px]">
                                    <label
                                        htmlFor="ru_conf_pwd"
                                        className="font-poppins text-[14px] text-zinc-900 dark:text-zinc-200"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showConfPwd ? "text" : "password"}
                                            id="ru_conf_pwd"
                                            className="pr-[50px]"
                                            {...register("confirmPassword")}
                                        />
                                        <div className="absolute right-[10px] top-[6px] z-[5]">
                                            <button
                                                type="button"
                                                title={showConfPwd ? "Hide" : "Show"}
                                                className="font-poppins text-[12px] text-zinc-600 dark:text-zinc-400"
                                                onClick={() => setShowConfPwd(!showConfPwd)}
                                            >
                                                {showConfPwd ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.confirmPassword && (<div className="block mt-[2px] font-poppins text-[12px] text-red-600">{errors.confirmPassword?.message}</div>)}
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        title={isLoading ? "Please Wait ..." : "Submit"}
                                        className="w-full text-center"
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading ?
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
                </div>
            </div>
        </>
    )
};

export default ResetPassword;
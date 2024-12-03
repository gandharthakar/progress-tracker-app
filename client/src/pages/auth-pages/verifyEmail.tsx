import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import SiteLogo from "@/components/siteLogo";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { useVerifyUserEmail } from "@/tenstack-query/mutations/auth/authMutations";
import { CommonAPIResponse } from "@/types/tenstack-query/commonTypes";
import Swal from "sweetalert2";

const VerifyEmail = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const FormSchema = z.object({
        otp: z.string().min(6, {
            message: "Your one-time password must be 6 characters.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otp: "",
        },
    })

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 2000
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/auth/login`);
                    }
                });
                form.reset();
                // Redirect to verification page.
                const st = setTimeout(() => {
                    navigate(`/auth/login`);
                    clearTimeout(st);
                }, 2000);
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

    const { mutate, isPending } = useVerifyUserEmail({ onSuccessCB: (resp) => callbackOnSuc(resp), errorCB: (resp) => callbackErr(resp), onErrorCB: (resp) => callbackOnErr(resp) });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (token) {
            const prepData = {
                token,
                otp: data.otp
            }
            mutate(prepData);
        }
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
                                    Verify Email Address
                                </h1>
                            </div>
                            <div className="max-w-[250px] mx-auto text-center">
                                <p className="block font-roboto_mono text-[12px] text-zinc-700 dark:text-zinc-400">
                                    Please enter the OTP sent to your email.
                                </p>
                            </div>
                        </div>

                        <div className="max-w-[300px] mx-auto">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="otp"
                                        render={({ field }) => (
                                            <FormItem className="text-center">
                                                <FormLabel className="text-[14px] text-zinc-800 dark:text-zinc-200">One-Time Password</FormLabel>
                                                <div className="inline-block pb-[15px]">
                                                    <FormControl>
                                                        <InputOTP maxLength={6} {...field}>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot className="border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-zinc-300" index={0} />
                                                                <InputOTPSlot className="border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-zinc-300" index={1} />
                                                                <InputOTPSlot className="border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-zinc-300" index={2} />
                                                                <InputOTPSlot className="border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-zinc-300" index={3} />
                                                                <InputOTPSlot className="border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-zinc-300" index={4} />
                                                                <InputOTPSlot className="border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-zinc-300" index={5} />
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="text-red-600 dark:text-red-400 !m-0 text-[12px] pb-[15px]" />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="text-center pb-[10px]">
                                        <Button
                                            type="submit"
                                            title={isPending ? "Verifying ..." : "Verify"}
                                            disabled={isPending}
                                        >
                                            {
                                                isPending ?
                                                    (<>
                                                        <Loader2 className="animate-spin" />
                                                        Verifying ...
                                                    </>)
                                                    : ("Verify")
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default VerifyEmail;
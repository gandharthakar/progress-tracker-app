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
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateUserGeneralSettingsFormVS, updateUserGeneralSettingsFormValidationSchema } from "@/zod/schemas/userAreaValidationSchemas";

const GeneralSettings = () => {

    const { user_id } = useParams();
    const isLoading = false;

    const { register, handleSubmit, formState: { errors } } = useForm<updateUserGeneralSettingsFormVS>({
        resolver: zodResolver(updateUserGeneralSettingsFormValidationSchema)
    });

    const handleFormSubmit: SubmitHandler<updateUserGeneralSettingsFormVS> = (formdata) => {
        console.log(formdata);
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
                                    <BreadcrumbPage>Settings</BreadcrumbPage>
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
                                        General Settings
                                    </h2>
                                </div>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="pb-[15px]">
                                        <label
                                            htmlFor="uu_flnm"
                                            className="font-poppins text-[14px] text-zinc-900 dark:text-zinc-200 inline-block pb-[5px]"
                                        >
                                            Full Name
                                        </label>
                                        <Input
                                            type="text"
                                            id="uu_flnm"
                                            placeholder="Peter John"
                                            {...register("fullName")}
                                        />
                                        {errors.fullName && (<div className="block mt-[2px] font-poppins text-[12px] text-red-600 dark:text-red-400">{errors.fullName.message}</div>)}
                                    </div>
                                    <div className="pb-[15px]">
                                        <label
                                            htmlFor="uu_eml"
                                            className="font-poppins text-[14px] text-zinc-900 dark:text-zinc-200 inline-block pb-[5px]"
                                        >
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            id="uu_eml"
                                            placeholder="example@test.com"
                                            {...register("email")}
                                        />
                                        {errors.email && (<div className="block mt-[2px] font-poppins text-[12px] text-red-600 dark:text-red-400">{errors.email.message}</div>)}
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            type="submit"
                                            title={isLoading ? "Updating ..." : "Update"}
                                            disabled={isLoading}
                                        >
                                            {
                                                isLoading ?
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

export default GeneralSettings;
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
import { Loader2, TriangleAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateUserGeneralSettingsFormVS, updateUserGeneralSettingsFormValidationSchema } from "@/zod/schemas/userAreaValidationSchemas";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import SiteDialog from "@/components/SiteDialog";

const GeneralSettings = () => {

    const { user_id } = useParams();
    const isLoading = false;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEmlWilChng, setIsEmlWilChng] = useState<boolean>(true);

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
                                        <div className="relative">
                                            <Input
                                                type="email"
                                                id="uu_eml"
                                                placeholder="example@test.com"
                                                {...register("email")}
                                                className="read-only:bg-theme-grey-1 read-only:!ring-0 dark:read-only:bg-zinc-900 pr-[75px]"
                                                readOnly={isEmlWilChng}
                                            />
                                            <div className="absolute right-[15px] top-[9.5px] z-[5]">
                                                <button
                                                    type="button"
                                                    title="Change"
                                                    className="uppercase inline-block font-roboto_mono font-bold text-[13px] text-zinc-900 dark:text-zinc-50"
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    <div className="flex gap-x-[5px] items-center">
                                                        <CiEdit size={18} className="w-[18px] h-[18px]" />
                                                        <div className="underline underline-offset-2">
                                                            Change
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
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

            {/* Change Email Warning - Modal */}
            <SiteDialog
                openState={showModal}
                setOpenState={setShowModal}
                modal_heading="Change Email"
                hide_modal_on_backdrop_click={true}
                roundedModal={true}
                roundness="10px"
                modal_max_width={500}
            >
                <div className="pt-[20px] pb-[10px] md:pt-[25px] md:pb-[15px] text-center">
                    <TriangleAlert size={50} className="inline-block text-orange-400 w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />
                </div>
                <div className="pb-[5px] text-center">
                    <h1 className="inline-block font-poppins font-bold text-[18px] md:text-[20px] text-zinc-950 dark:text-zinc-100">
                        Attention
                    </h1>
                </div>
                <div className="pb-[15px] px-[20px] text-center max-w-[450px] mx-auto">
                    <p className="inline-block font-roboto_mono text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                        If you plan to change the email address then you need to re-verify yourself first via email just like before you registered to make continue use of our services. You will receive OTP & Verification link on your newly updated email address. after clicking "update" button system will get automatically logout and you can able to login again only after you re-verify yourself.
                        <br /> <br />
                        Thank You.
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-[15px] gap-y-[10px] pb-[25px]">
                    <Button
                        title="Yes"
                        type="button"
                        onClick={() => { setIsEmlWilChng(false); setShowModal(false); }}
                    >
                        Yes
                    </Button>
                    <Button
                        title="No"
                        variant={"secondary"}
                        onClick={() => setShowModal(false)}
                    >
                        No
                    </Button>
                </div>
            </SiteDialog>
        </>
    )
};

export default GeneralSettings;
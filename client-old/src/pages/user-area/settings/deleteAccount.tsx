import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SettingsNav from "@/components/user-area/settingsNav";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteDialog from "@/components/SiteDialog";
import { useState } from "react";
import { Loader2, TriangleAlert } from "lucide-react";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import Swal from "sweetalert2";
import { useDeleteAccount } from "@/tanstack-query/mutations/auth/authMutations";

const DeleteAccount = () => {

    const { user_id } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                const st = setTimeout(() => {
                    setOpen(false);
                    localStorage.removeItem("Auth");
                    navigate("/");
                    clearTimeout(st);
                }, 6000);
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 6000
                }).then(result => {
                    if (result.isConfirmed) {
                        setOpen(false);
                        localStorage.removeItem("Auth");
                        navigate("/");
                        clearTimeout(st);
                    }
                });
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
                    timer: 4000
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
                    timer: 4000
                });
            }
        }
    }

    const { mutate, isPending } = useDeleteAccount({
        onSuccessCB: (resp) => callbackOnSuc(resp),
        onErrorCB: (resp) => callbackOnErr(resp),
        errorCB: (resp) => callbackErr(resp),
    });

    const handleDelAccountButtonClick = () => {
        const gtCo = localStorage.getItem("Auth");
        if (gtCo) {
            const prsGtCo = JSON.parse(gtCo);
            mutate({ token: prsGtCo });
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
                                    <BreadcrumbPage>Delete Account</BreadcrumbPage>
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
                                <div className="pb-[8px]">
                                    <h2 className="font-poppins text-[16px] md:text-[18px] font-semibold text-zinc-950 dark:text-zinc-100">
                                        Delete Account
                                    </h2>
                                </div>
                                <div className="max-w-[700px]">
                                    <div className="pb-[20px]">
                                        <p className="font-roboto_mono block text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                                            If you wish or choose this option then remember you will loose everything you created like your workspaces, labels, tasks & sections.
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        title="Delete Account"
                                        variant="destructive"
                                        onClick={() => setOpen(true)}
                                    >
                                        Delete Account
                                    </Button>

                                    {/* Delete Account Modal */}
                                    <SiteDialog
                                        openState={open}
                                        setOpenState={setOpen}
                                        modal_heading="Delete Account"
                                        hide_modal_on_backdrop_click={true}
                                        roundedModal={true}
                                        roundness="10px"
                                        modal_max_width={450}
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
                                            <p className="inline-block font-roboto_mono text-[14px] md:text-[16px] text-zinc-600 dark:text-zinc-400">
                                                This action cannot be undone because this is destructive action. This will permanently delete your
                                                account and remove your data from our servers.
                                            </p>
                                        </div>
                                        <div className="flex justify-center items-center gap-x-[15px] gap-y-[10px] pb-[25px]">
                                            <Button
                                                title={isPending ? "wait ..." : "Yes"}
                                                type="button"
                                                disabled={isPending}
                                                onClick={handleDelAccountButtonClick}
                                            >
                                                {
                                                    isPending ?
                                                        (<>
                                                            <Loader2 className="animate-spin" />
                                                            wait ...
                                                        </>)
                                                        : ("Yes")
                                                }
                                            </Button>
                                            <Button
                                                title="No"
                                                variant={"secondary"}
                                                onClick={() => setOpen(false)}
                                            >
                                                No
                                            </Button>
                                        </div>
                                    </SiteDialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DeleteAccount;
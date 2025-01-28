import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader2, Pencil, Trash2, TriangleAlert } from "lucide-react";
import Swal from "sweetalert2";
import { sectionFormValidationSchema, sectionFormVS } from "@/zod/schemas/userPlayGround";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { convertToSlug } from "@/utils/helperFunctions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SiteDialog from "@/components/SiteDialog";
import { sectionActionType } from "@/types/componentsTypes";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import { useDeleteSection, useUpdateSection } from "@/tanstack-query/mutations/sections/sectionsMutations";

const SectionActions = (props: sectionActionType) => {

    const { section_id, section_title, sectionIndex, workspace_id, selected_tasks } = props;

    const [isSectionModalShown, setIsSectionModalShown] = useState<boolean>(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState<boolean>(false);

    const callbackOnSuc_del = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                const st = setTimeout(() => {
                    setIsDeleteModalShown(false);
                    clearTimeout(st);
                }, 4000);
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                }).then(result => {
                    if (result.isConfirmed) {
                        setIsDeleteModalShown(false);
                        clearTimeout(st);
                    }
                });
            }
        }
    }

    const callbackOnErr_del = (resp: (CommonAPIResponse | undefined)) => {
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

    const callbackErr_del = (resp: (CommonAPIResponse | undefined)) => {
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

    const delSects = useDeleteSection({
        onSuccessCB: (resp) => callbackOnSuc_del(resp),
        onErrorCB: (resp) => callbackOnErr_del(resp),
        errorCB: (resp) => callbackErr_del(resp),
        workspace_id
    });

    const handleDeleteSection = () => {
        const guifls = localStorage.getItem("Auth");
        if (guifls) {
            const prs_guifls = JSON.parse(guifls);
            const sendData = {
                section_id,
                workspace_id,
                sectionIndex: sectionIndex.toString(),
                user_id: prs_guifls,
                selected_tasks
            }
            delSects.mutate(sendData);
        }
    }

    // Update Sections Modal Form Handling.
    const rhfUpdateSection = useForm<sectionFormVS>({
        resolver: zodResolver(sectionFormValidationSchema),
    });

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                const st = setTimeout(() => {
                    rhfUpdateSection.reset();
                    setIsSectionModalShown(false);
                    clearTimeout(st);
                }, 4000);
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                }).then(result => {
                    if (result.isConfirmed) {
                        rhfUpdateSection.reset();
                        setIsSectionModalShown(false);
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

    const updSects = useUpdateSection({
        onSuccessCB: (resp) => callbackOnSuc(resp),
        onErrorCB: (resp) => callbackOnErr(resp),
        errorCB: (resp) => callbackErr(resp),
        workspace_id
    });

    const HFS_UpdateSection: SubmitHandler<sectionFormVS> = (formData) => {
        const guifls = localStorage.getItem("Auth");
        if (guifls) {
            const prs_guifls = JSON.parse(guifls);
            const sendData = {
                section_id,
                section_title: formData.sectionName,
                section_value: convertToSlug(formData.sectionName),
                sectionIndex: sectionIndex.toString(),
                workspace_id,
                user_id: prs_guifls
            }
            updSects.mutate(sendData);
        }
    }

    useEffect(() => {
        rhfUpdateSection.setValue("sectionName", section_title);
        //eslint-disable-next-line
    }, [section_title, setIsSectionModalShown]);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={true} className="cursor-pointer">
                    <button
                        title="Menu"
                        type="button"
                        className="text-zinc-600 dark:text-zinc-400"
                    >
                        <EllipsisVertical size={15} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuItem
                        title="Edit"
                        className="py-[10px] cursor-pointer"
                        onClick={() => setIsSectionModalShown(true)}
                    >
                        <Pencil size={16} />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        title="Delete"
                        className="py-[10px] cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                        onClick={() => setIsDeleteModalShown(true)}
                    >
                        <Trash2 size={16} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Update Section Modal */}
            <SiteDialog
                openState={isSectionModalShown}
                setOpenState={setIsSectionModalShown}
                modal_heading="Update Section"
                hide_modal_on_backdrop_click={true}
                roundedModal={true}
                roundness="10px"
                modal_max_width={450}
            >
                <div className="py-[20px] px-[20px]">
                    <form onSubmit={rhfUpdateSection.handleSubmit(HFS_UpdateSection)}>
                        <div className="pb-[15px]">
                            <label
                                htmlFor="sec_ttl"
                                className="inline-block mb-[5px] font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200"
                            >
                                Section Name
                            </label>
                            <Input
                                type="text"
                                id="sec_ttl"
                                placeholder="eg. Frontend"
                                {...rhfUpdateSection.register("sectionName")}
                                autoComplete="off"
                            />
                            {rhfUpdateSection.formState.errors.sectionName && (<div className="block mt-[5px] font-poppins text-[12px] text-red-600 dark:text-red-400">{rhfUpdateSection.formState.errors.sectionName.message}</div>)}
                        </div>
                        <div className="text-right">
                            <Button
                                title={updSects.isPending ? "Updating ..." : "Update"}
                                type="submit"
                                disabled={updSects.isPending}
                            >
                                {
                                    updSects.isPending ?
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
            </SiteDialog>

            {/* Delete Section Modal Confirmation */}
            <SiteDialog
                openState={isDeleteModalShown}
                setOpenState={setIsDeleteModalShown}
                modal_heading="Delete Section"
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
                    <p className="inline-block font-roboto_mono text-[14px] md:text-[16px] text-zinc-600 dark:text-zinc-400">
                        If you delete this section then it will delete all your related task which belongs to this section. Are you sure want to delete this section ?
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-[15px] gap-y-[10px] pb-[25px]">
                    <Button
                        title={delSects.isPending ? "wait ..." : "Yes"}
                        type="button"
                        disabled={delSects.isPending}
                        onClick={handleDeleteSection}
                    >
                        {
                            delSects.isPending ?
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
                        onClick={() => setIsDeleteModalShown(false)}
                    >
                        No
                    </Button>
                </div>
            </SiteDialog>
        </>
    )
};

export default SectionActions;
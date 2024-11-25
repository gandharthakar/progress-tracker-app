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
import { useState } from "react";
import { convertToSlug } from "@/utils/helperFunctions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SiteDialog from "@/components/SiteDialog";

const SectionActions = (props: { section_id: string, section_title: string, }) => {

    const { section_id, section_title } = props;
    const isLoading = false;

    const [isSectionModalShown, setIsSectionModalShown] = useState<boolean>(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState<boolean>(false);

    const handleDeleteSection = () => {
        setIsDeleteModalShown(false);
        Swal.fire({
            title: "Success!",
            text: "... Successfully !",
            icon: "success",
            timer: 2000
        });
    }

    // Update Sections Modal Form Handling.
    const rhfAddSection = useForm<sectionFormVS>({
        resolver: zodResolver(sectionFormValidationSchema),
        defaultValues: {
            sectionName: section_title
        }
    });

    const HFS_addSection: SubmitHandler<sectionFormVS> = (formData) => {
        const sendData = {
            section_id,
            section_name: formData.sectionName,
            section_value: convertToSlug(formData.sectionName),
        }
        console.log(sendData);
        rhfAddSection.reset();
        setIsSectionModalShown(false);
        Swal.fire({
            title: "Success!",
            text: "... Successfully !",
            icon: "success",
            timer: 2000
        });
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
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
                    <form onSubmit={rhfAddSection.handleSubmit(HFS_addSection)}>
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
                                {...rhfAddSection.register("sectionName")}
                            />
                            {rhfAddSection.formState.errors.sectionName && (<div className="block mt-[5px] font-poppins text-[12px] text-red-600 dark:text-red-400">{rhfAddSection.formState.errors.sectionName.message}</div>)}
                        </div>
                        <div className="text-right">
                            <Button
                                title={isLoading ? "Creating ..." : "Create"}
                                type="submit"
                                disabled={isLoading}
                            >
                                {
                                    isLoading ?
                                        (<>
                                            <Loader2 className="animate-spin" />
                                            Creating ...
                                        </>)
                                        : ("Create")
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
                        title={isLoading ? "wait ..." : "Yes"}
                        type="button"
                        disabled={isLoading}
                        onClick={handleDeleteSection}
                    >
                        {
                            isLoading ?
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
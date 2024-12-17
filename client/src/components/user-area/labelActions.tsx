import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader2, Pencil, Trash2, TriangleAlert } from "lucide-react";
import Swal from "sweetalert2";
import { labelFormValidationSchema, labelFormVS } from "@/zod/schemas/userPlayGround";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { convertToSlug } from "@/utils/helperFunctions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SiteDialog from "@/components/SiteDialog";
import { labelActionsType } from "@/types/componentsTypes";

const LabelActions = (props: labelActionsType) => {

    const { label_id, label_title, workspace_id } = props;
    const isPending = false;
    const [isLabelDeleteModalShown, setIsLabelDeleteModalShown] = useState<boolean>(false);
    const [isLabelModalShown, setIsLabelModalShown] = useState<boolean>(false);

    const handleDeleteLable = () => {
        const guifls = localStorage.getItem("Auth");
        if (guifls) {
            const prs_guifls = JSON.parse(guifls);
            const sendData = {
                label_id,
                workspace_id,
                user_id: prs_guifls
            }
            console.log(sendData);
            setIsLabelDeleteModalShown(false);
        }
    }

    // Update Label Modal Form Handling.
    const rhfUpdateLabel = useForm<labelFormVS>({
        resolver: zodResolver(labelFormValidationSchema),
        defaultValues: {
            labelTitle: label_title
        }
    });

    const HFS_UpdateLabel: SubmitHandler<labelFormVS> = (formData) => {
        const guifls = localStorage.getItem("Auth");
        if (guifls) {
            const prs_guifls = JSON.parse(guifls);
            const sendData = {
                label_id,
                label_title: formData.labelTitle,
                label_value: convertToSlug(formData.labelTitle),
                workspace_id,
                user_id: prs_guifls
            }
            console.log(sendData);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
                    <button
                        title="Menu"
                        type="button"
                    >
                        <EllipsisVertical size={15} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuItem
                        title="Edit"
                        className="py-[10px] cursor-pointer"
                        onClick={() => setIsLabelModalShown(true)}
                    >
                        <Pencil size={16} />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        title="Delete"
                        className="py-[10px] cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                        onClick={() => setIsLabelDeleteModalShown(true)}
                    >
                        <Trash2 size={16} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Update Label Modal */}
            <SiteDialog
                openState={isLabelModalShown}
                setOpenState={setIsLabelModalShown}
                modal_heading="Update Label"
                hide_modal_on_backdrop_click={true}
                roundedModal={true}
                roundness="10px"
                modal_max_width={450}
            >
                <div className="py-[20px] px-[20px]">
                    <form onSubmit={rhfUpdateLabel.handleSubmit(HFS_UpdateLabel)}>
                        <div className="pb-[15px]">
                            <label
                                htmlFor="lbl_ttl"
                                className="inline-block mb-[5px] font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200"
                            >
                                Label Title
                            </label>
                            <Input
                                type="text"
                                id="lbl_ttl"
                                placeholder="eg. Basic"
                                {...rhfUpdateLabel.register("labelTitle")}
                            />
                            {rhfUpdateLabel.formState.errors.labelTitle && (<div className="block mt-[5px] font-poppins text-[12px] text-red-600 dark:text-red-400">{rhfUpdateLabel.formState.errors.labelTitle.message}</div>)}
                        </div>
                        <div className="text-right">
                            <Button
                                title={isPending ? "Creating ..." : "Create"}
                                type="submit"
                                disabled={isPending}
                            >
                                {
                                    isPending ?
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

            {/* Delete Label Modal */}
            <SiteDialog
                openState={isLabelDeleteModalShown}
                setOpenState={setIsLabelDeleteModalShown}
                modal_heading="Delete Label"
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
                        Are you sure want to delete this label ?
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-[15px] gap-y-[10px] pb-[25px]">
                    <Button
                        title={isPending ? "wait ..." : "Yes"}
                        type="button"
                        disabled={isPending}
                        onClick={handleDeleteLable}
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
                        onClick={() => setIsLabelDeleteModalShown(false)}
                    >
                        No
                    </Button>
                </div>
            </SiteDialog>
        </>
    )
};

export default LabelActions;
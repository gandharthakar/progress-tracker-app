import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader2, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { labelFormValidationSchema, labelFormVS } from "@/zod/schemas/userPlayGround";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { convertToSlug } from "@/utils/helperFunctions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SiteDialog from "./SiteDialog";

const LabelActions = (props: { label_id: string, label_title: string }) => {

    const { label_id, label_title } = props;
    const isLoading = false;
    const [isLabelModalShown, setIsLabelModalShown] = useState<boolean>(false);

    const handleDeleteLable = () => {
        const conf = confirm("Are you sure want to delete this lable ?");
        if (conf) {
            Swal.fire({
                title: "Success!",
                text: "... Successfully !",
                icon: "success",
                timer: 2000
            });
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
        const sendData = {
            label_id,
            label_title: formData.labelTitle,
            label_value: convertToSlug(formData.labelTitle)
        }
        console.log(sendData);
        setIsLabelModalShown(false);
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
                        onClick={handleDeleteLable}
                    >
                        <Trash2 size={16} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Add New Label Modal */}
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
        </>
    )
};

export default LabelActions;
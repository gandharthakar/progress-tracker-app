import { SiteWorkspaceCompProps } from "@/types/componentsTypes";
import { Box, EllipsisVertical, Loader2, Pencil, Trash2, TriangleAlert } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SiteDialog from "./SiteDialog";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { workspaceFormVS, workspaceFormValidationSchema } from "@/zod/schemas/userWorkspace";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Swal from 'sweetalert2';

const WorkspaceBox = (props: SiteWorkspaceCompProps) => {

    const {
        workspace_id,
        workspace_title,
        workspace_description,
        user_id
    } = props;

    const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState<boolean>(false);
    const [workspaceDscr, setWorkspaceDscr] = useState<string>(workspace_description);
    const isLoading = false;

    const { register, handleSubmit, formState: { errors } } = useForm<workspaceFormVS>({
        resolver: zodResolver(workspaceFormValidationSchema),
        defaultValues: {
            workspaceName: workspace_title
        }
    });

    const handleDelete = () => {
        setIsDeleteModalShown(false);
        Swal.fire({
            title: "Success!",
            text: "Workspace Deleted Successfully !",
            icon: "success",
            timer: 2000
        });
    }

    const handleFormSubmit: SubmitHandler<workspaceFormVS> = (formdata) => {
        let data = {
            workspace_name: formdata.workspaceName,
            workspace_description: workspaceDscr
        }
        console.log(data);
    }

    return (
        <>
            <div
                className="border border-solid rounded-[7px] p-[15px] border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            >
                <div>
                    <NavLink title={workspace_title} to={`/user/workspace/${workspace_id}/${user_id}`}>
                        <div className="border border-solid border-zinc-200 dark:border-zinc-600 py-[50px] md:py-[60px] text-center text-zinc-300 dark:text-zinc-700">
                            <Box size={60} className="inline-block w-[40px] h-[40px] md:w-[60px] md:h-[60px]" />
                        </div>
                    </NavLink>
                    <div className="pt-[15px]">
                        <div className="flex items-start gap-x-[15px]">
                            <div className="w-[calc(100%-25px)]">
                                <div className="overflow-hidden max-w-[100%]">
                                    <h2 className="block whitespace-nowrap font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200 text-ellipsis overflow-hidden">
                                        <NavLink title={workspace_title} to={`/user/workspace/${workspace_id}/${user_id}`}>
                                            {workspace_title}
                                        </NavLink>
                                    </h2>
                                    {workspace_description && (<p className="block whitespace-nowrap font-roboto_mono text-[12px] text-zinc-600 dark:text-zinc-300 text-ellipsis overflow-hidden">
                                        {workspace_description}
                                    </p>)}
                                </div>
                            </div>
                            <div className="h-[15px]">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild={true}>
                                        <button
                                            title="Menu"
                                            type="button"
                                            className="text-zinc-800 dark:text-zinc-400"
                                        >
                                            <EllipsisVertical size={15} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[150px]">
                                        <DropdownMenuItem
                                            title="Edit"
                                            className="py-[10px] cursor-pointer"
                                            onClick={() => setIsEditModalShown(true)}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Workspace */}
            <SiteDialog
                openState={isEditModalShown}
                setOpenState={setIsEditModalShown}
                modal_heading="Edit Workspace"
                hide_modal_on_backdrop_click={true}
                roundedModal={true}
                roundness="10px"
                modal_max_width={400}
            >
                <form className="p-[20px]" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="pb-[15px]">
                        <label
                            htmlFor="cnw_name"
                            className="inline-block mb-[5px] font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200"
                        >
                            Workspace Name <span className="text-red-600 dark:text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            id="cnw_name"
                            placeholder="eg. Full Stack Development"
                            {...register("workspaceName")}
                        />
                        {errors.workspaceName && (<div className="block mt-[5px] font-poppins text-[12px] text-red-600 dark:text-red-400">{errors.workspaceName?.message}</div>)}
                    </div>
                    <div className="pb-[15px]">
                        <label
                            htmlFor="cnw_dscr"
                            className="inline-block mb-[5px] font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200"
                        >
                            Description <span className="font-normal text-[10px]">(Optional)</span>
                        </label>
                        <Input
                            type="text"
                            id="cnw_dscr"
                            value={workspaceDscr}
                            onChange={(e) => setWorkspaceDscr(e.target.value)}
                        />
                    </div>
                    <div className="text-right">
                        <Button
                            title={isLoading ? "Updating ..." : "Update"}
                            type="submit"
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
            </SiteDialog>

            {/* Delete Workspace */}
            <SiteDialog
                openState={isDeleteModalShown}
                setOpenState={setIsDeleteModalShown}
                modal_heading="Delete Workspace"
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
                        If you delete this workspace then it will delete all yours sections, tasks & labels you created. You will loose everything that you created earlier.
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-[15px] gap-y-[10px] pb-[25px]">
                    <Button
                        title={isLoading ? "wait ..." : "Yes"}
                        type="button"
                        disabled={isLoading}
                        onClick={handleDelete}
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

export default WorkspaceBox;
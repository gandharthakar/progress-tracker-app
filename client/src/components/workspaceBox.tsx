import { SiteWorkspaceCompProps } from "@/types/componentsTypes";
import { Box, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const WorkspaceBox = (props: SiteWorkspaceCompProps) => {

    const {
        workspace_id,
        workspace_title,
        workspace_description,
        user_id
    } = props;

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
                                        <DropdownMenuItem title="Edit" className="py-[10px] cursor-pointer">
                                            <Pencil size={16} />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem title="Delete" className="py-[10px] cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400">
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
        </>
    )
};

export default WorkspaceBox;
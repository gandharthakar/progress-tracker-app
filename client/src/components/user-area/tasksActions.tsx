import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown, EllipsisVertical, Loader2, Pencil, Trash2, TriangleAlert } from "lucide-react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SiteDialog from "@/components/SiteDialog";
import { sectionApiType, sectionType, taskComboboxType, taskType } from "@/types/playGroundTypes";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import { useDeleteTask, useUpdateTask } from "@/tanstack-query/mutations/tasks/tasksMutations";

const TasksActions = (props: (taskType & sectionType & { sections: sectionApiType[], taskIndex: number, workspace_id: string })) => {

    const { task_id, task_title, taskIndex, section_title, section_id, section_value, sections, workspace_id } = props;

    const [isTaskDeleteModalShown, setIsDeleteTaskModalShown] = useState<boolean>(false);
    const [isTaskModalShown, setIsTaskModalShown] = useState<boolean>(false);

    const callbackOnSuc_del = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                const st = setTimeout(() => {
                    setIsDeleteTaskModalShown(false);
                    clearTimeout(st);
                }, 4000);
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                }).then(result => {
                    if (result.isConfirmed) {
                        setIsDeleteTaskModalShown(false);
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

    const delTasks = useDeleteTask({
        onSuccessCB: (resp) => callbackOnSuc_del(resp),
        onErrorCB: (resp) => callbackOnErr_del(resp),
        errorCB: (resp) => callbackErr_del(resp),
        workspace_id
    });

    const handleDeleteTask = () => {
        const guifls = localStorage.getItem("Auth");
        if (guifls) {
            const prs_guifls = JSON.parse(guifls);
            const prepData = {
                task_id: task_id ?? "",
                section_id,
                workspace_id,
                user_id: prs_guifls
            }
            delTasks.mutate(prepData);
        }
    }

    // Update task Modal Form Handling.
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskTitleInputError, setTaskTitleInputError] = useState<string>("");
    const [selSectionError, setSelSectionError] = useState<string>("");

    const [sectionList, setSectionList] = useState<taskComboboxType[]>([]);
    const [sectionListOpen, setSectionListOpen] = useState<boolean>(false);
    const [sectionListValue, setSectionListValue] = useState<string>("");
    const [sectionListBL, setSectionListBL] = useState<string>("");
    const [sectionListID, setSectionListID] = useState<string>("");

    const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value == '') {
            setTaskTitleInputError("Please enter task title.");
        } else {
            if (value.length < 2) {
                setTaskTitleInputError("Task title must be contains at least 2 characters.");
            } else {
                setTaskTitleInputError("");
            }
        }
        setTaskTitle(value);
    }

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                const st = setTimeout(() => {
                    setTaskTitle("");
                    setSectionListValue("");
                    setSectionListBL("");
                    setSectionListID("");
                    setIsTaskModalShown(false);
                    clearTimeout(st);
                }, 4000);
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                }).then(result => {
                    if (result.isConfirmed) {
                        setTaskTitle("");
                        setSectionListValue("");
                        setSectionListBL("");
                        setSectionListID("");
                        setIsTaskModalShown(false);
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

    const updTasks = useUpdateTask({
        onSuccessCB: (resp) => callbackOnSuc(resp),
        onErrorCB: (resp) => callbackOnErr(resp),
        errorCB: (resp) => callbackErr(resp),
        workspace_id
    });

    const HFS_UpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (taskTitle == '') {
            setTaskTitleInputError("Please enter task title.");
        } else {
            if (taskTitle.length < 2) {
                setTaskTitleInputError("Task title must be contains at least 2 characters.");
            } else {
                setTaskTitleInputError("");
            }
        }

        if (sectionListValue == "") {
            setSelSectionError("Please select section.");
        } else {
            setSelSectionError("");
        }

        let isValidForm = false;

        if (taskTitle && sectionListValue) {
            isValidForm = true;
        } else {
            isValidForm = false;
        }

        if (isValidForm) {
            const guifls = localStorage.getItem("Auth");
            if (guifls) {
                const prs_guifls = JSON.parse(guifls);
                const sendData = {
                    task_id,
                    task_title: taskTitle,
                    section_id: sectionListID,
                    taskIndex: taskIndex.toString(),
                    workspace_id,
                    user_id: prs_guifls
                }
                updTasks.mutate(sendData);
            }
        }
    }

    useEffect(() => {
        const dsdata = sections.map((item) => {
            return {
                label: item.section_title,
                value: item.section_value,
                id: item.section_id
            }
        });
        setSectionList(dsdata);
        setTaskTitle(task_title);
        setSectionListValue(section_value);
        setSectionListBL(section_title);
        setSectionListID(section_id);
        //eslint-disable-next-line
    }, [isTaskModalShown]);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={true} className="cursor-pointer">
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
                        onClick={() => setIsTaskModalShown(true)}
                    >
                        <Pencil size={16} />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        title="Delete"
                        className="py-[10px] cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                        onClick={() => setIsDeleteTaskModalShown(true)}
                    >
                        <Trash2 size={16} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Update Task Modal */}
            <SiteDialog
                openState={isTaskModalShown}
                setOpenState={setIsTaskModalShown}
                modal_heading="Update Task"
                hide_modal_on_backdrop_click={true}
                roundedModal={true}
                roundness="10px"
                modal_max_width={450}
            >
                <div className="py-[20px] px-[20px]">
                    <form onSubmit={HFS_UpdateTask}>
                        <div className="pb-[15px]">
                            <label
                                htmlFor="tsk_ttl"
                                className="inline-block mb-[5px] font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200"
                            >
                                Task Title
                            </label>
                            <Input
                                type="text"
                                id="tsk_ttl"
                                placeholder="eg. HTML"
                                value={taskTitle}
                                onChange={handleTaskInputChange}
                                autoComplete="off"
                            />
                            {taskTitleInputError && (<div className="block mt-[5px] font-poppins text-[12px] text-red-600 dark:text-red-400">{taskTitleInputError}</div>)}
                        </div>
                        <div className="pb-[15px]">
                            <label
                                className="inline-block mb-[5px] font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200"
                            >
                                Select Section
                            </label>
                            <Popover open={sectionListOpen} onOpenChange={setSectionListOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={sectionListOpen}
                                        className="w-full justify-between text-zinc-900 dark:text-zinc-300"
                                    >
                                        {sectionListBL
                                            ? sectionList.find((framework) => framework.label === sectionListBL)?.label
                                            : "-- Select --"}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="PopoverContent p-0">
                                    <Command>
                                        <CommandInput placeholder="Search ..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No Sections found.</CommandEmpty>
                                            <CommandGroup>
                                                {
                                                    sectionList.map((section) => (
                                                        <CommandItem
                                                            key={section.id}
                                                            value={section.value}
                                                            onSelect={(currentValue) => {
                                                                setSectionListValue(currentValue === sectionListValue ? "" : currentValue);
                                                                setSectionListBL(() => {
                                                                    const cli = sectionList.filter((item) => item.value === currentValue);
                                                                    return cli[0].label;
                                                                });
                                                                setSectionListID(() => {
                                                                    const cli = sectionList.filter((item) => item.value === currentValue);
                                                                    return cli[0].id;
                                                                });
                                                                setSectionListOpen(false);
                                                                setSelSectionError("");
                                                            }}
                                                            className="py-[10px] cursor-pointer"
                                                        >
                                                            {section.label}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    sectionListValue === section.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))
                                                }
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {selSectionError && (<div className="block mt-[5px] font-poppins text-[12px] text-red-600 dark:text-red-400">{selSectionError}</div>)}
                        </div>
                        <div className="text-right">
                            <Button
                                title={updTasks.isPending ? "Updating ..." : "Update"}
                                type="submit"
                                disabled={updTasks.isPending}
                            >
                                {
                                    updTasks.isPending ?
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

            {/* Delete Task Modal */}
            <SiteDialog
                openState={isTaskDeleteModalShown}
                setOpenState={setIsDeleteTaskModalShown}
                modal_heading="Delete Task"
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
                        Are you sure want to delete this task ?
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-[15px] gap-y-[10px] pb-[25px]">
                    <Button
                        title={delTasks.isPending ? "wait ..." : "Yes"}
                        type="button"
                        disabled={delTasks.isPending}
                        onClick={handleDeleteTask}
                    >
                        {
                            delTasks.isPending ?
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
                        onClick={() => setIsDeleteTaskModalShown(false)}
                    >
                        No
                    </Button>
                </div>
            </SiteDialog>
        </>
    )
};

export default TasksActions;
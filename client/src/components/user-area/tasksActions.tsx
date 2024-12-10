import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown, EllipsisVertical, Loader2, Pencil, Trash2 } from "lucide-react";
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

const TasksActions = (props: (taskType & sectionType & { sections: sectionApiType[] })) => {

    const { task_id, task_title, section_title, section_id, section_value, sections } = props;
    const isLoading = false;
    const [isTaskModalShown, setIsTaskModalShown] = useState<boolean>(false);

    const handleDeleteTask = () => {
        const conf = confirm("Are you sure want to delete this task ?");
        if (conf) {
            Swal.fire({
                title: "Success!",
                text: "... Successfully !",
                icon: "success",
                timer: 2000
            });
        }
    }

    // Update task Modal Form Handling.
    const [taskTitle, setTaskTitle] = useState<string>(task_title);
    const [taskTitleInputError, setTaskTitleInputError] = useState<string>("");
    const [selSectionError, setSelSectionError] = useState<string>("");

    const [sectionList, setSectionList] = useState<taskComboboxType[]>([]);
    const [sectionListOpen, setSectionListOpen] = useState<boolean>(false);
    const [sectionListValue, setSectionListValue] = useState<string>(section_value);
    const [sectionListBL, setSectionListBL] = useState<string>(section_title);
    const [sectionListID, setSectionListID] = useState<string>(section_id);

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

    const HFS_addTask = (e: React.FormEvent<HTMLFormElement>) => {
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
            const sendData = {
                task_id,
                task_title: taskTitle,
                section_id: sectionListID,
            }
            console.log(sendData);
            setTaskTitle("");
            setSectionListValue("");
            setSectionListBL("");
            setSectionListID("");
            setIsTaskModalShown(false);
            Swal.fire({
                title: "Success!",
                text: "... Successfully !",
                icon: "success",
                timer: 2000
            });
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
    }, []);

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
                        onClick={() => setIsTaskModalShown(true)}
                    >
                        <Pencil size={16} />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        title="Delete"
                        className="py-[10px] cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                        onClick={handleDeleteTask}
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
                    <form onSubmit={HFS_addTask}>
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

export default TasksActions;
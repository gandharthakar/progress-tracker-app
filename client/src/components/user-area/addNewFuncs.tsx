import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import SiteDialog from "@/components/SiteDialog";
import Swal from 'sweetalert2';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    sectionFormVS,
    sectionFormValidationSchema,
    // taskFormVS,
    // taskFormValidationSchema,
    labelFormVS,
    labelFormValidationSchema
} from "@/zod/schemas/userPlayGround";
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
import { taskComboboxType } from "@/types/playGroundTypes";
import { demo_sections } from "@/utils/demoData";
import { convertToSlug } from "@/utils/helperFunctions";
import { useParams } from "react-router-dom";

const AddNewFuncs = () => {

    const isLoading = false;
    const { workspace_id, user_id } = useParams();

    // Add New Modals States.
    const [isSectionModalShown, setIsSectionModalShown] = useState<boolean>(false);
    const [isTaskModalShown, setIsTaskModalShown] = useState<boolean>(false);
    const [isLabelModalShown, setIsLabelModalShown] = useState<boolean>(false);

    // Add New Section Modal Form Handling.
    const rhfAddSection = useForm<sectionFormVS>({
        resolver: zodResolver(sectionFormValidationSchema),
    });

    const HFS_addSection: SubmitHandler<sectionFormVS> = (formData) => {
        const sendData = {
            section_name: formData.sectionName,
            section_value: convertToSlug(formData.sectionName),
            workspace_id,
            user_id
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

    // Add New Task Modal Form Handling.

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
                task_title: taskTitle,
                workspace_id,
                section_id: sectionListID,
                user_id
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
        const filteredSection = demo_sections.filter((section) => section.workspace_id === workspace_id);
        const dsdata = filteredSection.map((item) => {
            return {
                label: item.section_title,
                value: item.section_value,
                id: item.section_id
            }
        });
        setSectionList(dsdata);
    }, []);

    // Add New Label Modal Form Handling.
    const rhfAddLabel = useForm<labelFormVS>({
        resolver: zodResolver(labelFormValidationSchema),
    });

    const HFS_addLabel: SubmitHandler<labelFormVS> = (formData) => {
        const sendData = {
            label_title: formData.labelTitle,
            label_value: convertToSlug(formData.labelTitle),
            workspace_id,
            user_id
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
                    <div>
                        <div className="hidden md:block">
                            <Button
                                title="Add New +"
                            >
                                Add New
                                <Plus size={20} />
                            </Button>
                        </div>
                        <div className="block md:hidden">
                            <Button
                                title="Add New +"
                                size="sm"
                            >
                                Add New
                                <Plus size={20} />
                            </Button>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[130px]">
                    <DropdownMenuItem
                        title="+ Section"
                        className="py-[10px] cursor-pointer"
                        onClick={() => setIsSectionModalShown(true)}
                    >
                        <Plus size={20} />
                        Section
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        title="+ Task"
                        className="py-[10px] cursor-pointer"
                        onClick={() => setIsTaskModalShown(true)}
                    >
                        <Plus size={20} />
                        Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        title="+ Labels"
                        className="py-[10px] cursor-pointer"
                        onClick={() => setIsLabelModalShown(true)}
                    >
                        <Plus size={20} />
                        Labels
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Add New Section Modal */}
            <SiteDialog
                openState={isSectionModalShown}
                setOpenState={setIsSectionModalShown}
                modal_heading="Add New Section"
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

            {/* Add New Task Modal */}
            <SiteDialog
                openState={isTaskModalShown}
                setOpenState={setIsTaskModalShown}
                modal_heading="Add New Task"
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

            {/* Add New Label Modal */}
            <SiteDialog
                openState={isLabelModalShown}
                setOpenState={setIsLabelModalShown}
                modal_heading="Add New Label"
                hide_modal_on_backdrop_click={true}
                roundedModal={true}
                roundness="10px"
                modal_max_width={450}
            >
                <div className="py-[20px] px-[20px]">
                    <form onSubmit={rhfAddLabel.handleSubmit(HFS_addLabel)}>
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
                                {...rhfAddLabel.register("labelTitle")}
                            />
                            {rhfAddLabel.formState.errors.labelTitle && (<div className="block mt-[5px] font-poppins text-[12px] text-red-600 dark:text-red-400">{rhfAddLabel.formState.errors.labelTitle.message}</div>)}
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

export default AddNewFuncs;
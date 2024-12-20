import AddNewFuncs from "@/components/user-area/addNewFuncs";
import LabelWrapper from "@/components/user-area/labelWrapper";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { pieChartDataType, workspaceApiType } from "@/types/playGroundTypes";
import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import {
    calculatePercentage,
    getSelectedTaskIDs,
    // getDemoWorkpaceDataByID 
} from "@/utils/helperFunctions";
import { Button } from "@/components/ui/button";
import { Check, GripVertical, Loader2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import SectionActions from "@/components/user-area/sectionActions";
import TasksActions from "@/components/user-area/tasksActions";
import { useReadMasterWorkspace } from "@/tanstack-query/queries/queries";
import Swal from "sweetalert2";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import { useUpdateMasterWorkspace } from "@/tanstack-query/mutations/master/masterMutations";

const SingleWorkSpace = () => {

    const { workspace_id, user_id } = useParams();

    let tkn = null;
    const lsi = localStorage.getItem("Auth");
    if (lsi) {
        tkn = JSON.parse(lsi);
    }

    const rAWD = useReadMasterWorkspace({ workspace_id: workspace_id ?? "", token: tkn });

    const [workspace, setWorkspace] = useState<workspaceApiType | null>(null);
    const [checked, setChecked] = useState<number>(0);
    const [unchecked, setUnchecked] = useState<number>(100);
    const [fin, setFin] = useState<number>(0);
    const [fin2, setFin2] = useState<number>(0);
    const [pieChartColors, setPieChartColors] = useState<string[]>(["#09090b", "#52525b", "#ffffff", "#18181b"]);
    const [pieChartData, setPieChartData] = useState<pieChartDataType[]>([]);
    const [sel, setSel] = useState<string[]>([]);
    const progressDivRef = useRef<HTMLDivElement>(null);

    const handleCheckboxChange = (value: string) => {
        if (sel.includes(value)) {
            setSel(sel.filter((v) => v !== value));
        } else {
            setSel([...sel, value]);
        }
    };

    const onDragEnd = (result: any) => {
        if (!workspace) return;

        const { source, destination, type } = result;

        if (!destination) {
            return;
        }

        let newSections = workspace.sections ? [...workspace.sections] : [];

        if (type === 'GROUP') {
            const [reorderedSection] = newSections.splice(source.index, 1);
            newSections.splice(destination.index, 0, reorderedSection);
        } else {
            const sourceSection = newSections.find(section => section.section_id === source.droppableId.replace('section-', ''));
            const destSection = newSections.find(section => section.section_id === destination.droppableId.replace('section-', ''));

            if (sourceSection && destSection) {
                if (source.droppableId === destination.droppableId) {
                    const newTasks = Array.from(sourceSection.tasks ? sourceSection.tasks : []);
                    const [reorderedTask] = newTasks.splice(source.index, 1);
                    newTasks.splice(destination.index, 0, reorderedTask);

                    newSections = newSections.map(section =>
                        section.section_id === sourceSection.section_id
                            ? { ...section, tasks: newTasks }
                            : section
                    );
                } else {
                    const sourceTasks = Array.from(sourceSection.tasks ? sourceSection.tasks : []);
                    const destTasks = Array.from(destSection.tasks ? destSection.tasks : []);
                    const [movedTask] = sourceTasks.splice(source.index, 1);
                    destTasks.splice(destination.index, 0, movedTask);

                    newSections = newSections.map(section => {
                        if (section.section_id === sourceSection.section_id) {
                            return { ...section, tasks: sourceTasks };
                        }
                        if (section.section_id === destSection.section_id) {
                            return { ...section, tasks: destTasks };
                        }
                        return section;
                    });
                }
            }
        }

        setWorkspace({ ...workspace, sections: newSections });
    }

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                })
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

    const { mutate, isPending } = useUpdateMasterWorkspace({
        onSuccessCB: (resp) => callbackOnSuc(resp),
        onErrorCB: (resp) => callbackOnErr(resp),
        errorCB: (resp) => callbackErr(resp),
        workspace_id
    });

    const saveChangesButtonClick = () => {
        if (workspace) {
            if (workspace.sections?.length) {
                const secIDs = workspace.sections.map((sect) => sect.section_id);
                const gtSec = workspace.sections.map((section) => {
                    return {
                        section_id: section.section_id,
                        task_sequence: section.tasks?.map((task) => task.task_id)
                    }
                });
                const guifls = localStorage.getItem("Auth");
                if (guifls) {
                    const prs_guifls = JSON.parse(guifls);
                    const prepData = {
                        section_sequence: secIDs,
                        sections: gtSec,
                        completed_task: sel,
                        workspace_id: workspace_id ?? "",
                        user_id: prs_guifls
                    }
                    mutate(prepData);
                }
            }
        }
    }

    useEffect(() => {
        if (workspace_id) {
            if (rAWD.data?.master_workspace) {
                if (rAWD.data?.master_workspace.completed_task) {
                    setSel(rAWD.data?.master_workspace.completed_task);
                    setChecked(rAWD.data?.master_workspace.completed_task.length);
                }
                if (rAWD.data.master_workspace.sections) {
                    const arrs = rAWD.data.master_workspace.sections.flatMap(section => section.tasks);
                    if (rAWD.data.master_workspace.labels) {
                        const lblnth = rAWD.data.master_workspace.labels;
                        setUnchecked(arrs.length * lblnth.length);
                    }
                }
                setWorkspace(rAWD.data?.master_workspace);
            }
        }
        //eslint-disable-next-line
    }, [rAWD.data]);

    useEffect(() => {
        if (workspace) {
            const arr = workspace.sections ? workspace.sections.flatMap(section => section.tasks) : [];
            setUnchecked(arr.length * (workspace.labels?.length || 0));
            const fino = Number(calculatePercentage(sel.length, unchecked).toFixed(2));
            const fino2 = (100 - fino);
            setPieChartData([
                { id: 0, value: fino, color: pieChartColors[0], label: "Completed" },
                { id: 1, value: fino2, color: pieChartColors[1], label: "Pending" },
            ]);
        }
        //eslint-disable-next-line
    }, [sel, workspace, unchecked]);

    useEffect(() => {
        const lsitm = localStorage.getItem('theme');
        if (lsitm) {
            const theme = JSON.parse(lsitm);
            if (theme == 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                if (systemTheme == 'dark') {
                    setPieChartColors(["#18181b", "#3f3f46", "#18181b", "#f4f4f5"]);
                } else {
                    setPieChartColors(["#09090b", "#52525b", "#ffffff", "#18181b"]);
                }
            } else {
                if (theme == 'light') {
                    setPieChartColors(["#09090b", "#52525b", "#ffffff", "#18181b"]);
                } else {
                    setPieChartColors(["#18181b", "#3f3f46", "#18181b", "#f4f4f5"]);
                }
            }
        }
        // setChecked(0);
        // setUnchecked(1 * 3);
        setFin(Number(calculatePercentage(checked, unchecked).toFixed(2)));
        setFin2(100 - fin);
        setPieChartData([
            { id: 0, value: fin, color: pieChartColors[0], label: "Completed" },
            { id: 1, value: fin2, color: pieChartColors[1], label: "Pending" },
        ]);
        //eslint-disable-next-line
    }, [fin, fin2]);

    return (
        <>

            <div className="py-[25px] md:py-[50px] bg-theme-grey-1 dark:bg-zinc-900">
                <div className="site-container">
                    <div className="flex items-center justify-between flex-wrap gap-y-[10px] gap-x-[20px]">
                        <div>
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
                                            <BreadcrumbPage>{workspace?.workspace_title}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <h1 className="font-poppins font-semibold text-[18px] md:text-[22px] text-zinc-900 dark:text-zinc-200">
                                {workspace?.workspace_title}
                            </h1>
                        </div>
                        <div>
                            <AddNewFuncs />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-[25px] bg-white dark:bg-zinc-950">
                <div className="site-container">
                    <LabelWrapper />
                </div>
            </div>
            <div className="pb-[70px] mdl-1:pb-[40px] min-h-screen bg-white dark:bg-zinc-950">
                <div ref={progressDivRef} className="site-container">
                    <div className="flex items-start flex-col mdl-1:flex-row gap-[25px]">
                        <div className="w-full mdl-1:sticky mdl-1:top-[20px] mdl-1:w-[350px] border border-solid border-zinc-300 rounded-[10px] hover:ring-zinc-400 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700">
                            <div className="bg-theme-grey-1 dark:bg-zinc-900 flex w-full items-center justify-between gap-2 rounded-t-[10px] py-[10px] px-[20px]">
                                <h1 className="inline-block font-roboto_mono text-[14px] md:text-[16px] text-zinc-800 font-semibold dark:text-zinc-300">
                                    Progress
                                </h1>
                            </div>
                            <div className="w-full border-t border-zinc-300 dark:border-zinc-800"></div>
                            <div className="p-[20px] text-center">
                                <div className="inline-block">
                                    <PieChart
                                        series={[
                                            {
                                                data: pieChartData,
                                                paddingAngle: 0,
                                                type: 'pie',
                                                arcLabel: (item) => `${item.value}%`,
                                                outerRadius: 120,
                                                cx: 120,
                                                startAngle: 0,
                                                highlightScope: { fade: 'global', highlight: 'item' },
                                                faded: { color: 'gray', innerRadius: 0, additionalRadius: -10, },
                                            },
                                        ]}
                                        width={250}
                                        height={250}
                                        slotProps={{
                                            legend: {
                                                hidden: true,
                                            },
                                            popper: {
                                                sx: {
                                                    '& .MuiChartsTooltip-paper': {
                                                        backgroundColor: pieChartColors[2],
                                                        '& .MuiChartsTooltip-valueCell': {
                                                            color: pieChartColors[3],
                                                        },
                                                        '& .MuiChartsTooltip-labelCell': {
                                                            color: pieChartColors[3],
                                                        }
                                                    },
                                                }
                                            }
                                        }}
                                        sx={{
                                            [`& .${pieArcLabelClasses.root}`]: {
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                fill: '#ffffff',
                                                stroke: 'transparent'
                                            },
                                            '.MuiPieArc-root': {
                                                strokeWidth: 0, // Remove stroke width
                                                // stroke: 'none', // Alternatively, remove stroke color
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="px-[20px] pb-[20px]">
                                <div className="flex flex-wrap gap-x-[20px] gap-y-[10px] justify-center items-center">
                                    <div className="flex gap-x-[5px] items-center">
                                        <div className="inline-block w-[25px] h-[18px]" style={{ backgroundColor: pieChartColors[0] }}></div>
                                        <h2 className="inline-block font-roboto_mono text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
                                            Completed
                                        </h2>
                                    </div>
                                    <div className="flex gap-x-[5px] items-center">
                                        <div className="inline-block w-[25px] h-[18px]" style={{ backgroundColor: pieChartColors[1] }}></div>
                                        <h2 className="inline-block font-roboto_mono text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
                                            Pending
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right px-[20px] pb-[20px] hidden mdl-1:block">
                                <Button
                                    type="button"
                                    title={isPending ? "Saving ..." : "Save Changes"}
                                    onClick={saveChangesButtonClick}
                                    disabled={isPending}
                                >
                                    {
                                        isPending ?
                                            (<>
                                                <Loader2 className="animate-spin" />
                                                Saving ...
                                            </>)
                                            : ("Save Changes")
                                    }
                                </Button>
                            </div>
                        </div>

                        <div className="flex-auto w-full mdl-1:w-auto mdl-1:flex-1 border border-solid border-zinc-300 rounded-[10px] hover:ring-zinc-400 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700">
                            <div className="bg-theme-grey-1 dark:bg-zinc-900 flex w-full items-center justify-between gap-2 rounded-t-[10px] py-[10px] px-[20px]">
                                <h1 className="inline-block font-roboto_mono text-[14px] md:text-[16px] text-zinc-800 font-semibold dark:text-zinc-300">
                                    Workspace
                                </h1>
                            </div>
                            <div className="w-full border-t border-zinc-300 dark:border-zinc-800"></div>
                            <div className="p-[20px]">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="sections" type="GROUP">
                                        {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                    workspace && (
                                                        <>
                                                            {
                                                                workspace.sections?.length ?
                                                                    (
                                                                        <>
                                                                            {workspace.sections.map((section, index) => (
                                                                                <Draggable key={`section-${section.section_id || index}`} draggableId={`section-${section.section_id || index}`} index={index}>
                                                                                    {(providedDraggable) => (
                                                                                        <div className="border-t border-r border-b-0 border-l last:border-b border-solid border-zinc-300 dark:border-zinc-800" ref={providedDraggable.innerRef} {...providedDraggable.draggableProps}>
                                                                                            <div className="px-[5px] py-[7px] bg-theme-grey-1 text-zinc-600 font-poppins font-semibold hyphens-auto break-words text-[14px] md:text-[16px] flex gap-x-[5px] items-start dark:bg-zinc-900 dark:text-zinc-200">
                                                                                                <div className="h-[16px] pt-[2px] md:pt-[4px]" {...providedDraggable.dragHandleProps}>
                                                                                                    <GripVertical size={16} className="text-zinc-400" />
                                                                                                </div>
                                                                                                <div>{section.section_title}</div>
                                                                                                <div className="ml-auto h-[15px] pt-[2px]">
                                                                                                    <SectionActions
                                                                                                        section_id={section.section_id}
                                                                                                        section_title={section.section_title}
                                                                                                        sectionIndex={index}
                                                                                                        workspace_id={workspace_id ?? ""}
                                                                                                        selected_tasks={getSelectedTaskIDs(sel, section.tasks ? section.tasks : [])}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <Droppable droppableId={`section-${section.section_id || index}`} type="TASK">
                                                                                                {(providedDroppable) => (
                                                                                                    <div {...providedDroppable.droppableProps} ref={providedDroppable.innerRef}>
                                                                                                        {
                                                                                                            section.tasks?.length ?
                                                                                                                (
                                                                                                                    <>
                                                                                                                        {section.tasks.map((task, taskIndex) => (
                                                                                                                            <Draggable key={`task-${task.task_id || `${section.section_id}-${taskIndex}`}`} draggableId={`task-${task.task_id || `${section.section_id}-${taskIndex}`}`} index={taskIndex}>
                                                                                                                                {(providedTaskDraggable) => (
                                                                                                                                    <div
                                                                                                                                        ref={providedTaskDraggable.innerRef}
                                                                                                                                        {...providedTaskDraggable.draggableProps}
                                                                                                                                        className="last:border-b-0 border-b-[1px] border-solid border-zinc-300 dark:border-zinc-900"
                                                                                                                                    >
                                                                                                                                        <div className="px-[5px] pt-[10px] pb-[10px] font-poppins hyphens-auto break-words text-[12px] md:text-[14px] text-zinc-800 dark:text-zinc-200 gap-x-[5px] flex items-start">
                                                                                                                                            <div className="h-[16px] pt-[1px] md:pt-[2px]" {...providedTaskDraggable.dragHandleProps}>
                                                                                                                                                <GripVertical size={16} className="text-zinc-400" />
                                                                                                                                            </div>
                                                                                                                                            <div>{task.task_title}</div>
                                                                                                                                            <div className="ml-auto h-[15px] pt-[2px]">
                                                                                                                                                <TasksActions
                                                                                                                                                    task_id={task.task_id}
                                                                                                                                                    task_title={task.task_title}
                                                                                                                                                    taskIndex={taskIndex}
                                                                                                                                                    section_id={section.section_id}
                                                                                                                                                    section_title={section.section_title}
                                                                                                                                                    section_value={section.section_value}
                                                                                                                                                    sections={workspace.sections ? workspace.sections : []}
                                                                                                                                                    workspace_id={workspace_id ?? ""}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        {
                                                                                                                                            workspace.labels?.length ?
                                                                                                                                                (
                                                                                                                                                    <div className="flex flex-wrap gap-x-[15px] gap-y-[7px] px-[10px] prog-check">
                                                                                                                                                        {
                                                                                                                                                            workspace.labels.map((label) => {
                                                                                                                                                                const id = `${task.task_id}_${label.label_id}`;
                                                                                                                                                                return (
                                                                                                                                                                    <label htmlFor={id} key={id} className="label">
                                                                                                                                                                        <input
                                                                                                                                                                            type="checkbox"
                                                                                                                                                                            className="pt-checkbox"
                                                                                                                                                                            id={id}
                                                                                                                                                                            value={id}
                                                                                                                                                                            checked={sel.includes(id)}
                                                                                                                                                                            onChange={(e) => handleCheckboxChange(e.target.value)}
                                                                                                                                                                        />
                                                                                                                                                                        <div className="lblprev">
                                                                                                                                                                            <div className="checkbox-sq">
                                                                                                                                                                                <Check size={12} className="checkmark-tick" />
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        <div className="label-text">
                                                                                                                                                                            {label.label_title}
                                                                                                                                                                        </div>
                                                                                                                                                                    </label>
                                                                                                                                                                )
                                                                                                                                                            })
                                                                                                                                                        }
                                                                                                                                                    </div>
                                                                                                                                                )
                                                                                                                                                :
                                                                                                                                                (<div className="w-full px-[10px] py-[0px] font-poppins text-[14px] text-zinc-400 dark:text-zinc-500">No Labels Found.</div>)
                                                                                                                                        }
                                                                                                                                        <div className="pt-[10px] pb-[15px] px-[10px]">
                                                                                                                                            <div className="border border-zinc-800 dark:border-zinc-300 border-solid w-full h-[5px] mt-[5px]">
                                                                                                                                                <div
                                                                                                                                                    className="bg-zinc-800 dark:bg-zinc-300 h-[4px] w-0"
                                                                                                                                                    style={{
                                                                                                                                                        width: `${calculatePercentage(
                                                                                                                                                            sel.filter((item) => item.includes(task.task_id ?? "")).length,
                                                                                                                                                            workspace.labels ? workspace.labels.length : 0
                                                                                                                                                        )}%`,
                                                                                                                                                    }}
                                                                                                                                                ></div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                )}
                                                                                                                            </Draggable>
                                                                                                                        ))}
                                                                                                                    </>
                                                                                                                )
                                                                                                                :
                                                                                                                (<div className="w-full px-[20px] py-[10px] font-poppins text-[14px] text-zinc-400 dark:text-zinc-500">No Tasks Found.</div>)
                                                                                                        }
                                                                                                        {providedDroppable.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            ))}
                                                                        </>
                                                                    )
                                                                    :
                                                                    (<div className="w-full px-[0px] py-[0px] font-poppins text-[14px] text-zinc-400 dark:text-zinc-500">No Sections Found.</div>)
                                                            }
                                                        </>
                                                    )
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        </div>
                    </div>

                    <div className="block mdl-1:hidden">
                        <div className="fixed left-[20px] bottom-0 px-[15px] py-[7px] w-[calc(100%-40px)] border-t border-r border-l border-solid z-[10] rounded-tl-[10px] rounded-tr-[10px] bg-theme-grey-1 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800">
                            <div className="flex gap-x-[20px] items-center justify-between">
                                <div>
                                    <button
                                        type="button"
                                        title="View Progress"
                                        className="inline-block font-poppins text-[12px] underline underline-offset-2 text-zinc-800 dark:text-zinc-300"
                                        onClick={() => progressDivRef.current ? progressDivRef.current.scrollIntoView({ behavior: 'smooth' }) : null}
                                    >
                                        View Progress
                                    </button>
                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        size="sm"
                                        title={isPending ? "Saving ..." : "Save Changes"}
                                        onClick={saveChangesButtonClick}
                                        disabled={isPending}
                                    >
                                        {
                                            isPending ?
                                                (<>
                                                    <Loader2 className="animate-spin" />
                                                    Saving ...
                                                </>)
                                                : ("Save Changes")
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SingleWorkSpace;
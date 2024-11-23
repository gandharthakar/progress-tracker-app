import React, { useEffect, useState, useCallback } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useGlobalCheckboxStore } from "@/zustand/store";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const calculatePercentage = (marksObtained: number, maxMarks: number): number => {
    if (maxMarks === 0) {
        return 0;
    }
    const percentage = (marksObtained / maxMarks) * 100;
    return percentage;
}

interface Label {
    _id: string;
    label_text: string;
    label_value: string;
}

interface Task {
    _id: string;
    task_title: string;
    order: number;
}

interface Section {
    _id: string;
    section_title: string;
    order: number;
    tasks: Task[];
}

interface Workspace {
    _id: string;
    workspace_name: string;
    sections: Section[];
    labels: Label[];
    completed_tasks: string[];
}

const API_BASE_URL = 'http://localhost:3333';

const TrialAdvance: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [workspace, setWorkspace] = useState<Workspace | null>(null);
    const [checked, setChecked] = useState<number>(0);
    const [unchecked, setUnchecked] = useState<number>(0);
    const [fin, setFin] = useState<number>(0);
    const [fin2, setFin2] = useState<number>(0);
    const [piData, setPiData] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { checkedCount, incrementCount, decrementCount } = useGlobalCheckboxStore();
    const [sel, setSel] = useState<string[]>([]);

    const fetchWorkspace = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/get-workspace/${id}`);
            if (response.data && response.data._id) {
                setWorkspace(response.data);
                setSel(response.data.completed_tasks || []);
                const ct = response.data.completed_tasks;
                ct.forEach(() => {
                    incrementCount(1);
                });
            } else {
                throw new Error('Invalid workspace data received');
            }
        } catch (error) {
            console.error('Error fetching workspace:', error);
            setError('Failed to load workspace data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
        //eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        fetchWorkspace();
    }, [fetchWorkspace]);

    const handleCheckboxChange = (value: string) => {
        let newSel: string[];
        if (sel.includes(value)) {
            newSel = sel.filter((v) => v !== value);
            decrementCount(1);
        } else {
            newSel = [...sel, value];
            incrementCount(1);
        }
        setSel(newSel);
    };

    const saveWorkspaceOrder = async (updatedWorkspace: Workspace, completedTasks: string[]) => {
        try {
            const workspaceToSave = {
                workspace_id: updatedWorkspace._id,
                sections: updatedWorkspace.sections.map(section => ({
                    _id: section._id,
                    order: section.order,
                    tasks: section.tasks.map(task => ({
                        _id: task._id,
                        order: task.order
                    }))
                })),
                completed_tasks: completedTasks
            };

            await axios.post(`${API_BASE_URL}/save-sections-order`, workspaceToSave);
            // const response = await axios.post(`${API_BASE_URL}/save-sections-order`, workspaceToSave);
            // if (response.data && response.data.workspace) {
            //     console.log('Workspace order saved successfully');
            //     return response.data.workspace;
            // } else {
            //     throw new Error('Invalid response data');
            // }
        } catch (error) {
            console.error('Error saving workspace order:', error);
            setError('Failed to save changes. Please try again.');
            return null;
        }
    };

    const handleCheck = async () => {
        if (!workspace) return;
        try {
            await saveWorkspaceOrder(workspace, sel);
            // const savedWorkspace = await saveWorkspaceOrder(workspace, sel);
            // if (savedWorkspace) {
            //     setWorkspace(savedWorkspace);
            //     setSel(savedWorkspace.completed_tasks || []);
            //     console.log('Workspace data saved successfully');
            // }
        } catch (error) {
            console.error('Error saving workspace data:', error);
            setError('Failed to save changes. Please try again.');
        }
    };

    const onDragEnd = (result: any) => {
        if (!workspace) return;

        const { source, destination, type } = result;

        if (!destination) {
            return;
        }

        let newSections = [...workspace.sections];

        if (type === 'GROUP') {
            const [reorderedSection] = newSections.splice(source.index, 1);
            newSections.splice(destination.index, 0, reorderedSection);
        } else {
            const sourceSection = newSections.find(section => section._id === source.droppableId.replace('section-', ''));
            const destSection = newSections.find(section => section._id === destination.droppableId.replace('section-', ''));

            if (sourceSection && destSection) {
                if (source.droppableId === destination.droppableId) {
                    const newTasks = Array.from(sourceSection.tasks);
                    const [reorderedTask] = newTasks.splice(source.index, 1);
                    newTasks.splice(destination.index, 0, reorderedTask);

                    newSections = newSections.map(section =>
                        section._id === sourceSection._id
                            ? { ...section, tasks: newTasks }
                            : section
                    );
                } else {
                    const sourceTasks = Array.from(sourceSection.tasks);
                    const destTasks = Array.from(destSection.tasks);
                    const [movedTask] = sourceTasks.splice(source.index, 1);
                    destTasks.splice(destination.index, 0, movedTask);

                    newSections = newSections.map(section => {
                        if (section._id === sourceSection._id) {
                            return { ...section, tasks: sourceTasks };
                        }
                        if (section._id === destSection._id) {
                            return { ...section, tasks: destTasks };
                        }
                        return section;
                    });
                }
            }
        }

        setWorkspace({ ...workspace, sections: newSections });
    };

    useEffect(() => {
        if (!workspace) return;

        const arr = workspace.sections.flatMap(section => section.tasks);
        setUnchecked(arr.length * (workspace.labels?.length || 0));
        const fino = Number(calculatePercentage(sel.length, unchecked).toFixed(2));
        const fino2 = (100 - fino);
        setPiData([
            { id: 0, value: fino, color: '#18181b', label: "Completed" },
            { id: 1, value: fino2, color: '#3f3f46', label: "Pending" },
        ]);
    }, [sel, workspace, unchecked]);

    useEffect(() => {
        if (!workspace) return;

        setChecked(sel.length);
        const arr = workspace.sections.flatMap(section => section.tasks);
        setUnchecked(arr.length * (workspace.labels?.length || 0));
        setFin(Number(calculatePercentage(checked, unchecked).toFixed(2)));
        setFin2(100 - fin);
        setPiData([
            { id: 0, value: fin, color: '#18181b', label: "Completed" },
            { id: 1, value: fin2, color: '#3f3f46', label: "Pending" },
        ]);
    }, [fin, fin2, checked, unchecked, workspace, sel]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!workspace || !workspace.sections) {
        return <div>No workspace data available.</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <div className="pb-[10px]">
                    <h1 className="text-[24px] md:text-[26px]">
                        {workspace.workspace_name}
                    </h1>
                </div>
                <Droppable droppableId="sections" type="GROUP">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {workspace.sections.map((section, index) => (
                                <Draggable key={`section-${section._id || index}`} draggableId={`section-${section._id || index}`} index={index}>
                                    {(providedDraggable) => (
                                        <div ref={providedDraggable.innerRef} {...providedDraggable.draggableProps}>
                                            <div className="px-[15px] py-[10px] bg-zinc-300 text-zinc-700 text-[22px] md:text-[24px] flex items-center">
                                                <div {...providedDraggable.dragHandleProps}>
                                                    <GripVertical className="mr-2" />
                                                </div>
                                                {section.section_title}
                                            </div>
                                            <Droppable droppableId={`section-${section._id || index}`} type="TASK">
                                                {(providedDroppable) => (
                                                    <div {...providedDroppable.droppableProps} ref={providedDroppable.innerRef}>
                                                        {section.tasks && section.tasks.map((task, taskIndex) => (
                                                            <Draggable key={`task-${task._id || `${section._id}-${taskIndex}`}`} draggableId={`task-${task._id || `${section._id}-${taskIndex}`}`} index={taskIndex}>
                                                                {(providedTaskDraggable) => (
                                                                    <div
                                                                        ref={providedTaskDraggable.innerRef}
                                                                        {...providedTaskDraggable.draggableProps}
                                                                        className="px-[15px] py-[10px] border-b-[1px] border-solid border-zinc-500 flex items-center"
                                                                    >
                                                                        <div {...providedTaskDraggable.dragHandleProps}>
                                                                            <GripVertical className="mr-2" />
                                                                        </div>
                                                                        <div>
                                                                            {task.task_title}
                                                                            {workspace.labels && workspace.labels.length > 0 && (
                                                                                <div className="flex flex-wrap gap-x-[15px] gap-y-[10px]">
                                                                                    {workspace.labels.map((label) => (
                                                                                        <label htmlFor={`${task._id}_${label._id}`} key={`${task._id}_${label._id}`}>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                id={`${task._id}_${label._id}`}
                                                                                                value={`${task._id}_${label._id}`}
                                                                                                checked={sel.includes(`${task._id}_${label._id}`)}
                                                                                                onChange={(e) => handleCheckboxChange(e.target.value)}
                                                                                            />
                                                                                            {label.label_text}
                                                                                        </label>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                            {(!workspace.labels || workspace.labels.length === 0) && (
                                                                                <div>No Labels Found.</div>
                                                                            )}
                                                                            <div className="border border-zinc-800 border-solid w-full h-[5px] mt-[5px]">
                                                                                <div
                                                                                    className="bg-zinc-800 h-[4px] w-0"
                                                                                    style={{
                                                                                        width: `${calculatePercentage(
                                                                                            sel.filter((item) => item.includes(task._id)).length,
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
                                                        {providedDroppable.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
            <h1 className="mb-[20px] text-[26px] font-semibold">
                {checkedCount} - {unchecked}
            </h1>

            <button
                type="button"
                className="p-[10px] border border-solid border-zinc-400"
                onClick={handleCheck}
            >
                Update
            </button>

            <div className="pt-[20px]">
                <div className="text-center">
                    <div className="inline-block">
                        <PieChart
                            series={[
                                {
                                    data: piData,
                                    type: 'pie',
                                    arcLabel: (item) => `${item.value}%`,
                                    outerRadius: 120,
                                    cx: 120,
                                    startAngle: 0,
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    faded: { color: 'gray' },
                                }
                            ]}
                            width={250}
                            height={250}
                            slotProps={{
                                legend: {
                                    hidden: true,
                                }
                            }}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    fill: '#ffffff'
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};

export default TrialAdvance;
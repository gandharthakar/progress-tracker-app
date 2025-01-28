import { Button } from "@/components/ui/button";
import { labelType } from "@/types/playGroundTypes";
// import { demo_labels } from "@/utils/demoData";
import { GripVertical, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import LabelActions from "@/components/user-area/labelActions";
import { reorder } from "@/utils/helperFunctions";
import { useParams } from "react-router-dom";
import { useReadLables } from "@/tanstack-query/queries/queries";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import Swal from "sweetalert2";
import { useUpdateLabelOrder } from "@/tanstack-query/mutations/labels/labelsMutations";

const LabelWrapper = () => {

    const { workspace_id, user_id } = useParams();
    const [labelData, setLabelData] = useState<labelType[]>([]);
    const [isLabelOrderChanged, setIsLabelOrderChanged] = useState<boolean>(false);

    let tkn = null;
    const lsi = localStorage.getItem("Auth");
    if (lsi) {
        tkn = JSON.parse(lsi);
    }
    const rdLabels = useReadLables({
        workspace_id: workspace_id ?? "",
        token: tkn
    });

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                const st = setTimeout(() => {
                    setIsLabelOrderChanged(false);
                    clearTimeout(st);
                }, 4000);
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                }).then(result => {
                    if (result.isConfirmed) {
                        setIsLabelOrderChanged(false);
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

    const updLableOrd = useUpdateLabelOrder({
        onSuccessCB: (resp) => callbackOnSuc(resp),
        onErrorCB: (resp) => callbackOnErr(resp),
        errorCB: (resp) => callbackErr(resp),
        workspace_id
    });

    const saveLabelOrder = () => {
        const guifls = localStorage.getItem("Auth");
        if (guifls) {
            const prs_guifls = JSON.parse(guifls);
            const prepData = {
                workspace_id: workspace_id ?? "",
                user_id: prs_guifls,
                label_sequence: labelData.map((label) => label.label_id)
            }
            updLableOrd.mutate(prepData);
        }
    }

    //eslint-disable-next-line
    const onDragEnd = (result: { source: any; destination: any; type: any; }) => {
        if (!labelData) return;

        const { source, destination } = result;

        if (!destination) {
            return;
        }

        const items = reorder(labelData, source.index, destination.index);
        setLabelData(items);
        setIsLabelOrderChanged(true);
    }

    useEffect(() => {
        // const filtered_labels = demo_labels.filter((label) => label.workspace_id === workspace_id);
        if (rdLabels.data?.labels) {
            setLabelData(rdLabels.data?.labels);
        }

    }, [rdLabels.data]);

    return (
        <>
            <input type="hidden" value={user_id} />
            <div className="flex w-full max-w-full select-none flex-col items-start justify-between rounded-[10px] border transition-all duration-200 ease-in-out hover:ring-zinc-400 border-zinc-300 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700">
                <div className="bg-theme-grey-1 dark:bg-zinc-900 flex w-full items-center justify-between gap-2 rounded-t-[10px] py-[10px] px-[20px]">
                    <h1 className="inline-block font-roboto_mono text-[14px] md:text-[16px] text-zinc-800 font-semibold dark:text-zinc-300">
                        Labels
                    </h1>
                </div>
                <div className="w-full border-t border-zinc-300 dark:border-zinc-800"></div>
                <div className="adjDragLab">
                    {
                        labelData.length ?
                            (
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="labels" direction="horizontal">
                                        {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {labelData.length && labelData.map((label, index) => (
                                                    <Draggable key={label.label_id} draggableId={label.label_id ?? ""} index={index}>
                                                        {(providedDraggable) => (
                                                            <div ref={providedDraggable.innerRef} {...providedDraggable.draggableProps}>
                                                                <div className="flex items-center gap-x-[5px] rounded-[50px] px-[10px] py-[5px] cursor-pointer font-poppins text-[14px] text-zinc-900 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200">
                                                                    <div {...providedDraggable.dragHandleProps}>
                                                                        <GripVertical size={14} className="" />
                                                                    </div>
                                                                    <div>
                                                                        {label.label_title}
                                                                    </div>
                                                                    <div className="ml-[5px] h-[15px]">
                                                                        <LabelActions
                                                                            label_id={label.label_id ?? ""}
                                                                            label_title={label.label_title}
                                                                            labelIndex={index}
                                                                            workspace_id={workspace_id ?? ""}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            )
                            :
                            (<div className="w-full px-[20px] py-[10px] font-poppins text-[14px] text-zinc-400 dark:text-zinc-600">No Labels Found.</div>)
                    }
                </div>
                {
                    isLabelOrderChanged && (
                        <>
                            <div className="w-full border-t border-zinc-300 dark:border-zinc-800"></div>
                            <div className="w-full text-right py-[5px] px-[20px]">
                                <Button
                                    type="button"
                                    title={updLableOrd.isPending ? "Saving ..." : "Save Changes"}
                                    disabled={updLableOrd.isPending}
                                    size="sm"
                                    onClick={saveLabelOrder}
                                >
                                    {
                                        updLableOrd.isPending ?
                                            (<>
                                                <Loader2 className="animate-spin" />
                                                Saving ...
                                            </>)
                                            : ("Save Changes")
                                    }
                                </Button>
                            </div>
                        </>
                    )
                }
            </div >
        </>
    )
};

export default LabelWrapper;
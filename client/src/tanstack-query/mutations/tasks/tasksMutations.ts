import { createTask, deleteTask, updateTask } from "@/tanstack-query/api-functions/tasks/tasksApiFunctions";
import { delTasksPayloadType, taskType } from "@/types/playGroundTypes";
import { TQ_CBtype } from "@/types/tanstack-query/commonTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useCreateTask = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createTask"],
        mutationFn: (data: taskType) => createTask(data),
        onSuccess(data) {
            if (data.success) {
                if (callbacks?.onSuccessCB) {
                    callbacks.onSuccessCB(data);
                }
            } else {
                if (callbacks?.errorCB) {
                    callbacks.errorCB(data);
                }
            }
        },
        onError(error: (Error & { response: AxiosResponse; })) {
            const resp = error.response.data;
            if (!resp.success) {
                if (callbacks?.onErrorCB) {
                    callbacks.onErrorCB(resp);
                }
            }
        },
        onSettled: async (_, error) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["readMasterWorkspace"]
                });
                // await queryClient.invalidateQueries({
                //     queryKey: ["readSections"]
                // });
            }
        },
    })
}

export const useUpdateTask = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateTask"],
        mutationFn: (data: taskType) => updateTask(data),
        onSuccess(data) {
            if (data.success) {
                if (callbacks?.onSuccessCB) {
                    callbacks.onSuccessCB(data);
                }
            } else {
                if (callbacks?.errorCB) {
                    callbacks.errorCB(data);
                }
            }
        },
        onError(error: (Error & { response: AxiosResponse; })) {
            const resp = error.response.data;
            if (!resp.success) {
                if (callbacks?.onErrorCB) {
                    callbacks.onErrorCB(resp);
                }
            }
        },
        onSettled: async (_, error) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["readMasterWorkspace"]
                });
                // await queryClient.invalidateQueries({
                //     queryKey: ["readSections"]
                // });
            }
        },
    })
}

export const useDeleteTask = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteTask"],
        mutationFn: (data: delTasksPayloadType) => deleteTask(data),
        onSuccess(data) {
            if (data.success) {
                if (callbacks?.onSuccessCB) {
                    callbacks.onSuccessCB(data);
                }
            } else {
                if (callbacks?.errorCB) {
                    callbacks.errorCB(data);
                }
            }
        },
        onError(error: (Error & { response: AxiosResponse; })) {
            const resp = error.response.data;
            if (!resp.success) {
                if (callbacks?.onErrorCB) {
                    callbacks.onErrorCB(resp);
                }
            }
        },
        onSettled: async (_, error) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["readMasterWorkspace"]
                });
                // await queryClient.invalidateQueries({
                //     queryKey: ["readSections"]
                // });
            }
        },
    })
}
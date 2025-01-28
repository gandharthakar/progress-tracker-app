import { createLabels, deleteSection, updateLabelOrder, updateLabels } from "@/tanstack-query/api-functions/labels/labelsApiFunctions";
import { delLblsPayloadType, labelType, updLblOrdPayloadType } from "@/types/playGroundTypes";
import { TQ_CBtype } from "@/types/tanstack-query/commonTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// const currentDate = new Date();
// const timestamp = currentDate.getTime();

export const useCreateLabels = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createLabels"],
        mutationFn: (data: labelType) => createLabels(data),
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
                    queryKey: ["readMasterWorkspace", callbacks?.workspace_id]
                });
                await queryClient.invalidateQueries({
                    queryKey: ["readLabels", callbacks?.workspace_id]
                });
            }
        },
    })
}

export const useUpdateLabels = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateLabels"],
        mutationFn: (data: labelType) => updateLabels(data),
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
                    queryKey: ["readMasterWorkspace", callbacks?.workspace_id]
                });
                await queryClient.invalidateQueries({
                    queryKey: ["readLabels", callbacks?.workspace_id]
                });
            }
        },
    })
}

export const useUpdateLabelOrder = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateLabelOrder"],
        mutationFn: (data: updLblOrdPayloadType) => updateLabelOrder(data),
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
                    queryKey: ["readMasterWorkspace", callbacks?.workspace_id]
                });
                await queryClient.invalidateQueries({
                    queryKey: ["readLabels", callbacks?.workspace_id]
                });
            }
        },
    })
}

export const useDeleteLabels = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteLabels"],
        mutationFn: (data: delLblsPayloadType) => deleteSection(data),
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
                    queryKey: ["readMasterWorkspace", callbacks?.workspace_id]
                });
                await queryClient.invalidateQueries({
                    queryKey: ["readLabels", callbacks?.workspace_id]
                });
            }
        },
    })
}
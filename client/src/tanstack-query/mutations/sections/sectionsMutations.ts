import { createSection, deleteSection, UpdateSection } from "@/tanstack-query/api-functions/sections/sectionsApiFunctions";
import { delSecsPayloadType, sectionType } from "@/types/playGroundTypes";
import { TQ_CBtype } from "@/types/tanstack-query/commonTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useCreateSection = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createSection"],
        mutationFn: (data: sectionType) => createSection(data),
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
                    queryKey: ["readSections", callbacks?.workspace_id]
                });
            }
        },
    })
}

export const useUpdateSection = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateSection"],
        mutationFn: (data: sectionType) => UpdateSection(data),
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
                    queryKey: ["readSections", callbacks?.workspace_id]
                });
            }
        },
    })
}

export const useDeleteSection = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteSection"],
        mutationFn: (data: delSecsPayloadType) => deleteSection(data),
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
                    queryKey: ["readSections", callbacks?.workspace_id]
                });
            }
        },
    })
}
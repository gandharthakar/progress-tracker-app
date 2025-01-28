import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMasterWorkpace } from "@/tanstack-query/api-functions/master/masterWorkspaceAPIFunctions";
import { TQ_CBtype } from "@/types/tanstack-query/commonTypes";
import { updMstWkspType } from "@/types/playGroundTypes";
import { AxiosResponse } from "axios";

export const useUpdateMasterWorkspace = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateMasterWorkspace"],
        mutationFn: (data: updMstWkspType) => updateMasterWorkpace(data),
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
                })
                await queryClient.invalidateQueries({
                    queryKey: ["readSections", callbacks?.workspace_id]
                });
            }
        },
    })
}
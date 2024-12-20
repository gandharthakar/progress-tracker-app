import { updateGeneralSettings, updatePasswordSetting } from "@/tanstack-query/api-functions/user/userApiFunctions";
import { TQ_CBtype } from "@/types/tanstack-query/commonTypes";
import { updGenSetPayloadType, updPwdSetPayloadType } from "@/types/tanstack-query/user/userTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useUpdateGeneralSettings = (callbacks?: TQ_CBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateGeneralSettings"],
        mutationFn: (data: updGenSetPayloadType) => updateGeneralSettings(data),
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
                    queryKey: ["getUserInfo", callbacks?.required_data_code]
                })
            }
        },
    })
}

export const useUpdatePasswordSettings = (callbacks?: TQ_CBtype) => {
    return useMutation({
        mutationKey: ["updatePasswordSetting"],
        mutationFn: (data: updPwdSetPayloadType) => updatePasswordSetting(data),
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
    })
}
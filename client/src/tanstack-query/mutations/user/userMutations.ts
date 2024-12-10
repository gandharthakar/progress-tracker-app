import { getUserInfo, updateGeneralSettings, updatePasswordSetting } from "@/tanstack-query/api-functions/user/userApiFunctions";
import { TQ_CBtype } from "@/types/tanstack-query/commonTypes";
import { TQ_CBtype_User, updGenSetPayloadType, updPwdSetPayloadType, UserInfoPayloadType } from "@/types/tanstack-query/user/userTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetUserInfo = (callbacks?: TQ_CBtype_User) => {
    return useMutation({
        mutationKey: ["getUserInfo"],
        mutationFn: (data: UserInfoPayloadType) => getUserInfo(data),
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

export const useUpdateGeneralSettings = (callbacks?: TQ_CBtype) => {
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
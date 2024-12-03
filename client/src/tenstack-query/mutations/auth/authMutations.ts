import { registerUser, verifyUserEmail, loginUser } from "@/tenstack-query/api-functions/auth/authApiFunctions";
import { TQ_CBtype_Auth, TSQ_UserData, TSQ_EmailVerify } from "@/types/tenstack-query/auth/authTypes";
import { TQ_CBtype } from "@/types/tenstack-query/commonTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useRegisterUser = (callbacks?: TQ_CBtype_Auth) => {
    return useMutation({
        mutationKey: ["registerUser"],
        mutationFn: (data: TSQ_UserData) => registerUser(data),
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

export const useVerifyUserEmail = (callbacks?: TQ_CBtype) => {
    return useMutation({
        mutationKey: ["verifyUserEmail"],
        mutationFn: (data: TSQ_EmailVerify) => verifyUserEmail(data),
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

export const useLoginUser = (callbacks?: TQ_CBtype_Auth) => {
    return useMutation({
        mutationKey: ["loginUser"],
        mutationFn: (data: TSQ_UserData) => loginUser(data),
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
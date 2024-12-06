import { registerUser, verifyUserEmail, loginUser, forgotPassword, resetPassword, authChecker, tokenChecker, reVerifyUserEmail } from "@/tenstack-query/api-functions/auth/authApiFunctions";
import { TQ_CBtype_Auth, TSQ_UserData, TSQ_EmailVerify, ResetUserPWDType, TQ_CBtype_AuthCheck } from "@/types/tenstack-query/auth/authTypes";
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

export const useForgotPassword = (callbacks?: TQ_CBtype) => {
    return useMutation({
        mutationKey: ["forgotPassword"],
        mutationFn: (data: TSQ_UserData) => forgotPassword(data),
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

export const useResetPassword = (callbacks?: TQ_CBtype) => {
    return useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: (data: ResetUserPWDType) => resetPassword(data),
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

export const useAuthChecker = (callbacks?: TQ_CBtype_AuthCheck) => {
    return useMutation({
        mutationKey: ["authChecker"],
        mutationFn: (data: { token: string }) => authChecker(data),
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

export const useCheckTokenValidity = (callbacks?: TQ_CBtype) => {
    return useMutation({
        mutationKey: ["checkTokenValidity"],
        mutationFn: (data: { token: string }) => tokenChecker(data),
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

export const useReVerifyUserEmail = (callbacks?: TQ_CBtype) => {
    return useMutation({
        mutationKey: ["reVerifyUserEmail"],
        mutationFn: (data: TSQ_EmailVerify) => reVerifyUserEmail(data),
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
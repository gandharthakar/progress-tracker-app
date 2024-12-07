import { axiosInstance } from "@/tenstack-query/fetcher";
import { CommonAPIResponseAuthCheck, ResetUserPWDType, reVerEmlViaOptEmlPayloadType, TSQ_EmailVerify, TSQ_UserData } from "@/types/tenstack-query/auth/authTypes";
import { CommonAPIResponse } from "@/types/tenstack-query/commonTypes";

export const registerUser = async (data: TSQ_UserData) => {
    return (await axiosInstance.post<TSQ_UserData & CommonAPIResponse>('/api/auth/register', data)).data;
}

export const verifyUserEmail = async (data: TSQ_EmailVerify) => {
    return (await axiosInstance.post<TSQ_EmailVerify & CommonAPIResponse>('/api/auth/verify-email', data)).data;
}

export const loginUser = async (data: TSQ_UserData) => {
    return (await axiosInstance.post<TSQ_UserData & CommonAPIResponse>('/api/auth/login', data)).data
}

export const forgotPassword = async (data: TSQ_UserData) => {
    return (await axiosInstance.post<TSQ_UserData & CommonAPIResponse>('/api/auth/forgot-password', data)).data
}

export const resetPassword = async (data: ResetUserPWDType) => {
    return (await axiosInstance.post<ResetUserPWDType & CommonAPIResponse>('/api/auth/reset-password', data)).data
}

export const authChecker = async (data: { token: string }) => {
    return (await axiosInstance.post<CommonAPIResponseAuthCheck>('/api/auth/checker', data)).data;
}

export const tokenChecker = async (data: { token: string }) => {
    return (await axiosInstance.post<CommonAPIResponse>('/api/auth/check-token-validity', data)).data;
}

export const reVerifyUserEmail = async (data: TSQ_EmailVerify) => {
    return (await axiosInstance.post<TSQ_EmailVerify & CommonAPIResponse>('/api/auth/re-verify-email', data)).data;
}

export const reVerifyEmailLinkByToken = async (data: { token: string }) => {
    return (await axiosInstance.post<CommonAPIResponse>('/api/auth/via-token-email-verification', data)).data;
}

export const reVerifyEmailLinkByOptEml = async (data: reVerEmlViaOptEmlPayloadType) => {
    return (await axiosInstance.post<reVerEmlViaOptEmlPayloadType & CommonAPIResponse>('/api/auth/via-optional-email-verification', data)).data;
}
import { axiosInstance } from "@/tenstack-query/fetcher";
import { TSQ_EmailVerify, TSQ_UserData } from "@/types/tenstack-query/auth/authTypes";
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
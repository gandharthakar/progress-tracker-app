import { axiosInstance } from "@/tenstack-query/fetcher";
import { CommonAPIResponse } from "@/types/tenstack-query/commonTypes";
import { updGenSetPayloadType, updPwdSetPayloadType, UserInfoAPIResponse, UserInfoPayloadType } from "@/types/tenstack-query/user/userTypes";

export const getUserInfo = async (data: UserInfoPayloadType) => {
    return (await axiosInstance.post<UserInfoPayloadType & UserInfoAPIResponse>('/api/get-user-info', data)).data;
}

export const updateGeneralSettings = async (data: updGenSetPayloadType) => {
    return (await axiosInstance.post<updGenSetPayloadType & CommonAPIResponse>("/api/users/settings/general", data)).data;
}

export const updatePasswordSetting = async (data: updPwdSetPayloadType) => {
    return (await axiosInstance.post<updPwdSetPayloadType & CommonAPIResponse>("/api/users/settings/password", data)).data;
}
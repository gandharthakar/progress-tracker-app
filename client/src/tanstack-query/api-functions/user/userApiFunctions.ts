import { axiosInstance } from "@/tanstack-query/fetcher";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import { updGenSetPayloadType, updPwdSetPayloadType, UserInfoAPIResponse, UserInfoPayloadType } from "@/types/tanstack-query/user/userTypes";

export const getUserInfo = async (data: UserInfoPayloadType) => {
    return (await axiosInstance.get<UserInfoPayloadType & UserInfoAPIResponse>(`/api/users/user-info?token=${data.token}&required_data_code=${data.required_data_code}`)).data;
}

export const updateGeneralSettings = async (data: updGenSetPayloadType) => {
    return (await axiosInstance.post<updGenSetPayloadType & CommonAPIResponse>("/api/users/settings/general", data)).data;
}

export const updatePasswordSetting = async (data: updPwdSetPayloadType) => {
    return (await axiosInstance.post<updPwdSetPayloadType & CommonAPIResponse>("/api/users/settings/password", data)).data;
}
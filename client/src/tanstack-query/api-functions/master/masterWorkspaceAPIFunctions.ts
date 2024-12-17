import { axiosInstance } from "@/tanstack-query/fetcher";
import { rdMastWkspdataType, rdMastWkspPayloadType, updMstWkspType } from "@/types/playGroundTypes";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";

export const readMasterWorkspace = async (data: rdMastWkspPayloadType) => {
    return (await axiosInstance.get<rdMastWkspdataType>(`/api/master/workspace/read?workspace_id=${data.workspace_id}&token=${data.token}`)).data;
}

export const updateMasterWorkpace = async (data: updMstWkspType) => {
    return (await axiosInstance.put<updMstWkspType & CommonAPIResponse>('/api/master/workspace/update', data)).data;
}
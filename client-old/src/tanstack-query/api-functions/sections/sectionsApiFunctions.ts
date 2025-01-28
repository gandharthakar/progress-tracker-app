import { axiosInstance } from "@/tanstack-query/fetcher";
import { delSecsPayloadType, rdMastWkspPayloadType, rdSecDataType, sectionType } from "@/types/playGroundTypes";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";

export const readSections = async (data: rdMastWkspPayloadType) => {
    return (await axiosInstance.get<rdSecDataType>(`/api/sections/read-all?workspace_id=${data.workspace_id}&token=${data.token}`)).data;
}

export const createSection = async (data: sectionType) => {
    return (await axiosInstance.post<sectionType & CommonAPIResponse>('/api/sections/create', data)).data;
}

export const UpdateSection = async (data: sectionType) => {
    return (await axiosInstance.put<sectionType & CommonAPIResponse>('/api/sections/update', data)).data;
}

export const deleteSection = async (data: delSecsPayloadType) => {
    const resp = await axiosInstance.delete<CommonAPIResponse>('/api/sections/delete', {
        data: JSON.stringify({ ...data }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((pr: any) => pr.data);

    return resp;
}
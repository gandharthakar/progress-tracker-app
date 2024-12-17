import { axiosInstance } from "@/tanstack-query/fetcher";
import { delSecsPayloadType, sectionType } from "@/types/playGroundTypes";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";

export const createSection = async (data: sectionType) => {
    return (await axiosInstance.post<sectionType & CommonAPIResponse>('/api/sections/create', data)).data;
}

export const UpdateSection = async (data: sectionType) => {
    return (await axiosInstance.post<sectionType & CommonAPIResponse>('/api/sections/update', data)).data;
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
import { axiosInstance } from "@/tanstack-query/fetcher";
import { delLblsPayloadType, labelType, rdLblsDataType, rdMastWkspPayloadType, updLblOrdPayloadType } from "@/types/playGroundTypes";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";

export const readLabels = async (data: rdMastWkspPayloadType) => {
    return (await axiosInstance.get<rdLblsDataType>(`/api/labels/read-all?workspace_id=${data.workspace_id}&token=${data.token}`)).data;
}

export const createLabels = async (data: labelType) => {
    return (await axiosInstance.post<labelType & CommonAPIResponse>('/api/labels/create', data)).data;
}

export const updateLabels = async (data: labelType) => {
    return (await axiosInstance.put<labelType & CommonAPIResponse>('/api/labels/update', data)).data;
}

export const updateLabelOrder = async (data: updLblOrdPayloadType) => {
    return (await axiosInstance.put<updLblOrdPayloadType & CommonAPIResponse>('/api/labels/save-order', data)).data;
}

export const deleteSection = async (data: delLblsPayloadType) => {
    const resp = await axiosInstance.delete<CommonAPIResponse>('/api/labels/delete', {
        data: JSON.stringify({ ...data }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((pr: any) => pr.data);

    return resp;
}
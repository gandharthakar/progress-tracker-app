import { axiosInstance } from "@/tanstack-query/fetcher";
import { delWkspPayloadType, rdAlWkspPayloadType, workspaceType } from "@/types/playGroundTypes";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";

export const readAllWorkspaces = async (token: string | null) => {
    return (await axiosInstance.get<rdAlWkspPayloadType>(`/api/workspaces/read-all?token=${token}`)).data;
}

export const createWorkspace = async (data: workspaceType) => {
    return (await axiosInstance.post<workspaceType & CommonAPIResponse>('/api/workspaces/create', data)).data;
}

export const updateWorkspace = async (data: workspaceType) => {
    return (await axiosInstance.put<workspaceType & CommonAPIResponse>('/api/workspaces/update', data)).data;
}

export const deleteWorkspace = async (data: delWkspPayloadType) => {
    const resp = await axiosInstance.delete<CommonAPIResponse>('/api/workspaces/delete', {
        data: JSON.stringify({ ...data }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((pr: any) => pr.data);

    return resp;
}
import { axiosInstance } from "@/tanstack-query/fetcher";
import { delTasksPayloadType, taskType } from "@/types/playGroundTypes";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";

export const createTask = async (data: taskType) => {
    return (await axiosInstance.post<taskType & CommonAPIResponse>('/api/tasks/create', data)).data;
}

export const updateTask = async (data: taskType) => {
    return (await axiosInstance.put<taskType & CommonAPIResponse>('/api/tasks/update', data)).data;
}

export const deleteTask = async (data: delTasksPayloadType) => {
    const resp = await axiosInstance.delete<CommonAPIResponse>('/api/tasks/delete', {
        data: JSON.stringify({ ...data }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((pr) => pr.data);

    return resp;
}
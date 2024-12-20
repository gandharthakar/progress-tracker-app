import { readAllWorkspaces } from "@/tanstack-query/api-functions/workspace/workspaceApiFunctions"
import { rdMastWkspPayloadType } from "@/types/playGroundTypes";
import { useQuery } from "@tanstack/react-query"
import { readMasterWorkspace } from "../api-functions/master/masterWorkspaceAPIFunctions";
import { readSections } from "../api-functions/sections/sectionsApiFunctions";
import { readLabels } from "../api-functions/labels/labelsApiFunctions";

const defConfig = {
    refetchOnWindowFocus: false,
    staleTime: 2 * (60 * 1000),
    gcTime: 2 * (60 * 1000),
}

export const useReadAllWorkspaces = (token: string) => {
    return useQuery({
        queryKey: ["readAllWorkspaces"],
        queryFn: () => readAllWorkspaces(token),
        ...defConfig
    });
}

export const useReadMasterWorkspace = (data: rdMastWkspPayloadType) => {
    return useQuery({
        queryKey: ["readMasterWorkspace", data.workspace_id],
        queryFn: () => readMasterWorkspace(data),
        ...defConfig
    });
}

export const useReadSections = (data: rdMastWkspPayloadType) => {
    return useQuery({
        queryKey: ["readSections", data.workspace_id],
        queryFn: () => readSections(data),
        ...defConfig
    });
}

export const useReadLables = (data: rdMastWkspPayloadType) => {
    return useQuery({
        queryKey: ["readLabels", data.workspace_id],
        queryFn: () => readLabels(data),
        ...defConfig
    });
}
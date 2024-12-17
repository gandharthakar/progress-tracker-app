import { readAllWorkspaces } from "@/tanstack-query/api-functions/workspace/workspaceApiFunctions"
import { rdMastWkspPayloadType } from "@/types/playGroundTypes";
import { useQuery } from "@tanstack/react-query"
import { readMasterWorkspace } from "../api-functions/master/masterWorkspaceAPIFunctions";

const defConfig = {
    refetchOnWindowFocus: false,
    staleTime: 2 * (60 * 1000),
    gcTime: 2 * (60 * 1000),
}

export const useReadAllWorkspaces = (token: string | null) => {
    return useQuery({
        queryKey: ["readAllWorkspaces"],
        queryFn: () => readAllWorkspaces(token),
        ...defConfig
    });
}

export const useReadMasterWorkspace = (data: rdMastWkspPayloadType) => {
    return useQuery({
        queryKey: ["readMasterWorkspace"],
        queryFn: () => readMasterWorkspace(data),
        ...defConfig
    });
}
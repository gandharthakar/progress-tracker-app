import { readAllWorkspaces } from "@/tanstack-query/api-functions/workspace/workspaceApiFunctions"
import { useQuery } from "@tanstack/react-query"

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
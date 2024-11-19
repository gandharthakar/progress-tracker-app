import { SiteWorkspaceCompProps } from "@/types/componentsTypes";

const demo_workspaces: SiteWorkspaceCompProps[] = [
    {
        workspace_id: "workspace_1",
        workspace_title: "My Workspace 1",
        workspace_description: "This is my workspace description written by me.",
        user_id: "1"
    },
    {
        workspace_id: "workspace_2",
        workspace_title: "My Workspace 2",
        workspace_description: "",
        user_id: "1"
    },
];

export const demo_sections = [
    {
        section_id: "section_1",
        section_title: "Section 1",
        section_value: "section_1"
    },
    {
        section_id: "section_2",
        section_title: "Section 2",
        section_value: "section_2"
    }
];

export default demo_workspaces;
import React, { Dispatch, SetStateAction } from 'react';

export interface SiteDialogProps {
    open_modal_on_page_load?: boolean,
    openState: boolean,
    setOpenState: Dispatch<SetStateAction<boolean>>,
    modal_heading: string,
    backdrop?: boolean,
    hide_modal_on_backdrop_click?: boolean,
    modal_max_width?: number,
    children: React.ReactNode,
    roundedModal?: boolean,
    roundness?: string,
    closeOnEscKey?: boolean
}

export interface SiteWorkspaceCompProps {
    workspace_id: string,
    workspace_title: string,
    workspace_description: string,
    user_id: string
}

export interface labelActionsType {
    label_id: string,
    label_title: string,
    labelIndex: string | number,
    workspace_id: string,
}

export interface sectionActionType {
    section_id: string,
    section_title: string,
    sectionIndex: number,
    workspace_id: string,
    selected_tasks?: (string | undefined)[] | undefined;
}
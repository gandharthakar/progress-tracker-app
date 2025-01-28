export interface CommonAPIResponse {
    success: boolean,
    message: string,
}

export interface TQ_CBtype {
    onSuccessCB?: (resp?: (CommonAPIResponse | undefined)) => void,
    errorCB?: (resp?: (CommonAPIResponse | undefined)) => void,
    onErrorCB?: (resp?: (CommonAPIResponse | undefined)) => void,
    workspace_id?: string,
    token?: string,
    required_data_code?: string,
    user_id?: string
}
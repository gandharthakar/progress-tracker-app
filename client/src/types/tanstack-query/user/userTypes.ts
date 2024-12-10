export interface UserInfoPayloadType {
    token: string,
    required_data_code?: string
}

export interface updGenSetPayloadType {
    token: string,
    user_email: string,
    user_full_name: string
}

export interface updPwdSetPayloadType {
    token: string,
    user_password: string,
    confirm_user_password: string
}

export interface UserInfoAPIResponse {
    success: boolean,
    message: string,
    user?: {
        user_full_name?: string,
        user_email?: string,
        isEmailVerified?: boolean
    }
}

export interface TQ_CBtype_User {
    onSuccessCB?: (resp?: (UserInfoAPIResponse | undefined)) => void,
    errorCB?: (resp?: (UserInfoAPIResponse | undefined)) => void,
    onErrorCB?: (resp?: (UserInfoAPIResponse | undefined)) => void,
}
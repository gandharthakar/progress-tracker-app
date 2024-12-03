export interface TSQ_UserData {
    user_full_name?: string,
    user_email: string,
    user_password: string,
    confirm_user_password?: string
}

export interface TSQ_EmailVerify {
    token: string,
    otp: string
}

export interface CommonAPIResponseAuth {
    success: boolean,
    message: string,
    token?: string
}

export interface TQ_CBtype_Auth {
    onSuccessCB?: (resp?: (CommonAPIResponseAuth | undefined)) => void,
    errorCB?: (resp?: (CommonAPIResponseAuth | undefined)) => void,
    onErrorCB?: (resp?: (CommonAPIResponseAuth | undefined)) => void,
}

export interface UserLoginTokenType {
    exp: string,
    iat: string,
    user_id: string
}
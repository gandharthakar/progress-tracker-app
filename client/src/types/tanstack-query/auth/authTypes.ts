export interface TSQ_UserData {
    user_full_name?: string,
    user_email?: string,
    user_password?: string,
    confirm_user_password?: string,
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

export interface CommonAPIResponseAuthCheck {
    success: boolean,
    message: string,
    isEmailVerified?: boolean
}

export interface TQ_CBtype_AuthCheck {
    onSuccessCB?: (resp?: (CommonAPIResponseAuthCheck | undefined)) => void,
    errorCB?: (resp?: (CommonAPIResponseAuthCheck | undefined)) => void,
    onErrorCB?: (resp?: (CommonAPIResponseAuthCheck | undefined)) => void,
}

export interface UserLoginTokenType {
    exp: string,
    iat: string,
    user_id: string
}

export interface ResetUserPWDType {
    user_password: string,
    confirm_user_password: string,
    token: string
}

export interface reVerEmlViaOptEmlPayloadType {
    token: string,
    user_email: string
}
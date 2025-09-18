import {FormikHelpers, FormikProps, FormikValues} from "formik";
import {Dispatch, SetStateAction} from "react";

export type LoginParams = {
    email: string
    password: string
}
export type ForgotPasswordAtLoginParams = {
    email: string

}
export type ForgotPassword = {
    email: string

}

export type OtpParams = {
    key: string
    code: string
}
export type ForgotPasswordParams = {
    key: string
    code: string
    password:string
    confirm_password:string
}

export type ResendOtpParams = {
    type: 'FORGOT',
    email: string,
}

export type UserDataType = {
  "id": number,
  "uid": string;
  "firstName": string | null,
  "lastName": string | null,
  "email": string;
  "gender": string | null,
  "phoneNumber": string | null,
  "role": "CANDIDATE" | "HR" | "HOSPITAL";
  "createdAt": string;
  "updatedAt": string;
  logo: string | null;

}

export type AuthValuesType = {
    agencyOnBoardingDetails:any
    setAgencyOnBoardingDetails:any
    loading: boolean
    logout: () => void
    user: UserDataType | null
    loginAsUser: any | null
    setLoading: (value: boolean) => void
    setUser: (value: UserDataType | null) => void
    setLoginAsUser: (value: any | null) => void
    login: (params: LoginParams, actions: FormikHelpers<LoginParams>, setOtpShow: any, otpFormik: FormikProps<OtpParams>) => Promise<void>
    handleForgotPassword: (params: LoginParams, actions: FormikHelpers<LoginParams>, setOtpShow: any, otpFormikForResetPassword: FormikProps<ForgotPasswordParams>) => Promise<void>
    verifyEmail: (params: OtpParams, actions: FormikHelpers<OtpParams>, setOtpShow: any,setThankYouShow: any ) => Promise<void>
    verifyEmailForResetPassword: (params: ForgotPasswordParams, actions: FormikHelpers<ForgotPasswordParams>, setOtpShow: any,setThankYouShow: any ) => Promise<void>
    navigateToDashboard: () => Promise<void>;
    reSendOtp: (params: ResendOtpParams, setLoading: Dispatch<SetStateAction<boolean>>) => Promise<void>;
    loginTry:number,
    fetchUserData: (token: string) => Promise<void>;

}

export type LoginResult = {
    "key": string;
}

export type SuccessfulLoginResult = {
    "user": UserDataType;
    "token": string;
}

export type LoginResponse = {
    "message": string;
    "action": string | null;
    "result": LoginResult | SuccessfulLoginResult | null,
    "statusCode": number;
}

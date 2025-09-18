// ** React Imports
import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react';

// ** Next Import
import {useRouter} from 'next/router';

// ** Axios
// ** Config
import authConfig from '@/configs/auth';

// ** Types
import {
    AuthValuesType,
    ForgotPasswordParams,
    LoginParams,
    LoginResponse,
    LoginResult,
    OtpParams,
    ResendOtpParams,
    SuccessfulLoginResult,
    UserDataType,
} from './types';


import {useAuth} from '@/hooks/useAuth';
import axios from "@/@core/utils/axios";
import {FormikHelpers, FormikProps} from "formik";
import toast from "react-hot-toast";
import getHomeRoute from "@/layouts/components/acl/getHomeRoute";
import {recruiterBasicDetails} from "@/redux/apps/recruiter/actions";

// ** Defaults
const defaultProvider: AuthValuesType = {
    user: null,
    loginAsUser: null,
    loading: true,
    setUser: () => null,
    agencyOnBoardingDetails: null,
    setAgencyOnBoardingDetails: () => null,
    setLoginAsUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    handleForgotPassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    verifyEmail: () => Promise.resolve(),
    verifyEmailForResetPassword: () => Promise.resolve(),
    navigateToDashboard: () => Promise.resolve(),
    reSendOtp: () => Promise.resolve(),
    loginTry: 0,
    fetchUserData: () => Promise.resolve(),
};


const AuthContext = createContext(defaultProvider);

type Props = {
    children: ReactNode
}


const AuthProvider = ({children}: Props) => {
    // ** States
    const auth = useAuth();
    const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
    const [agencyOnBoardingDetails, setAgencyOnBoardingDetails] = useState<any | null>(defaultProvider.agencyOnBoardingDetails);
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
    const [loginAs, setLoginAs] = useState<number>(1);
    const [loginAsMerchantLoading, setLoginAsMerchantLoading] = useState<boolean>(false);
    const [loginAsUser, setLoginAsUser] = useState<any | null>(defaultProvider.loginAsUser);
    const [storedTokenValue, setStoredTokenValue] = useState<any | null>('');
    const [verifyEmailResponse, setVerifyEmailResponse] = useState<any | null>(null);
    const [reSendOtpResponse, setReSendOtpResponse] = useState<any | null>(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [loginTry, setLoginTry] = useState(0)


    useEffect(() => {
        console.log('loginas loading ', loginAsMerchantLoading)
    }, [loginAsMerchantLoading]);
    const router = useRouter();

    useEffect(() => {
        console.log("router.isReady", router.isReady);
        const initAuth = async (): Promise<void> => {
            const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!;
            if (storedToken) {
                setLoading(true);
                await axios.get((authConfig as any).meEndpoint, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                }).then(async response => {

                    window.localStorage.setItem('userData', JSON.stringify(response.data))
                    setUser({...response.data});
                    setLoading(false);

                    if (!router.pathname.includes('test')) {
                        const route = getHomeRoute(response.data);
                        await router.replace(route);
                    }
                }).catch(() => {
                        localStorage.removeItem('userData');
                        localStorage.removeItem('refreshToken');
                        localStorage.removeItem('accessToken');
                        setUser(null);
                        setLoading(false);
                        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                            router.replace('/login');
                        }
                    });


            } else {
                setLoading(false);
            }
        };

        initAuth();
    }, [loginAs, storedTokenValue]);


    const handleLogin = async (params: LoginParams, actions: FormikHelpers<LoginParams>, setOtpShow: any, otpFormik: FormikProps<OtpParams>) => {

        try {
            actions.setSubmitting(true);
            const response = await axios.post<LoginResponse>((authConfig as any).loginEndpoint, params);
            if (response.data.action === 'PROCEED_FOR_EMAIL_VERIFICATION') {
                setOtpShow(true);
                await otpFormik.setFieldValue('key', (response.data.result as LoginResult)?.key);
            } else {
                const token = (response.data.result as SuccessfulLoginResult)?.token;
                window.localStorage.setItem(authConfig.storageTokenKeyName, (response.data.result as SuccessfulLoginResult)?.token);
                await fetchUserData(token);
                const returnUrl = router.query.returnUrl;
                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';
                await router.replace(redirectURL as string);
            }
        } catch (error: any) {
            setLoginTry(loginTry + 1)
            toast.error(error?.response.data?.message);
            console.log(error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    const fetchUserData = async (token: string) => {
        try {
            const response = await axios.get(authConfig.meEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const user = response.data;
            window.localStorage.setItem('userData', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        }
    };

    const handleForgotPassword = async (params: LoginParams, actions: FormikHelpers<LoginParams>, setOtpShow: any, otpFormikForResetPassword: FormikProps<ForgotPasswordParams>) => {
        try {
            actions.setSubmitting(true);
            const response = await axios.post((authConfig as any).forgotPasswordEndpoint, params);
            console.log('responseLogin---', response);
            if (response.data) {
                setLoginTry(0)
                setOtpShow(true);
                await otpFormikForResetPassword.setFieldValue('key', (response.data.result as LoginResult)?.key);
            } else {
                window.localStorage.setItem(authConfig.storageTokenKeyName, (response.data.result as SuccessfulLoginResult)?.token);
                const returnUrl = router.query.returnUrl;
                setUser({...(response.data.result as SuccessfulLoginResult)?.user});
                window.localStorage.setItem('userData', JSON.stringify((response.data.result as SuccessfulLoginResult)?.user));
                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';
                await router.replace(redirectURL as string);
            }
        } catch (error: any) {

            toast.error(error?.response.data?.message);
            console.log('login error', error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    const verifyEmail = async (params: OtpParams, actions: FormikHelpers<OtpParams>, setOtpShow: any, setThankYouShow: any) => {
        try {
            actions.setSubmitting(true);
            const response = await axios.post<LoginResponse>((authConfig as any).verifyEmailEndpoint, params);
            console.log('response verify mail', response);

if (response){
    await agencyBasicDetails((response?.data?.result as any)?.user)
}


            if (response.data.message === "Success") {
                setOtpShow(false);
                setThankYouShow(true);
                setVerifyEmailResponse(response);
            } else {
                setOtpShow(true);
                setThankYouShow(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            actions.setSubmitting(false);
        }
    };
    const verifyEmailForResetPassword = async (params: ForgotPasswordParams, actions: FormikHelpers<ForgotPasswordParams>, setOtpShow: any, setThankYouShow: any) => {
        try {
            actions.setSubmitting(true);
            const response = await axios.post<LoginResponse>((authConfig as any).verifyOtpForRestPasswordEndpoint, params);
            console.log('response verify mail', response);
            /* window.localStorage.setItem(authConfig.storageTokenKeyName, (response.data.result as SuccessfulLoginResult)?.token);
             window.localStorage.setItem('userData', JSON.stringify((response.data.result as SuccessfulLoginResult)?.user));*/
            if (response.data.message === "Success") {
                setOtpShow(false);
                setThankYouShow(true);
                setVerifyEmailResponse(response);
            } else {
                setOtpShow(true);
                setThankYouShow(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            actions.setSubmitting(false);
        }
    };

    const reSendOtp = async (params: ResendOtpParams, setLoading: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const response = await axios.post<LoginResponse>((authConfig as any).reSendOtpEndpoint, params);
            console.log('response resend otp', response, reSendOtpResponse);
            setReSendOtpResponse(response);
        } catch (e) {
            console.error('Error resending OTP:', e);
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const agencyBasicDetails = async (user: any, setLoading?: Dispatch<SetStateAction<boolean>>) => {
        try {
            // setLoading(true);
            const response = await axios.get(`${(authConfig as any).recruiterOnboardingBasicDetails+'/'+user?.id}`);
        if(response){
                console.log('-------',response?.data)
                window.localStorage.setItem('onboarding', JSON.stringify(response?.data));

            }



        } catch (e) {
            console.error('Error resending OTP:', e);
            console.log(e);
        } finally {
            // setLoading(false);
        }
    };


    const navigateToDashboard = async () => {
        const user = (verifyEmailResponse?.data?.result as SuccessfulLoginResult)?.user

        console.log('userrrr--', user)

        if (user.role.toLowerCase() === 'hr') {

            if (((user as any)?.onboardingStatus)?.toLowerCase() !== 'onboarded') {

                // await router.replace('/agency',)
               await router.push({
                    pathname: '/agency',
                    query: { onboarding: (user as any)?.onboardingStatus },
                })
                setAgencyOnBoardingDetails(user)


            } else {

                window.localStorage.setItem(authConfig.storageTokenKeyName, (verifyEmailResponse.data.result as SuccessfulLoginResult)?.token);
                const returnUrl = router.query.returnUrl;
                setUser({...(verifyEmailResponse.data.result as SuccessfulLoginResult)?.user});
                window.localStorage.setItem('userData', JSON.stringify((verifyEmailResponse.data.result as SuccessfulLoginResult)?.user));
                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';
                await router.replace(redirectURL as string);

            }


        } else {
            window.localStorage.setItem(authConfig.storageTokenKeyName, (verifyEmailResponse.data.result as SuccessfulLoginResult)?.token);
            const returnUrl = router.query.returnUrl;
            setUser({...(verifyEmailResponse.data.result as SuccessfulLoginResult)?.user});
            window.localStorage.setItem('userData', JSON.stringify((verifyEmailResponse.data.result as SuccessfulLoginResult)?.user));
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';
            await router.replace(redirectURL as string);
        }


    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem(authConfig.storageTokenKeyName);
        router.push('/login');
    };

    const values = {
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout,
        verifyEmail,
        verifyEmailForResetPassword,
        handleForgotPassword,
        setLoginAsUser,
        loginAsUser,
        reSendOtp,
        navigateToDashboard,
        loginTry,
        agencyOnBoardingDetails,
        setAgencyOnBoardingDetails,
        fetchUserData,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}

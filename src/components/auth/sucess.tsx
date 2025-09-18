import React, {useEffect} from 'react';
import {useTheme} from "@mui/material/styles";
import Image from "next/image";
import {useRouter} from "next/router";
import {useAuth} from "@/hooks/useAuth";

interface ISuccess {
    resettingPassword:boolean;
    setResettingPassword:(val:boolean)=>void;
    setOtpShow:(val:boolean)=>void;
    setThankYouShow:(val:boolean)=>void;
}
const Sucesss = (props:ISuccess) => {
    const  router =useRouter()
    const {resettingPassword,setResettingPassword, setOtpShow,
        setThankYouShow} = props
    const theme = useTheme();
    const { navigateToDashboard, user } = useAuth();


    const basicDetails= localStorage.getItem('onboarding')
    // const parsedDetails =JSON.parse(basicDetails!)

    // console.log('parsedDetails',parsedDetails)
    const handleGoToDashboard = () => {
        navigateToDashboard();
        localStorage.removeItem('onboarding')
    };
    const handleGoToLogin = () => {
        setResettingPassword(false)
        setOtpShow(false)
        setThankYouShow(false)
    };

    useEffect(() => {
        console.log('((basicDetails && basicDetails as any)?.user?.onboardingStatus)',((JSON.parse(basicDetails!))?.user?.onboardingStatus))
    }, []);

    return (<>
            <div className={'w-full py-8 flex items-center justify-center'}>
                {resettingPassword ?
                    <div className=" w-11/12 flex items-center justify-center gap-3 flex-col ">
                        <Image src={'/images/verified.svg'} width={60} height={60} alt={'heart'}/>
                        <h2 className={'text-black font-bold'}>Password changed!</h2>
                        <span className={'w-7/12 text-center'}>You have just changed the password for your  account successfully.</span>
                        <button onClick={handleGoToLogin} type="button"
                                className="w-full login-button text-white rounded-lg p-3 mt-12">
                            Go to Login
                        </button>
                    </div>
                    : <div className=" w-11/12 flex items-center justify-center gap-3 flex-col ">
                    <Image src={'/images/verified.svg'} width={60} height={60} alt={'heart'}/>
                    <h2 className={'text-black font-bold'}>Account Verified</h2>
                    <span className={'w-7/12 text-center'}>Your account has been created successfully.</span>
                    <button onClick={handleGoToDashboard} type="button"
                            className="w-full login-button text-white rounded-lg p-3 mt-12">
                        {((JSON.parse(basicDetails!))?.user?.onboardingStatus)?.toLowerCase()!=='onboarded' ? 'Complete Your Onboarding Process First' : ' Go to Dashboard'
                        }
                    </button>
                </div>}
            </div>
        </>

    );
};

export default Sucesss;

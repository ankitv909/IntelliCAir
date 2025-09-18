'use client'
import React, {ReactNode} from 'react';
import Image from "next/image";
import BlankLayout from "@/@core/layouts/BlankLayout";
import LoginForm from "@/components/auth/loginForm";
import PopularCategory from "@/components/popular-category";
import HowWorks from "@/components/how-intellicair-works";
import FeaturedCategory from "@/components/featured-category";
import Testimonials from "@/components/client-testimonials";


const Login = () => {

    return (
        <div>
            <div className="login-background">
                <div className="flex w-full py-8">
                    <Image src={'/images/LogoLine.svg'} width={180} height={120} alt={'Logo'}/>
                </div>
                <div className="flex flex-row w-full">
                    <div className={'flex flex-col justify-start items-start lg:w-6/12'}>
                        <LoginForm/>
                    </div>
                    <div className={'flex flex-row justify-center items-start lg:w-7/12'}>
                        <div className={'hero-image'}/>
                    </div>
                </div>
            </div>

            <div className={'container bg-white'}>
                <PopularCategory/>
            </div>


            <div>
                <HowWorks/>
            </div>

            <div className={'container '} style={{backgroundColor: "#F7F7F9"}}>
                <FeaturedCategory/>
            </div>
            <div className={''}>
                <Testimonials/>
            </div>

        </div>
    );
}
Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Login.guestGuard = true

Login.middleware = 'guest'

export default Login;

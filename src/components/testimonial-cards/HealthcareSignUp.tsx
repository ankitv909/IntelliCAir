import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";

const HealthcareSignUp = () => {
    const router=useRouter()
    return (
        <div className={'bg-[#00A06C] h-52 p-5 flex justify-between w-1/2 rounded-xl relative'}>
            <div className={''}>
                <p className={'text-xl text-white pb-4'}>Healthcare Network Sign Up</p>

                <p className={'text-[10px] text-white opacity-80 pb-4 leading-[1.2]'}>Could we switch to the healthcare network <br/> sign up as in the Prototype.</p>

                <button onClick={()=>router.replace('/hospital-onboard')} className={'text-xs font-semibold flex items-center text-[#00A06C] bg-white gap-2 px-4 py-2 border-[0.2px] rounded-md'}>
                    Register Now
                    <Image src={'/images/arrow-right.svg'} alt={'arrow'} width={24} height={24}/>
                </button>
            </div>

            <div className={'flex justify-center items-center align-middle'}>
                <Image src={'images/doctor-image.svg'} className={'absolute right-0 bottom-0'} width={200} height={200} alt={'doctor'}/>
            </div>


        </div>
    );
};

export default HealthcareSignUp;

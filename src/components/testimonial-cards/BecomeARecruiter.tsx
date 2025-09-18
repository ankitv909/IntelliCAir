import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";
import Link from 'next/link'

const BecomeARecruiter = () => {
    const router=useRouter()

    return (
        <div className={'bg-[#E9E9E9] h-52 p-5 flex justify-between w-1/2 rounded-xl'}>
            <div className={''}>
                <p className={'text-xl text-[#191F33] pb-3'}>Become an
                    Agency/Recruiter</p>

                <p className={'text-[10px] text-[#636A80] leading-[1.2]'}>Enroll as a staffing agency or register as a recruiter.</p>

                <button onClick={()=>router.replace('/agency')} className={'text-xs font-semibold flex items-center text-[#00A06C] bg-white gap-2 px-4 py-2 my-2 border-[0.2px] rounded-md'}>
                    Register Now
                    <Image src={'/images/arrow-right.svg'} alt={'arrow'} width={24} height={24}/>
                </button>

                <p className={'text-[12px] text-[#636A80]'}>
                    Already Registered? <Link href="/" className="text-blue-500"> Sign-in Here</Link>
                </p>
            </div>

            <div className={'flex justify-center items-center align-middle'}>
                <Image src={'images/Frame.svg'} width={200} height={200} alt={'frame'}/>
            </div>


        </div>
    );
};

export default BecomeARecruiter;

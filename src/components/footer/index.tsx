import React from 'react';
import Image from "next/image";
import {Form, useFormik} from "formik";
import {TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Link from "next/link";

const CustomFooter = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className={'bg-black px-[5rem] w-full flex flex-col '}>
            <div className={'grid grid-cols-12 py-12'}>

                <div className={' flex flex-col gap-3 py-2.5 col-span-3'}>

                    <Image src={'images/logo.svg'} alt={'intellicair'} height={30} width={80}/>
                    <Image src={'images/intellicair.svg'} alt={'intellicair'} height={30} width={80}/>

                    <p className={'text-white text-xs'}>Empowering nurses and recruiters to find their perfect match with AI-enhanced interviews</p>

                </div>
                <div className={' grid grid-cols-3 col-span-6'}>

                        <div className={'flex flex-col max-w-min'}>
                            <p className={'text-sm font-semibold text-white pb-2'}>Company</p>
                            <Link className={'text-sm font-light text-white'} href={'/about'}>About</Link>
                            <Link className={'text-sm font-light text-white'} href={'/pricing'}>Pricing</Link>
                            <Link className={'text-sm font-light text-white'} href={'/faq'}>FAQ</Link>
                            <Link className={'text-sm font-light text-white'} href={'/blog'}>Blog</Link>
                        </div>
                        <div className={'w-[60%]'}>
                            <p className={'text-sm font-semibold text-white pb-2 '}>Help</p>
                            <Link className={'text-sm font-light text-white'} href={'/terms'}>Terms of Use</Link>
                            <Link className={'text-sm font-light text-white'} href={'/privacy'}>Privacy Policy</Link>
                        </div>
                        <div className={'w-[40%] min-w-max'}>
                            <p className={'text-sm font-semibold text-white pb-2'}>Connect</p>
                            <a className={'text-sm font-light text-white'} href={'mailto:info@intelli-care.ai'}>info@intelli-care.ai</a>

                        </div>



                    {/*Company*/}

                    {/*Terms of Use*/}
                    {/*Privacy Policy*/}
                    {/*info@intelli-care.ai*/}

                </div>
                <div className={'flex flex-col items-start w-full col-span-3'}>
                    <p className={'text-white font-semibold text-md flex justify-center pb-4'}>Stay up to Date</p>

                    <form className={'w-full flex-1 flex flex-col'} onSubmit={formik.handleSubmit}>
                        <div className={'flex w-full pb-4'}>
                            <input
                                className={'h-14 flex w-full bg-[#26282C] text-white border-[0.2px] outline-fuchsia-200 border-none'}
                                id="email"
                                name="email"
                                type="text"
                                placeholder={'Enter your email'}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />

                        </div>


                        <button type={'submit'} className={'text-[#0F62FE] text-sm font-semibold bg-white max-w-min px-8 rounded-sm py-2'}>Subscribe</button>
                    </form>


                </div>

            </div>
            <div className={'bg-black w-full border-t  py-4 border-t-gray-500'}>
                <p className={'text-center text-white text-sm w-full'}>Copyright © 2024 intellicAIr, LLC - All Rights Reserved.</p>
            </div>


        </div>
    );
};

export default CustomFooter;

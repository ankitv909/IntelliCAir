import React from 'react';
import Image from "next/image";


const HowWorks = () => {

    return (<div className={'flex py-24 flex-col px-[5rem] justify-center custom-background relative'}>

        <h2 className={'text-3xl text-center'}>How intellic<span
            className={'text-3xl font-bold text-[#18191C]'}>AI</span>r work</h2>

        {/*<Image src={'/images/arrows.svg'} className={'absolute top-28 right-[]'} alt={'arrow'} width={200}*/}
        {/*       height={200}/>*/}
        {/*<Image src={'/images/arrows1.svg'} className={'absolute top-28 left-[50%]'} alt={'arrow'} width={200}*/}
        {/*       height={200}/>*/}
        {/*<Image src={'/images/arrows.svg'} className={'absolute top-28 left-0'} alt={'arrow'} width={200} height={200}/>*/}

        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-20 px-4'}>
            {/*<div className={'absolute top-1/2 w-[100%] flex justify-center'}>*/}
            {/*<div className={'grid grid-cols-2 relative flex justify-between'}>*/}


            {/*</div>*/}

            {/*</div>*/}


            <div className={'p-2 flex flex-col gap-2 items-center justify-start'}>
                <div className={'rounded-full p-4 flex justify-center items-center bg-white'}>
                    <Image width={24} height={24} src={'images/user-plus.svg'} alt={'user'}/>
                </div>
                <p className={'text-[#18191C] text-sm'}>Create an Account</p>
                <p className={'text-[#767F8C] text-xs text-center xl:px-8'}>{`Begin your journey by creating a personalized account on Inteliciar. It only takes a few moments to set up, and it opens the door to a world of possibilities.`}</p>
            </div>
            <div className={'p-2 flex flex-col gap-2 items-center justify-start'}>
                <div className={'rounded-full p-4 flex justify-center items-center bg-white'}>
                    <Image width={24} height={24} color={'#00A06C'} src={'images/cloud-arrow-up.svg'} alt={'cloud'}/>
                </div>
                <p className={'text-[#18191C] text-sm'}>View Suggested Jobs</p>
                <p className={'text-[#767F8C] text-xs text-center xl:px-8'}>{`Once you've created your account, explore our curated selection of job listings tailored to your skills, experience, and preferences. Our advanced algorithms ensure that you see the most relevant opportunities.`}</p>
            </div>
            <div className={'p-2 flex flex-col gap-2 items-center justify-start'}>
                <div className={'rounded-full p-4 flex justify-center items-center bg-white'}>
                    <Image width={24} height={24} src={'images/magnifying-glass-plus.svg'} alt={'magnifier'}/>

                </div>

                <p className={'text-[#18191C] text-sm'}>Apply</p>
                <p className={'text-[#767F8C] text-xs text-center xl:px-8'}>{`Found a job that piques your interest? With Inteliciar, applying is a breeze. Simply click on the job listing, review the details, and submit your application directly through our platform.`}</p>
            </div>
            <div className={'p-2 flex flex-col gap-2 items-center justify-start'}>
                <div className={'rounded-full p-4 flex justify-center items-center bg-white'}>
                    <Image width={24} height={24} src={'images/circle-wavy-check.svg'} alt={'check'}/>
                </div>
                <p className={'text-[#18191C] text-sm'}>Start Your Next Adventure</p>
                <p className={'text-[#767F8C] text-xs text-center xl:px-8'}>{`Congratulations! You've taken the first step towards your dream job. Once you've applied, keep an eye on your inbox for updates from potential employers. Before you know it, you'll be embarking on a new career journey.`}</p>
            </div>


        </div>


    </div>);
};

export default HowWorks;

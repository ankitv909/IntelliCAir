import React, {useEffect} from 'react';
import Image from "next/image";
import {fetchCategories} from "@/redux/apps/dashboard/actions";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import { useDispatch, useSelector } from 'react-redux';

const jobOpenings = [{id: 1, jobTitle: "Registered Nurse", openPositions: "357 Open positions"}, {
    id: 2,
    jobTitle: "CNA / Nurse Assistant",
    openPositions: "312 Open positions"
}, {id: 3, jobTitle: "Critical Care Float", openPositions: "297 Open positions"}, {
    id: 4,
    jobTitle: "Clinical Non-Licensed",
    openPositions: "297 Open positions"
}, {
    id: 5,
    jobTitle: "Home Health Aide",
    openPositions: "204 Open positions"
},{
    id: 6,
    jobTitle: "Home Health Aide",
    openPositions: "204 Open positions"
},{
    id: 7,
    jobTitle: "Home Health Aide",
    openPositions: "204 Open positions"
},{
    id: 8,
    jobTitle: "Home Health Aide",
    openPositions: "204 Open positions"
}];

const PopularCategory = () => {
    const dispatch = useAppDispatch();
    const jobCategoryData = useAppSelector(state => state.jobs.jobCategoryData);
    const categoryLoading = useAppSelector(state => state.jobs.jobCategoryLoading);



    const categoryData = jobCategoryData?.result
    useEffect(() => {
        dispatch(fetchCategories());

        console.log("category",categoryData )
    }, [dispatch]);



    const generatePopularJobs = (
        // items: { id: number, jobTitle: string, openPositions: string }[]
        items: { _count: any ,speciality: string }[]
    ) => {
        return items?.map(item => (
                <div key={item?._count?._all} className={'rounded-md w-full border-border flex justify-between items-center'}>
                    <div className={'p-4 bg-[#CEFDE5] rounded-md flex justify-center items-center'}>

                        <Image src={'images/first-aid-kit.svg'} alt={'medical'} width={24} height={24}/>
                    </div>
                    <div className={'flex flex-col justify-start w-full gap-1 px-2'}>
                        {/*<p className={'text-sm text-bl font-semibold text-[#18191C]'}>{item.jobTitle}</p>*/}
                        <p className={'text-sm text-bl font-semibold text-[#18191C]'}>{item?.speciality}</p>
                        <p className={'text-xs font-light text-[#5E6670]'}>{`${item?._count?._all} Open positions`}</p>
                    </div>
                </div>
            )
            //         <div key={item.id} className={'rounded-md w-full border-border flex justify-between items-center'}>
            //     <div className={'p-4 bg-[#CEFDE5] rounded-md flex justify-center items-center'}>
            //
            //         <Image src={'images/first-aid-kit.svg'} alt={'medical'} width={24} height={24}/>
            //     </div>
            //     <div className={'flex flex-col justify-start w-full gap-1 px-2'}>
            //         <p className={'text-sm text-bl font-semibold text-[#18191C]'}>{item.jobTitle}</p>
            //         <p className={'text-sm text-bl font-semibold text-[#18191C]'}>{item.speciality}</p>
            //         <p className={'text-xs font-light text-[#5E6670]'}>{item.openPositions}</p>
        //     </div>
        // </div>
        )
    }


    return (<div className={'flex flex-col py-24'}>
        <div className={'flex justify-between'}>
            <h2 className={'text-4xl'}>Popular Category</h2>
            <button className={'text-xs flex items-center text-green gap-2 px-4 py-2 border-[0.2px] rounded-md'}>
                View All
                <Image src={'/images/arrow-right.svg'} alt={'arrow'} width={24} height={24}/>
            </button>
        </div>
        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 py-20 px-4'}>
            {generatePopularJobs(categoryData)}
        </div>
        {/*<div>*/}
        {/*    {categoryData?.result?.map(item => (*/}
        {/*        <p key={item.id} className="text-sm text-bl font-semibold text-[#18191C]">*/}
        {/*            {item?.speciality}*/}
        {/*        </p>*/}
        {/*    ))}*/}
        {/*</div>*/}
    </div>);
};

export default PopularCategory;

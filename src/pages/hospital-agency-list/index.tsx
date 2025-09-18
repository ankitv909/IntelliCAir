"use client";
import React, {ReactNode} from 'react';
import UserLayout from "@/layouts/UserLayout";
import {useRouter} from 'next/router'
import {useAppDispatch} from "@/redux/hooks";

const HospitalAgencyList = () => {
    const router = useRouter();
    const { bidId, bidDetails } = router.query;

    const bidDetailsData = bidDetails ? JSON.parse(bidDetails as string) : null;
    console.log('bidDetailsData', bidDetailsData);

    if (!bidDetailsData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={' w-full'}>
            <div className={'card flex gap-6 justify-center flex-col items-start'}>
                <h3 className={'px-4 py-2 w-full font-bold'}>Agency Details</h3>
                <div className={'flex flex-row gap-4 justify-start items-start px-4 py-2 w-full'}>
                    <div className={'flex flex-col gap-6 justify-center'}>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Business Name:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.businessName}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Business Email:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.businessEmail}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Business Address:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.businessAddress1},{bidDetailsData?.user?.businessInfo?.businessAddress2}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Business Telephone Number:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.businessTelephoneNumber}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Authorized Signatory Name</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.name}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Authorized Signatory Contact:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.pointOfContact}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>State:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.state}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>City:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.city}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Zip Code:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.zipCode}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Employer Identification Number:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.employerIdentificationNumber}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}>
                                <div className={'custom-list-style mr-4'}/>Created At:</span>
                            <span className={'text-black max-w-[75%]'}>{bidDetailsData?.user?.businessInfo?.createdAt}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

HospitalAgencyList.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

/*HospitalAgencyList.guestGuard = true*/

// HospitalAgencyList.middleware = 'guest'

export default HospitalAgencyList;

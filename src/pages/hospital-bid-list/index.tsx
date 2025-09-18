"use client";
import React, {ReactNode, useEffect, useState} from 'react';
import UserLayout from "@/layouts/UserLayout";
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {jobSelectors} from "@/redux/apps/dashboard/dashboard.selector";
import {bidApprove} from "@/redux/apps/hospital/actions";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {formatDayMonthYear} from "@/@core/utils/format";
import {fetchJobs} from "@/redux/apps/dashboard/actions";
import {Job} from "@/interfaces/get-all-jobs-response.interface";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const HospitalBidList = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {jobId} = router.query;
    const jobs = useAppSelector(jobSelectors.selectAll);
    const [job, setJob] = useState<Job | null>(null);
    const {bidApproveLoading} = useSelector((state: RootState) => state.jobCreate);
    const [loadingJobId, setLoadingJobId] = useState<number | null>(null);
    const [loadingBidId, setLoadingBidId] = useState<number | null>(null);

    const handleApproveClick = (jobId: number, bidId: number) => {
        setLoadingBidId(bidId);
        dispatch(bidApprove({jobId, bidId})).then(() => {
            dispatch(fetchJobs());
        }).finally(() => {
            setLoadingBidId(null);
        });
    };


    useEffect(() => {
        if (jobId && jobs.length > 0) {
            const selectedJob = jobs.find(job => job.id === parseInt(jobId as string));
            if (selectedJob) {
                setJob(selectedJob);
                console.log('Selected Job:', selectedJob);
            } else {
                console.error('Job not found');
            }
        }
    }, [jobId, jobs]);

    const calculateTimeLeft = (endDate: string | undefined): TimeLeft => {
        const difference = +new Date(endDate || "") - +new Date();
        let timeLeft: TimeLeft;

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(job?.jobDetails.bidEndDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(job?.jobDetails.bidEndDate));
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, job?.jobDetails.bidEndDate]);

    const isBidEnded = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return 'approve-status';
            case 'PENDING':
                return 'pending-status';
            case 'REJECTED':
                return 'reject-status';
            default:
                return '';
        }
    };

    return (
        <div className={' w-full'}>
            <div className={'card flex gap-4 justify-start items-center'}>
                <div className={'flex flex-row gap-4 justify-start items-start px-4 py-2 w-full'}>
                    <div className={'flex flex-col gap-4 justify-center w-[48%]'}>
                        <div className={'flex flex-row gap-2 items-start '}>
                            <span className={'font-bold text-black flex items-center'}> <div
                                className={'custom-list-style mr-4'}/>Hospital Name:</span>
                            <span className={'text-black max-w-[75%]'}>{job?.hospitalName}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start'}>
                            <span className={'font-bold text-black flex items-center'}> <div
                                className={'custom-list-style mr-4'}/>Job Speciality:</span>
                            <span className={'text-black max-w-[75%]'}>{job?.speciality}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start'}>
                            <span className={'font-bold text-black flex items-center'}><div
                                className={'custom-list-style mr-4'}/>Job Type:</span>
                            <span className={'text-black max-w-[75%]'}>{job?.jobType}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start'}>
                            <span className={'font-bold text-black flex items-center'}><div
                                className={'custom-list-style mr-4'}/>Description:</span>
                            <span className={'text-black max-w-[75%]'}>{job?.description}</span>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-4 justify-center w-[48%]'}>
                        <div className={'flex flex-row gap-2 items-start'}>
                            <span className={'font-bold text-black flex items-center'}><div
                                className={'custom-list-style mr-4'}/>Location:</span>
                            <span className={'text-black max-w-[75%]'}>{job?.city} {job?.state}</span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start'}>
                            <span className={'font-bold text-black flex items-center'}><div
                                className={'custom-list-style mr-4'}/>
                                {job?.jobType === 'PART_TIME' ? 'Hourly Pay:' : 'Salary Pay'}</span>
                            <span className={'text-black max-w-[75%]'}>
                               {job?.jobType === 'PART_TIME' ?
                                   `$${job?.jobDetails.hourlyPay}` : `$${job?.jobDetails.salaryLowerLimit} - $${job?.jobDetails.salaryUpperLimit}`}
                            </span>
                        </div>
                        <div className={'flex flex-row gap-2 items-start'}>
                            <span className={'font-bold text-black flex items-center'}> <div
                                className={'custom-list-style mr-4'}/>Bid End Timer:</span>
                            <span
                                className={'text-black max-w-[75%]'}>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 mt-4 px-0 overflow-scroll card">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                    <tr>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                User Name
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                User Email
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Contact
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Bid Amount
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Bid Created At
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Status
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Action
                            </p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {job?.Bid?.map(bid => (
                        <tr key={bid.id}>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    {/*<div className="relative h-12 w-12">
                                        <Image src={`/${bid.user.logo}`} alt={bid.user.email} layout="fill" className="rounded-full border border-blue-gray-50 bg-blue-gray-50/50" />
                                    </div>*/}
                                    <p className="block font-sans text-sm antialiased cursor-pointer font-bold underline leading-normal text-blue-gray-900" onClick={() => router.push({
                                        pathname: '/hospital-agency-list',
                                        query: {
                                            bidId: bid.id,
                                            bidDetails: JSON.stringify(bid)
                                        }
                                    })}>
                                        {bid?.user?.businessInfo?.businessName}
                                    </p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    {/*<div className="relative h-12 w-12">
                                        <Image src={`/${bid.user.logo}`} alt={bid.user.email} layout="fill" className="rounded-full border border-blue-gray-50 bg-blue-gray-50/50" />
                                    </div>*/}
                                    <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                        {bid.user.email}
                                    </p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    {/*<div className="relative h-12 w-12">
                                        <Image src={`/${bid.user.logo}`} alt={bid.user.email} layout="fill" className="rounded-full border border-blue-gray-50 bg-blue-gray-50/50" />
                                    </div>*/}
                                    <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                        {bid?.user?.businessInfo?.mobileNumber}
                                    </p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    ${bid.amount}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {formatDayMonthYear(bid.createdAt)}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="w-max">
                                    <div
                                        className={`relative items-center py-1 px-2 font-sans text-xs font-bold uppercase rounded-md whitespace-nowrap ${getStatusClass(bid.status)}`}>
                                        {bid.status}
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="w-max">
                                    <button type="button" onClick={() => handleApproveClick(job?.id, bid.id)}
                                            disabled={!(isBidEnded && !(bidApproveLoading && loadingBidId === bid.id)) || (bid.status === 'REJECTED') || (bid.status === 'APPROVED')}
                                            className={`apply-button rounded-full font-semibold w-[100%] disabled:bg-emerald-400`}>
                                        {bidApproveLoading && loadingBidId === bid.id ? 'Loading' : 'Approve'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

HospitalBidList.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

/*HospitalBidList.guestGuard = true*/

// HospitalBidList.middleware = 'guest'

export default HospitalBidList;

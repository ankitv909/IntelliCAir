import Image from "next/image";
import React from "react";
import {formatDayMonthYear, formatJobType} from "@/@core/utils/format";
import {useAppDispatch} from "@/redux/hooks";
import {Job} from "@/interfaces/get-all-jobs-response.interface";

interface PartTimeJobProps {
    partTimeJobs: Job[];
    onViewJobClick: (job: Job) => void;
}

const FeaturedPartTimeJob: React.FC<PartTimeJobProps> = ({partTimeJobs, onViewJobClick}) => {

    const dispatch = useAppDispatch();
    return (
        <div className={'py-8 flex flex-col w-full'}>
            <div className={'py-6 '}>
                <div className={'card-border-solid'}>
                    {partTimeJobs?.length === 0 ? (
                        <p className='text-center'>No Part-Time Jobs Available</p>
                    ) : (
                        <div className={'flex flex-row justify-between flex-wrap gap-y-4'}>
                            {partTimeJobs?.map(job => (
                                <div key={job.id} className={'card flex flex-col gap-4 w-6/12 '} style={{maxWidth:'49%'}}>
                                    <div className={'flex flex-row gap-4 flex-grow'}>
                                        <div className={'flex flex-col max-w-20'}>
                                            <div
                                                className="relative inline-flex mb-2 items-center justify-center w-14 h-14 overflow-hidden job-logo-bg rounded-full">
                                                <Image src={'/images/logo.svg'} width={32} height={32} alt={'Logo'}/>
                                            </div>
                                            <span className={'text-center smallText '}>Starts</span>
                                            <span
                                                className={'text-center smallText mb-2'}>{formatDayMonthYear(job?.jobDetails?.startDate)}</span>
                                            <span className={'text-center smallText'}>Ends</span>
                                            <span
                                                className={'text-center smallText'}>{formatDayMonthYear(job.jobDetails?.endDate)}</span>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <div className={'flex flex-col  mb-8'}>
                                                <h4 className={'font-medium'}>{job.speciality?job.speciality:'--'}</h4>
                                                <h6 className={'text-gray-400'}>{job?.city ? job?.city :'---'}, {job?.state ? job?.state :'--'}</h6>
                                                <h6>{job?.hospitalName ? job?.hospitalName :'--'}</h6>
                                            </div>
                                            <div
                                                className={'part-time-shade mb-2'}>{formatJobType(job.jobType, ' ')}</div>
                                            <div className={'flex flex-row gap-2 items-center'}>
                                                <span className={'smallText'}>Hourly average:</span>
                                                <span
                                                    className={'part-time-text smallText font-semibold'}> ${job?.jobDetails?.hourlyPay}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'flex flex-row gap-2 justify-end'}>
                                        {/*<button type="button" className="view-button rounded-full font-semibold">
                                            View Job
                                        </button>*/}
                                        <button type="button" onClick={() => onViewJobClick(job)}
                                                className="apply-button rounded-full font-semibold">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeaturedPartTimeJob;

import Image from "next/image";
import React from "react";
import {formatDayMonthYear, formatJobType} from "@/@core/utils/format";
import CustomPagination from "@/layouts/components/pagination/custom-pagination";
import {Job, Pagination as PaginationType} from "@/interfaces/review-jobs-response.interface";

interface OngoingBidsJobProps {
    reviewJobs: Job[];
    onViewJobClick: (job: Job) => void;
    pagination: PaginationType | null;
    onPageChange: (page: number) => void;
}

const OngoingBidsJob: React.FC<OngoingBidsJobProps> = ({reviewJobs, onViewJobClick, pagination, onPageChange}) => {
console.log('reviewJobs--',reviewJobs);
    return (
        <div className={'py-0 flex flex-col w-full'}>
            <div className={'card-border-solid'}>
                <div className={'flex flex-col gap-4 pt-4 pb-6 under-review-text'}>
                    <h3 className={'font-bold'}>Ongoing Bids </h3>
                    <span className={'font-medium'}>Lorem ipsum dolor sit amet consecrate. Gestates gravid quits in get biennium latest et interpellates. Portion faucets lacks dui mass riviera.  </span>
                </div>
                {reviewJobs.length === 0 ? (
                    <p className='text-center'>No Ongoing Bids Available</p>
                ) : (
                    <div className={'flex flex-row flex-wrap justify-start gap-4'}>
                        {reviewJobs.map(job => (
                            <div key={job.id} className={'card flex flex-col gap-4 w-[32%]'}>
                                <div className={'flex flex-row gap-4 flex-grow'}>
                                    <div className={'flex flex-col max-w-20'}>
                                        <div
                                            className="relative inline-flex mb-2 items-center justify-center w-14 h-14 overflow-hidden job-logo-bg rounded-full">
                                            <Image src={'/images/logo.svg'} width={32} height={32} alt={'Logo'}/>
                                        </div>
                                        <span className={'text-center smallText '}>Started</span>
                                        <span
                                            className={'text-center smallText mb-2'}>{formatDayMonthYear(job.jobDetails.startDate)}</span>
                                        <span className={'text-center smallText'}>Ends</span>
                                        <span
                                            className={'text-center smallText'}>{formatDayMonthYear(job.jobDetails.endDate)}</span>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <div className={'flex flex-col  mb-8'}>
                                            <h4 className={'font-medium'}>{job.speciality ? job.speciality : '--'}</h4>
                                            <h6 className={'text-gray-400'}>{job.city ? job.city : '---'}, {job.state ? job.state : '--'}</h6>
                                            <h6>{job.hospitalName ? job.hospitalName : '--'}</h6>
                                        </div>
                                        <div
                                            className={` ${job.jobType === 'PART_TIME' ? 'part-time-shade' : 'full-time-shade'} mb-2`}>{formatJobType(job.jobType, ' ')}</div>
                                        <div className={'flex flex-row gap-2 items-center'}>
                                            <span className={'smallText'}>{job.jobType === 'PART_TIME' ?'Hourly average:':'Salary' }</span>
                                            <span className={`${job.jobType === 'PART_TIME' ? 'part-time-text font-semibold' : 'full-time-text'} smallText `}> {job.jobType === 'PART_TIME'? `$${job.jobDetails.hourlyPay}` : `$${job?.jobDetails?.salaryLowerLimit} - $${job?.jobDetails?.salaryUpperLimit}` } </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={'flex flex-row gap-2 justify-end'}>
                                    <button type="button" className="view-button rounded-full font-semibold">
                                           Withdraw
                                        </button>
                                    <button type="button" onClick={() => onViewJobClick(job)} className={`${job.jobType === 'PART_TIME' ?'apply-button':'apply-blue-button' } rounded-full font-semibold`}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {pagination && (
                    <CustomPagination pagination={pagination} onPageChange={onPageChange} />
                )}
            </div>
        </div>
    );
};

export default OngoingBidsJob;

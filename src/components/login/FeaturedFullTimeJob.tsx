import Image from "next/image";
import React from "react";
import {formatJobType} from "@/@core/utils/format";
import {Job} from "@/interfaces/get-all-jobs-response.interface";


interface FullTimeJobProps {
    fullTimeJobs: Job[];
    onViewJobClick: (job: Job) => void;
}

const FeaturedFullTimeJob: React.FC<FullTimeJobProps> = ({ fullTimeJobs,onViewJobClick }) => {
    return (
        <div className={'py-8 flex flex-col w-full'}>
            {/*<div className={'part-time-card'}>*/}
            {/*    <div className={'rounded-full job-icon-card-blue'}>*/}
            {/*        <Image src={'/images/penalty-icon.svg'} width={24} height={24} alt={'Logo'}/>*/}
            {/*    </div>*/}
            {/*    <h3 className={'w-full text-center absolute full-time-text font-medium'}>Full-Time Jobs </h3>*/}
            {/*</div>*/}
            <div className={'py-6 '}>
                <div className={'card-border-solid'}>
                    <div className={'flex flex-col'}>
                        {fullTimeJobs?.length === 0 ? (
                            <p className='text-center p-4'>No full-time jobs available</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {fullTimeJobs?.map(job => (
                                    <div key={job.id} className="card flex flex-col gap-4">
                                        <div className={'flex flex-row gap-4'}>
                                            <div className="relative inline-flex mb-2 items-center justify-center w-14 h-14 overflow-hidden job-logo-bg rounded-full">
                                                <Image src={'/images/logo.svg'} width={32} height={32} alt={'Logo'}/>
                                            </div>
                                            <div className={'flex flex-col w-full'}>
                                                <div className={'flex flex-col mb-8'}>
                                                    <h4 className={'font-medium'}>{job.speciality}</h4>
                                                    <h6 className={'text-gray-400'}>{job.city ? job.city : '---'}, {job.state ? job?.state : '---'}, USA</h6>
                                                    <h6>{job?.hospitalName ? job?.hospitalName: '---'}</h6>
                                                </div>
                                                <div className={'full-time-shade mb-2'}>{formatJobType(job.jobType, ' ')}</div>
                                                <div className={'flex flex-row gap-2 items-center'}>
                                                    <span className={'smallText'}>Salary:</span>
                                                    <span className={'full-time-text smallText'}> ${job?.jobDetails?.salaryLowerLimit} - ${job?.jobDetails?.salaryUpperLimit}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-end">
                                            {/* <button type="button" className="view-button rounded-full font-semibold">
                                                View Job
                                            </button>*/}
                                            <button onClick={() => onViewJobClick(job)} type="button" className="apply-blue-button rounded-full font-semibold">
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

        </div>
    );
};

export default FeaturedFullTimeJob;

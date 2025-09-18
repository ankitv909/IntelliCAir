"use client";
import React, {ReactNode, useEffect, useState} from 'react';
import PartTimeJob from "@/components/dashboard/part-time-job";
import FullTimeJob from "@/components/dashboard/full-time-job";
import UserLayout from "@/layouts/UserLayout";
import {fetchJobs} from "@/redux/apps/dashboard/actions";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {jobSelectors} from "@/redux/apps/dashboard/dashboard.selector";
import Bidding from "@/components/recruiter/Bidding";
import OngoingBidsJob from "@/components/dashboard/ongoing-bids";
import {fetchReviewJobs} from "@/redux/apps/recruiter/actions";


const AgencyDashboardPage = () => {
    const [showBidding, setShowBidding] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const dispatch = useAppDispatch();
    const jobs = useAppSelector(jobSelectors.selectAll);
    const jobsLoading = useAppSelector(state => state.jobs.jobsLoading);
    const jobsError = useAppSelector(state => state.jobs.jobsError);

    const partTimeJobs = jobs.filter(job => job.jobType === 'PART_TIME');
    const fullTimeJobs = jobs.filter(job => job.jobType === 'FULL_TIME');
    const pagination = useAppSelector(state => state.recruiter.pagination);

    const [reviewCurrentPage, setReviewCurrentPage] = useState(1);
    const reviewJobs = useAppSelector(state => state.recruiter.jobs);
    const reviewJobsPagination = useAppSelector(state => state.recruiter.pagination);


    /*console.log('Jobs:', jobs);
    console.log('Part Time Jobs:', partTimeJobs);
    console.log('Full Time Jobs:', fullTimeJobs);*/


    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    const handleViewJobClick = (job: any) => {
        setSelectedJob(job);
        setShowBidding(true);
    };

    useEffect(() => {
        dispatch(fetchReviewJobs({ page: reviewCurrentPage, perPage: 3 }));
    }, [dispatch, reviewCurrentPage]);

    const handleReviewPageChange = (page: number) => {
        setReviewCurrentPage(page);
    };


    return (
        <div className={' w-full'}>
            <div className={'flex flex-row justify-between gap-4'}>
                <div className={'flex flex-col w-full'}>
                    <div className={'dream-job-bg flex flex-col gap-2 items-center'}>
                        <h1>Uncover elite talent with Next Level</h1>
                        {/*<h6>1 lakh+ jobs for you to explore</h6>*/}
                    </div>
                    <div className={'flex flex-row justify-between gap-4'}>
                        {jobsLoading ? (
                            <p>Loading jobs...</p>
                        ) : jobsError ? (
                            <p>Error loading jobs: {jobsError}</p>
                        ) : (
                            <>
                                <div className="w-8/12">
                                    <PartTimeJob partTimeJobs={partTimeJobs} onViewJobClick={handleViewJobClick}/>
                                </div>
                                <div className="w-4/12">
                                    <FullTimeJob fullTimeJobs={fullTimeJobs} onViewJobClick={handleViewJobClick}/>
                                </div>
                            </>
                        )}
                    </div>
                    {/*<OngoingBidsJob
                        reviewJobs={reviewJobs}
                        onViewJobClick={handleViewJobClick}
                        pagination={pagination}
                        onPageChange={handleReviewPageChange}
                    />*/}
                </div>
            </div>
            {showBidding && selectedJob && <Bidding job={selectedJob}
                open={showBidding} handleClose={() => setShowBidding(false)}/>}
        </div>
    );
};

AgencyDashboardPage.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

AgencyDashboardPage.guestGuard = false

// AgencyDashboardPage.middleware = ''

export default AgencyDashboardPage;

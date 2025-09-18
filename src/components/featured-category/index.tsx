import React, {useState, useEffect} from 'react';
import Image from "next/image";
import {fetchFeatured} from "@/redux/apps/dashboard/actions";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import PartTimeJob from "@/components/login/FeaturedPartTimeJob";
import FullTimeJob from "@/components/login/FeaturedFullTimeJob";

interface IFeaturedJob {
    id: number;
    jobTitle: string;
    jobType: string;
    salary: string;
    companyName: string;
    location: string;
    favorite: boolean;
    companyLogo: string;
}

const FeaturedCategory = () => {

    const dispatch = useAppDispatch();
    const jobFeaturedData = useAppSelector(state => state.jobs.jobFeaturedData);
    const jobFeaturedLoading = useAppSelector(state => state.jobs.jobFeaturedLoading);
    const [showChat, setShowChat] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const featuredData = jobFeaturedData?.result;
    const partTimeJobs = featuredData?.filter((job: IFeaturedJob) => job.jobType === 'PART_TIME');
    const fullTimeJobs = featuredData?.filter((job: IFeaturedJob) => job.jobType === 'FULL_TIME');


    console.log('jobFeaturedData:', jobFeaturedData);
    console.log('Part Time Jobs:', partTimeJobs);
    console.log('Full Time Jobs:', fullTimeJobs);

    const handleViewJobClick = (job:any) => {
        setSelectedJob(job);
        setShowChat(true);
    };

    useEffect(() => {
        dispatch(fetchFeatured());

        console.log("featured",featuredData )
    }, [dispatch]);


    const generateFeaturedJobs = (items: IFeaturedJob[]) => {
        return items?.map(item => <div key={item.id}
                                       className={'rounded-md border-[0.1px] border-border p-2 w-full  flex justify-between items-center featuredJobTile'}>
            <div className={'flex flex-col justify-start w-full gap-1'}>
                <div className={'min-w-max'}>
                    <p className={'text-sm text-bl font-semibold text-[#18191C]'}>{item.jobTitle}</p>
                </div>

                <div className={'flex gap-1'}>
                    <div className={'flex min-w-max px-2 rounded-sm justify-between items-center bg-[#E7EDF6] '}>
                        <p className={'text-xs font-semibold text-green'}>
                            {item.jobType}
                        </p>

                    </div>
                    <div>
                        <p className={'  min-w-max text-xs font-light text-[#767F8C]'}>
                            Salary:{item.salary}
                        </p>


                    </div>
                </div>
                <div className={'pt-2 rounded-md flex justify-start items-start gap-2 '}>

                    <div className={'flex justify-center items-center '}>
                        <Image src={'images/logo.svg'} alt={'logo'} width={32} height={32}/>
                    </div>
                    <div className={'flex flex-col flex-grow justify-start items-start'}>
                        <p className={'text-sm text-[#18191C]'}>{item.companyName}</p>
                        <p className={'text-[10px] leading-[1.2]  flex items-center justify-start'}><Image src={'images/MapPin.svg'} width={12} height={12} alt={'map'} /> {item.location}</p>
                    </div>
                    <div className={'flex self-center'}>
                        <Image src={'images/BookmarkSimple.svg'} width={22} height={22} alt={'map'} />
                    </div>

                </div>

            </div>

        </div>)

    }
    return (
        <div className={'flex flex-row justify-between gap-4 '}  >

            {jobFeaturedLoading ? (
                <p>Loading featured jobs...</p>
            ) : (
                <>
                    <div className="w-8/12">
                        <h2 className={'text-4xl pt-10'}>Featured Jobs</h2>
                        <PartTimeJob partTimeJobs={partTimeJobs} onViewJobClick={handleViewJobClick}/>
                    </div>
                    <div className="w-4/12 pt-20">
                    <FullTimeJob fullTimeJobs={fullTimeJobs} onViewJobClick={handleViewJobClick}/>
                    </div>
                </>
            )}
        </div>
    )
};

export default FeaturedCategory;

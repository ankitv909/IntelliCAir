"use client";
import React, {ReactNode, useEffect, useState} from 'react';
import Chat from "@/components/chat-bot/Chat";
import UserLayout from "@/layouts/UserLayout";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import FirstHospital from "@/components/hospital/modal/FirstHospital";
import SecondHospital from "@/components/hospital/modal/SecondHospital";
import ThirdHospital from "@/components/hospital/modal/ThirdHospital";
import FourthHospital from '@/components/hospital/modal/FourtHospital'
import FifthHospital from "@/components/hospital/modal/FifthHospital";
import {Dialog, DialogContent} from '@mui/material';
import DialogTitle from "@mui/material/DialogTitle";
import {fullTimeJobCreate, IFullTimeJobCreate, IPartTimeJobCreate, partTimeJobCreate} from "@/redux/apps/hospital/actions";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import SixthHospital from "@/components/hospital/modal/SixthHospital";
import {jobSelectors} from "@/redux/apps/dashboard/dashboard.selector";
import {fetchJobs} from "@/redux/apps/dashboard/actions";
import Image from "next/image";
import {formatDayMonthYear, formatJobType} from "@/@core/utils/format";
import {styled} from '@mui/system';
import {Tabs} from '@mui/base/Tabs';
import {TabsList as BaseTabsList} from '@mui/base/TabsList';
import {TabPanel as BaseTabPanel} from '@mui/base/TabPanel';
import {buttonClasses} from '@mui/base/Button';
import {Tab as BaseTab, tabClasses} from '@mui/base/Tab';
import {useRouter} from "next/router";
import {Job} from "@/interfaces/get-all-jobs-response.interface";


const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  //width: 100%;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
      //background-color: ${blue[400]};
  }

  &:focus {
      // &.${tabClasses.selected} {
    //   background-color: #fff;
      //   color: ${blue[600]};
    // }
    //color: #fff;
      //outline: 3px solid ${blue[200]};
  }

  //

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
    ({theme}) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  // padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  // opacity: 0.6;
  `,
);

const TabsList = styled(BaseTabsList)(
    ({theme}) => `
  min-width: 400px;
  // background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 24px 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  align-content: space-between;
  display: flex;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const HospitalPage = () => {
    const dispatch = useAppDispatch();
    const [showChat, setShowChat] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [amlOpen, setAmlOpen] = React.useState<boolean>(false);
    const [amlComplete, setAmlCompleted] = React.useState<boolean>(false);
    const [activeStep, setActiveStep] = useState(0);
    const [submitModal, setSubmitModal] = React.useState<boolean>(false);
    const [jobType, setJobType] = useState<string>('part-time');
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const jobs: Job[] = useAppSelector(jobSelectors.selectAll);
    const jobsLoading = useAppSelector(state => state.jobs.jobsLoading);
    const jobsError = useAppSelector(state => state.jobs.jobsError);
    const router = useRouter()


    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    useEffect(() => {
        if (jobs.length > 0 && !selectedSpecialty) {
            setSelectedSpecialty(jobs[0].speciality);
        }
    }, [jobs]);

    const handleBidListShow = (jobId: number) => {
        router.push({
            pathname: '/hospital-bid-list',
            query: {jobId: jobId}
        });
    };


    const handleOpen = (type: string) => {
        setJobType(type);
        setOpen(true);
        console.log(type);
    };

    const handleClose = () => {
        setOpen(false);
        setActiveStep(0);
        setFormData({});
        setErrorMessage('');
    };

    const handleNext = (newData: {}) => {
        setFormData(prev => ({...prev, ...newData}));
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleSubmit = async (values: any) => {
        try {
            if (jobType === 'full-time') {
                const fullTimeData = {...formData, ...values, totalApplicants: 10};
                await dispatch(fullTimeJobCreate(fullTimeData as IFullTimeJobCreate)).unwrap();
            } else {
                const partTimeData = {...formData, ...values};
                await dispatch(partTimeJobCreate(partTimeData as IPartTimeJobCreate)).unwrap();
            }
            handleNext({});
            dispatch(fetchJobs());
        } catch (error) {
            setErrorMessage('Failed to submit the form. Please try again.');
        }
    };

    const steps = [
        <FirstHospital key={"0"} handleNext={handleNext} jobType={jobType}/>,
        <SecondHospital key={"1"} handleNext={handleNext} handleBack={handleBack} jobType={jobType}
                        setJobType={setJobType}/>,
        <ThirdHospital key={"2"} handleNext={handleNext} handleBack={handleBack} jobType={jobType}/>,
        <FourthHospital key={"3"} handleNext={handleNext} handleBack={handleBack} jobType={jobType}/>,
        <FifthHospital key={"4"} handleNext={handleSubmit} handleBack={handleBack} setOpen={setOpen} jobType={jobType}
                       selectedSpecialty={selectedSpecialty}/>,
        <SixthHospital key={"5"} handleNext={handleNext} handleClose={handleClose} handleBack={handleBack}
                       setOpen={setOpen} jobType={jobType}/>,
    ];


    const uniqueSpecialties = Array.from(new Set(jobs.map(job => job.speciality)));
    const sortedJobs = [...jobs].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
    });
    const filteredJobs = selectedSpecialty ? sortedJobs.filter(job => job.speciality === selectedSpecialty) : sortedJobs;

    return (
        <div className={' w-full px-4'}>
            <Dialog sx={{padding: "0px 0px"}} PaperProps={{sx: {borderRadius: "20px", minWidth: "900px"}}} open={open}
                    onClose={handleClose}>
                {
                    activeStep !== 5 ? <DialogTitle sx={{padding: 0}}>
                        <Typography component={"h2"} sx={{
                            backgroundColor: '#008059',
                            color: 'white',
                            padding: 5,
                            fontWeight: "bold"
                        }}>
                            intellicAIr - Job Creator
                        </Typography></DialogTitle> : <></>
                }

                <DialogContent
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 1) !important',
                        padding: `${activeStep === 6 ? '0px' : ''}`
                    }}>{steps[activeStep]}</DialogContent>
            </Dialog>
            <div className={'flex flex-row justify-between gap-4'}>
                <div className={'flex flex-col w-full'}>
                    <div className={' flex flex-col gap-2 items-start  pr-60'}>
                        <h1 className={""}>Tailor your job selections to match your preferences</h1>
                        {/*<h6>Lorem ipsum dolor sit amet consectetur. Egestas gravida luctus in eget bibendum laoreet et*/}
                        {/*    pellentesque. Porttitor faucibus lacus dui massa viverra. </h6>*/}
                    </div>
                    <div className={'flex justify-between items-center my-5 gap-4 w-full'}>
                        <div className={'bg-white mr-2 p-5 rounded-xl w-1/2'}>
                            <h3 className={'font-bold pt-2'}>Part Time Jobs</h3>

                            <h6 className={"pt-1"}>The job posting requires individuals to be available for shifts as
                                needed with the agency.</h6>
                            <div className={"w-full flex justify-end items-center "}>
                                <Button
                                    disabled={submitModal}
                                    onClick={() => handleOpen('part-time')}
                                    sx={{
                                        backgroundColor: "rgba(11, 160, 44, 1)",
                                        color: "white",
                                        fontSize: "14px",
                                        mt: 10,
                                        py: 4,
                                        px: 5,
                                        borderRadius: '2rem',
                                        '&:hover': {
                                            backgroundColor: "rgba(11, 160, 44, 1) !important",
                                            color: "white !important",
                                        }
                                    }}

                                >Post Part time job</Button>
                            </div>

                        </div>
                        <div className={'bg-white mr-2 p-5 rounded-xl w-1/2'}>
                            <h3 className={'font-bold pt-2'}>Full Time Jobs</h3>

                            <h6 className={"pt-1"}>The job posting seeks candidates available for shifts as needed, with
                                the potential for full-time employment with the agency.</h6>
                            <div className={"w-full flex justify-end items-center "}>
                                <Button disabled={submitModal}
                                        onClick={() => handleOpen('full-time')}
                                        sx={{
                                            backgroundColor: "rgba(76, 40, 255, 1)",
                                            color: "white",
                                            fontSize: "14px",
                                            mt: 10,
                                            py: 4,
                                            px: 5,
                                            borderRadius: '2rem',
                                            '&:hover': {
                                                backgroundColor: "rgba(76, 40, 255, 1) !important",
                                                color: "white !important",
                                            }
                                        }}

                                >Post Full time job</Button>
                            </div>
                        </div>

                    </div>
                    <Box sx={{border: '1px solid rgba(207, 197, 255, 1)', borderRadius: "20px", p: 6}}>
                        <div>
                            <h2 className={'font-bold pb-4'}>Job Postings</h2>
                            <Tabs value={selectedSpecialty} onChange={(event, newValue: any) => setSelectedSpecialty(newValue)}>
                                <TabsList>
                                    {uniqueSpecialties.map((speciality, index) => (
                                        <Tab key={index} value={speciality}>
                                            <Box
                                                sx={{
                                                    border: '1px solid rgba(76, 40, 255, 1)',
                                                    borderRadius: '20px',
                                                    px: 4,
                                                    py: 2,
                                                    color: 'black',
                                                    background: (speciality === selectedSpecialty) ? 'linear-gradient(105deg, rgba(76, 40, 255, 0.28) -4.28%, rgba(255, 255, 255, 0.51) 98.28%)' : 'transparent'
                                                }}
                                            >
                                                <Typography sx={{color: 'rgba(76, 40, 255, 1)', fontWeight: '500'}}>
                                                    {speciality}
                                                </Typography>
                                            </Box>
                                        </Tab>
                                    ))}
                                </TabsList>

                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        overflowX: 'auto'
                                    }}
                                >
                                    {filteredJobs.length === 0 ? (
                                        <p className='text-center'>No Jobs Available</p>
                                    ) : (
                                        <div className={'flex flex-row gap-4'}>
                                            {filteredJobs.map(job => (
                                                <TabPanel key={job.id} value={job.speciality}>
                                                    <div className={'card flex flex-col gap-4 w-80'}>
                                                        <div className={'flex flex-row gap-4 '}>
                                                            <div className={'flex flex-col max-w-20'}>
                                                                <div
                                                                    className="relative inline-flex mb-2 items-center justify-center w-14 h-14 overflow-hidden job-logo-bg rounded-full">
                                                                    <Image src={'/images/logo.svg'} width={32}
                                                                           height={32} alt={'Logo'}/>
                                                                </div>
                                                                <div
                                                                    className="flex justify-start flex-col items-center py-1">
                                                                    {/* <div><PermIdentityIcon/></div>*/}
                                                                    <span
                                                                        className={'text-center smallText '}>Bid Count</span>
                                                                    <span
                                                                        className={'text-center smallText mb-2'}>{job?.jobDetails?.bidCount}</span>
                                                                </div>
                                                                <span
                                                                    className={'text-center smallText '}>Started</span>
                                                                <span
                                                                    className={'text-center smallText mb-2'}>{formatDayMonthYear(job?.jobDetails?.startDate)}</span>
                                                                <span
                                                                    className={'text-center smallText'}>Ends</span>
                                                                <span
                                                                    className={'text-center smallText'}>{formatDayMonthYear(job?.jobDetails?.endDate)}</span>
                                                            </div>
                                                            <div className={'flex flex-col w-full'}>
                                                                <div className={'flex flex-col mb-8'}>
                                                                    <h4 className={'font-medium'}>{job.speciality ? job.speciality : '--'}</h4>
                                                                    <h6 className={'text-gray-400'}>{job.city ? job.city : '---'}, {job.state ? job.state : '--'}</h6>
                                                                    <h6>{job.hospitalName ? job.hospitalName : '--'}</h6>
                                                                </div>
                                                                <div
                                                                    className={`${job.jobType === 'PART_TIME' ? 'part-time-shade' : 'full-time-shade'} mb-2`}>{formatJobType(job.jobType, ' ')}</div>
                                                                {job.jobType === 'PART_TIME' && (
                                                                    <div className={'flex flex-row gap-2 items-center'}>
                                                                        <span
                                                                            className={'smallText'}>Hourly average:</span>
                                                                        <span
                                                                            className={'part-time-text smallText font-semibold'}>${job?.jobDetails?.hourlyPay}</span>
                                                                    </div>
                                                                )}
                                                                {job.jobType === 'FULL_TIME' && (
                                                                    <div className={'flex flex-row gap-2 items-center'}>
                                                                        <span className={'smallText'}>Salary:</span>
                                                                        <span
                                                                            className={'full-time-text smallText'}> ${job?.jobDetails?.salaryLowerLimit} - ${job?.jobDetails?.salaryUpperLimit}</span>
                                                                    </div>
                                                                )}
                                                                <div className={'flex gap-2 justify-end mt-2'}>
                                                                    <button type="button"
                                                                            onClick={() => handleBidListShow(job.id)}
                                                                            className={`${job.jobType === 'PART_TIME' ? 'apply-button' : 'apply-blue-button'} rounded-full font-semibold max-w-[80%]`}>
                                                                        Bid Approve
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            ))}
                                        </div>
                                    )}
                                </Box>
                            </Tabs>
                        </div>
                    </Box>
                </div>
            </div>
            {showChat && selectedJob && <Chat job={selectedJob} onClose={() => setShowChat(false)}/>}
        </div>
    );
};

HospitalPage.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

/*HospitalPage.guestGuard = true*/

// HospitalPage.middleware = 'guest'

export default HospitalPage;

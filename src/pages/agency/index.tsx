// @flow
// import * as React from 'react';
import React, {ReactNode, useEffect, useState} from 'react';
import Image from "next/image";
import BlankLayout from "@/@core/layouts/BlankLayout";
import Grid from '@mui/material/Grid';
import {Box, StepConnector, stepConnectorClasses} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useFormik} from 'formik';
import Divider from '@mui/material/Divider';
import {styled} from '@mui/system';
import {Check} from '@mui/icons-material';
import {FirstStep} from "@/@core/components/agencySteps/FirstStep";
import {SecondStep} from "@/@core/components/agencySteps/SecondStep";
import {ThirdStep} from "@/@core/components/agencySteps/ThirdStep";
import {ForthStep} from "@/@core/components/agencySteps/ForthStep";
import {LastStep} from "@/@core/components/agencySteps/LastStep";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {recruiterBasicDetails} from "@/redux/apps/recruiter/actions";
import {useAuth} from "@/hooks/useAuth";

const QontoConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 26, left: 'calc(-50% + 50px)', right: 'calc(50% + 80px)',

    }, [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#00A06C',

        },
    }, [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#00A06C',
        },
    }, [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 12,
        borderRadius: 10,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(({theme, ownerState}) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#00A06C',
    display: 'flex',
    height: 60,
    alignItems: 'center', ...(ownerState.active && {
        color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
        width: 60, height: 60, borderRadius: '50%', backgroundColor: '#00A06C', color: 'white'
    },
    '& .QontoStepIcon-circle': {
        width: 60, height: 60, borderRadius: '50%', backgroundColor: '#eaeaf0', color: 'rgba(111, 108, 143, 1)'
    },
}),);

function QontoStepIcon(props: any) {
    const {active, completed, className, title} = props;
    // @ts-ignore
    return (title != 5 ? <QontoStepIconRoot ownerState={{active}} className={className}>
        {completed || active ? (<Box className="QontoStepIcon-completedIcon">
            <Box sx={{pt: 5, textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem'}}>{completed ?
                <Check/> : title}</Box>
        </Box>) : (<Box className="QontoStepIcon-circle">
            <Box sx={{pt: 5, textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem'}}>{title}</Box>
        </Box>)}
    </QontoStepIconRoot> : null);
}

const Agency = () => {

    const router = useRouter()
    const {
        agencyOnBoardingDetails,setAgencyOnBoardingDetails
    } = useAuth()
    const dispatch = useAppDispatch()
    const {onboarding, userId} = router.query
    const steps = ['Step1', 'Step2', 'Step3', 'Step4', 'Thank You'];
    const [currentStep, setCurrentStep] = useState(0);
    const basicDetails = useAppSelector(state => state.recruiter.basicDetails)

    useEffect(() => {
        const agencyOnboardingDetails = sessionStorage.getItem('onboarding')
        if (userId) {
            dispatch(recruiterBasicDetails({
                userId: userId
            }))
        }
        if (agencyOnboardingDetails) {
            const parsed = JSON.parse(agencyOnboardingDetails!)
            dispatch(recruiterBasicDetails({
                userId: parsed?.userId
            }))
        }

    }, [userId, currentStep]);

    useEffect(() => {
const newData={}
        console.log('combined--',basicDetails,agencyOnBoardingDetails)
        Object.assign(newData,agencyOnBoardingDetails,basicDetails)

        console.log('newdata--',newData)
if(basicDetails){
    setAgencyOnBoardingDetails(newData)
}

        console.log('basic deatils--', basicDetails)
    }, [router.query]);


    useEffect(() => {

        switch (currentStep) {
            case 0: {
                router.push({query: {onboarding: 'BASIC'}});
            }
                break;
            case 1: {
                router.push({query: {onboarding: 'BANK_VERIFICATION'}});

            }
                break;
            case 2: {
                router.push({query: {onboarding: 'CREDIT_CHECK'}});
            }
                break;
            case 3: {
                router.push({query: {onboarding: 'ESCROW_AGREEMENT'}});
            }
                break;
            case 4: {

            }
                break;

            default: {

            }

        }
    }, [currentStep]);

    // useEffect(() => {
    //     const agencyOnboardingDetails = sessionStorage.getItem('onboarding')
    //     console.log('agencyOnboardingDetails---', JSON.parse(agencyOnboardingDetails!))
    //     if (onboarding) {
    //         switch (onboarding) {
    //             case 'BASIC': {
    //                 setCurrentStep(1)
    //                 // return (<FirstStep currentStep={currentStep} setCurrentStep={setCurrentStep}/>);
    //             }
    //                 break;
    //             case 'BANK_VERIFICATION': {
    //                 setCurrentStep(2)
    //                 // return (<SecondStep currentStep={currentStep} setCurrentStep={setCurrentStep}/>);
    //             }
    //                 break;
    //             case 'CREDIT_CHECK': {
    //                 setCurrentStep(3)
    //                 // return (<SuccessView title={ 'KYB completed successfully' } subtitle={ 'Congratulations! You Have Successfully Completed\nThe KYC Process For An ISO On MCardit' } primaryButton={ true } primaryButtonTitle={ 'Go to Dashboard' } primaryButtonLink={ '/admin-dashboard' }/>);
    //                 // return (<ThirdStep currentStep={currentStep} setCurrentStep={setCurrentStep}/>);
    //             }
    //                 break;
    //             case 'ESCROW_AGREEMENT': {
    //                 setCurrentStep(4)
    //                 // return (<ForthStep currentStep={currentStep} setCurrentStep={setCurrentStep}/>);
    //             }
    //                 break;
    //             // case 'ONBOARDED': {
    //             //     return (<LastStep currentStep={currentStep} setCurrentStep={setCurrentStep}/>);
    //             // }
    //
    //             default: {
    //                 setCurrentStep(4)
    //             }
    //
    //         }
    //
    //
    //     }
    //
    // }, [router.query]);
    const stepRenderer = (activeStep: number) => {
        switch (activeStep) {
            case 0: {
                return (
                    <FirstStep currentStep={currentStep} basicDetails={basicDetails} setCurrentStep={setCurrentStep}/>);
            }

            case 1: {
                return (<SecondStep currentStep={currentStep} basicDetails={basicDetails}
                                    setCurrentStep={setCurrentStep}/>);
            }

            case 2: {
                return (
                    <ThirdStep currentStep={currentStep} basicDetails={basicDetails} setCurrentStep={setCurrentStep}/>);
            }

            case 3: {
                return (
                    <ForthStep currentStep={currentStep} basicDetails={basicDetails} setCurrentStep={setCurrentStep}/>);
            }

            case 4: {
                return (
                    <LastStep currentStep={currentStep} basicDetails={basicDetails} setCurrentStep={setCurrentStep}/>);
            }


            default: {
                return <></>;
            }

        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: '', lastName: '', email: '',
        }, onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (<Box>
        {/*<Box component={ 'div' } sx={ {gap: '16px', borderRadius: 2, display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'row', backgroundColor: '#F9FAFC', py: 8, px: 10, mb: 8} }>*/}

        {/*</Box>*/}
        <Image src={'/images/LogoLine.svg'} style={{margin: '2rem 6rem'}} width={180} height={120} alt={'Logo'}/>
        <Box component={'div'}
             sx={{backgroundColor: '#FFFFFF', borderRadius: '12px', padding: 5, margin: '0rem 6rem'}}>

            <Grid container sx={{display: 'flex'}}>

                <Box sx={{width: '100%', padding: '16px 0px 40px 0px'}}>
                    <Stepper alternativeLabel activeStep={currentStep} connector={<QontoConnector/>}>
                        {steps.map((label, currIndex) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            /*if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }*/
                            return currIndex === 5 ? null : <Step key={label} {...stepProps} expanded>
                                <StepLabel {...labelProps} StepIconComponent={QontoStepIcon}
                                           StepIconProps={{title: ((currIndex + 1).toString())}}>

                                    {/*<Typography variant="subtitle2"*/}
                                    {/*            sx={{fontWeight: 'bold', color: '#191919'}}>{label}</Typography>*/}
                                </StepLabel>

                            </Step>
                        })}
                    </Stepper>

                </Box>

                {/*</Grid>*/}
            </Grid>
            <Divider sx={{border: '1px solid #E8EAEE'}}/>
            <Grid container sx={{justifyContent: 'center'}}>
                {stepRenderer(currentStep)}
            </Grid>
        </Box>
    </Box>);
};


Agency.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Agency.guestGuard = true

Agency.middleware = 'guest'

export default Agency;

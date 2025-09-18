// @flow
import * as React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
// import {AppDispatch, RootState} from '@/store';
import {unwrapResult} from '@reduxjs/toolkit';

import toast from "react-hot-toast";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {Router} from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import EastIcon from '@mui/icons-material/East';
import CreditCheck from './modals/CreditCheckModal'
import EscrowVerificationModal from './modals/EscrowVerificationModal';
import AchVerificationModal from './modals/AchVerificationModal'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {recruiterCreditCheck, recruiterEscrowAgreement} from "@/redux/apps/recruiter/actions";
import {useAppDispatch} from "@/redux/hooks";
import {useAuth} from "@/hooks/useAuth";






// import {createIso} from "@/store/apps/iso";

// type Props = {
//     currentStep: number,
//     setCurrentStep: any,
//     setIso: any,
// };



export const ForthStep = (props: any) => {
    const dispatch=useAppDispatch()
    const {agencyOnBoardingDetails}=useAuth();
    const {currentStep, setCurrentStep} = props;
    const [escrowSubmitModal, setEscrowSubmitModal] = React.useState(false);
    const [achSubmitModal, setAchSubmitModal] = React.useState(false);



    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [openEscrow, setOpenEscrow] = React.useState(false);
    const [openAch, setOpenAch] = React.useState(false);
    const [value, setValue] = React.useState('female');


    const handleSubscriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };


    interface MyValues {
        subscription: string

    }
    const validationSchema = yup.object().shape({
        subscription: yup
            .string()
            .trim()
            .min(2, ' Name should be of minimum 2 characters length.')
            .max(100, ' Name should be of ,maximum 100 characters length.')
            .required(' Name is required.'),

    });


    const formik = useFormik<MyValues>({
        initialValues: {
            subscription: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const agencyOnboardingDetails= sessionStorage.getItem('onboarding')
            const parsed=JSON.parse(agencyOnboardingDetails!)
            const {
                subscription
            } = values;
            const mappedData:any = {
                userId:agencyOnBoardingDetails?.userId,
                escrowStatus:'VERIFIED',
                achStatus:'VERIFIED',
                subscription
            };

            try {
              const res=await dispatch(recruiterEscrowAgreement(mappedData)).then(unwrapResult)
               if (res) {
                   setCurrentStep(currentStep + 1)
                   console.log("Form submitted: ", values);
               }

            }catch (e:any) {
                toast.error(e.message)
            }
            // postISOData({...values, commission: +values.commission}).then(console.log);
        },
    });

    const handleEscrowCheck = () => {
        setOpenEscrow(true);
    };
    const handleAchCheck = () => {
        setOpenAch(true);
    };

    React.useEffect(() => {
        console.log('Form error: ', formik.errors);
        console.log('Form values: ', formik.values);
        // console.log('Form initialValues: ', initialValues);
    }, [formik.values]);


    return (
        <Box component={'div'} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            p: 5
        }}>
            <Box component={'h1'} sx={{py: 5, pl: 5}}>
                Escrow Agreement <br/>
                ACH (Automated Clearing House) Agreement
            </Box>
            <Box component={'div'}
                 sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'row', p: 5}}>
                <form onSubmit={formik.handleSubmit} style={{
                    display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Box component={'h5'} sx={{margin: 1, fontWeight: 'bold', color: '#00A06C'}}>
                        <Box sx={{
                            borderRadius: '50%',
                            color: 'white',
                            backgroundColor: '#00A06C',
                            display: 'inline-block',
                            width: '30px',
                            height: '30px',
                            textAlign: 'center',
                            lineHeight: '30px',
                            marginRight: '5px',
                            marginBottom: '10px'
                        }}>8</Box>
                        Escrow Agreement
                    </Box>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 4,
                        flexWrap: 'wrap'
                    }}>
                        <Box component={'h5'} sx={{margin: 1, width: '100%'}}>
                            <Box sx={{pb: '10px'}}>
                                I/ We Agree for Escrow Agreement with IntellicAIr
                            </Box>
                            <Button
                                disabled={escrowSubmitModal}
                                onClick={handleEscrowCheck}
                                sx={{color: "white", backgroundColor: '#00A06C', mt: 2, py: 3,
                                    '&:hover': {
                                        color: 'white !important',
                                        backgroundColor: '#00A06C !important',

                                    },
                                    '&:disabled': {
                                        color: 'white !important',
                                        backgroundColor: '#00A06C !important',
                                        // opacity: 0.5,
                                        cursor: 'not-allowed',
                                    }
                                }}>
                                {escrowSubmitModal ? <Box>Verified <CheckCircleIcon/></Box>: <Box>Escrow Verification <EastIcon/></Box>}
                            </Button>
                            <EscrowVerificationModal
                                openEscrow={openEscrow}
                                setOpenEscrow={setOpenEscrow}
                                setEscrowSubmitModal={setEscrowSubmitModal}
                            />
                        </Box>


                        <Box component={'h5'} sx={{pt: 5, fontWeight: 'bold', color: '#00A06C'}}>
                            <Box sx={{
                                borderRadius: '50%',
                                color: 'white',
                                backgroundColor: '#00A06C',
                                display: 'inline-block',
                                width: '30px',
                                height: '30px',
                                textAlign: 'center',
                                lineHeight: '30px',
                                marginRight: '5px',
                                marginBottom: '10px'
                            }}>9</Box>
                            ACH (Automated Clearing House) Agreement
                        </Box>
                        <Box component={'h5'} sx={{margin: 1, width: '100%'}}>
                            <Box sx={{pb: '10px'}}>
                                I/ We Agree for ACH Agreement with IntellicAIr
                            </Box>
                            <Button
                                disabled={achSubmitModal}
                                onClick={handleAchCheck}
                                sx={{color: "white", backgroundColor: '#00A06C', mt: 2, py: 3,
                                    '&:hover': {
                                        color: 'white !important',
                                        backgroundColor: '#00A06C !important',
                                    },
                                    '&:disabled': {
                                        color: 'white !important',
                                        backgroundColor: '#00A06C !important',
                                        // opacity: 0.5,
                                        cursor: 'not-allowed',
                                    }
                                }}>
                                {achSubmitModal ? <Box>Verified <CheckCircleIcon/></Box> : <Box>ACH Verification <EastIcon/></Box>}
                            </Button>
                            <AchVerificationModal
                                openAch={openAch}
                                setOpenAch={setOpenAch}
                                setAchSubmitModal={setAchSubmitModal}
                            />
                        </Box>
                        <Box component={'h5'} sx={{pt: 5, fontWeight: 'bold', color: '#00A06C'}}>
                            <Box sx={{
                                borderRadius: '50%',
                                color: 'white',
                                backgroundColor: '#00A06C',
                                display: 'inline-block',
                                width: '30px',
                                height: '30px',
                                textAlign: 'center',
                                lineHeight: '30px',
                                marginRight: '5px',
                                marginBottom: '10px'
                            }}>10</Box>
                            Subscription Plans
                        </Box>
                        <Box component={'h5'} sx={{margin: 1, width: '100%'}}>
                            {/*<Box sx={{pb: '10px'}}>*/}
                            {/*    /!*Flexible monthly access with affordable login plans.*!/*/}
                            {/*</Box>*/}

                            <FormControl>
                                <FormLabel style={{color: "#5E6366", paddingBottom: "1rem"}}  id="demo-controlled-radio-buttons-group">Flexible monthly access with affordable login plans.</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    id="subscription"
                                    name="subscription"
                                    value={formik.values.subscription}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel style={{
                                        // color: "#00A06C",
                                        // "& .css-148pbm7-MuiTypography-root": {
                                        // }


                                    }} value="SINGLE_LOGIN" control={<Radio />} label="Single Login ($20 per Login per Month)" />
                                    <Typography sx={{pl: 8, fontSize: '15px', }}>Description: Access to the platform for one user.</Typography>
                                    <FormControlLabel value="THREE_LOGIN" control={<Radio />} label="Three Logins ($50 for 3 Login per Month)" />
                                    <Typography sx={{pl: 8, fontSize: '15px'}}>Description: Access for up to three users.</Typography>
                                    <FormControlLabel value="FIVE_LOGIN" control={<Radio />} label="Five Logins ($ 60 for 5 Login per Month)" />
                                    <Typography sx={{pl: 8, fontSize: '15px'}}>Description: Access for up to three users.</Typography>
                                </RadioGroup>
                            </FormControl>



                        </Box>

                    </Box>
                    {/*<Button sx={{*/}
                    {/*    mt: 8,*/}
                    {/*    backgroundColor: '#F5F6FF',*/}
                    {/*    border: '1px solid #5569FF',*/}
                    {/*    color: '#5569FF',*/}
                    {/*    width: '20%'*/}
                    {/*}}*/}
                    {/*        disabled={loading}*/}
                    {/*        type="submit">*/}
                    {/*    {*/}
                    {/*        loading ? <CircularProgress sx={{color:'#5569FF'} } size={'24px'}/> : 'Next'*/}
                    {/*    }*/}
                    {/*</Button>*/}

                    <Box component={'h5'} sx={{margin: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 10}}>
                        <Button variant="outlined" sx={{color: "#00A06C", backgroundColor: 'white', outlineColor: '#00A06C', mt: 2,mx: 5, p: 3, width: "20%",
                            '&:hover': {
                                color: 'white !important',
                                backgroundColor: '#00A06C !important',
                            } }}
                                onClick={()=>{
                                    setCurrentStep(currentStep - 1)
                                }}
                        >
                            Back
                        </Button>
                        <Button sx={{color: "white", backgroundColor: '#00A06C', mt: 2,mx: 5, p: 3,width: "20%",
                            '&:hover': {
                                color: 'white !important',
                                backgroundColor: '#00A06C !important',
                            },
                            '&:disabled': {
                                color: 'white !important',
                                backgroundColor: '#00A06C !important',
                                // opacity: 0.5,
                                cursor: 'not-allowed',
                            }
                        }}
                                // disabled={!(escrowSubmitModal && achSubmitModal)}


                                type="submit">
                            Next <EastIcon/>
                        </Button>
                    </Box>

                </form>
            </Box>
        </Box>
    );
};

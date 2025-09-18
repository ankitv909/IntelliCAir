// @flow
import * as React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
// import {AppDispatch, RootState} from '@/store';
import {unwrapResult} from '@reduxjs/toolkit';

import toast from "react-hot-toast";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import 'react-phone-input-2/lib/style.css'
import {useTheme} from '@mui/material/styles';
import EastIcon from '@mui/icons-material/East';
import CreditCheck from './modals/CreditCheckModal'
import InsuranceCheck from './modals/InsuranceCheckModal'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {recruiterCreditCheck} from "@/redux/apps/recruiter/actions";
import {useAppDispatch} from "@/redux/hooks";
import {useAuth} from "@/hooks/useAuth";


// import {createIso} from "@/store/apps/iso";

// type Props = {
//     currentStep: number,
//     setCurrentStep: any,
//     setIso: any,
// };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,
        },
    },
};

export const ThirdStep = (props: any) => {
    const dispatch = useAppDispatch()
    const {agencyOnBoardingDetails} = useAuth()
    const {currentStep, setCurrentStep} = props;
    const [submitCreditModal, setSubmitCreditModal] = React.useState<boolean>(false);
    const [submitInsuranceModal, setInsuranceSubmitModal] = React.useState<boolean>(false);


    const theme = useTheme();
    const [openCredit, setIsOpenCredit] = React.useState(false);
    const [openInsurence, setIsOpenInsurence] = React.useState(false);


    // const dispatch = useDispatch<AppDispatch>();
    // const loading = useSelector((state: RootState) => {
    //     return state.iso.createLoading;
    // });

    interface MyValues {
        insurer: string,
        policy_number: string

    }

    const validationSchema = yup.object().shape({
        insurer: yup
            .string()
            .trim().matches(/^(?!.*[-\s]{2})[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s.'-]*$/gi, "Enter Valid Name")
            .min(2, ' Name should be of minimum 2 characters length.')
            .max(100, ' Name should be of ,maximum 100 characters length.')
            .required(' Name is required.'), policy_number: yup
            .string()
            .trim()
            .matches(/^\d+$/, 'Policy Number is invalid.').length(9, 'Policy Number is invalid')

            .required('Policy Number is required.'),

    });


    const formik = useFormik<MyValues>({
        initialValues: {
            insurer: '', policy_number: ''
        }, validationSchema: validationSchema, onSubmit: async (values) => {
            const {
                insurer, policy_number,
            } = values;

            const agencyOnboardingDetails= sessionStorage.getItem('onboarding')

            const parsed=JSON.parse(agencyOnboardingDetails!)

            const mappedData: any = {
                userId: agencyOnBoardingDetails?.userId,
                Insurer: insurer,
                policyNumber: policy_number,
                creditStatus: 'VERIFIED',
                insuranceStatus: 'VERIFIED'

            };

            try {
                const res = await dispatch(recruiterCreditCheck(mappedData)).then(unwrapResult)
                if (res) {
                    setCurrentStep(currentStep + 1)
                }
                console.log("Form submitted: ", values);
            } catch (e: any) {
                toast.error(e.message)

            }


            // postISOData({...values, commission: +values.commission}).then(console.log);

        },
    });

    const handleInsurenceCheck = () => {
        setIsOpenInsurence(true);
    };
    const handleCreditCheck = () => {
        setIsOpenCredit(true);
    };

    React.useEffect(() => {
        console.log('Form error: ', formik.errors);
        console.log('Form values: ', formik.values);
        // console.log('Form initialValues: ', initialValues);
    }, [formik.values]);


    return (<Box component={'div'} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            p: 5
        }}>
            <Box component={'h1'} sx={{py: 5, pl: 5}}>
                Business Check Credit
            </Box>
            <Box component={'div'}
                 sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'row', p: 5}}>
                <form onSubmit={formik.handleSubmit} style={{
                    display: 'flex', // justifyContent: 'center',
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
                        }}>6</Box>
                        Credit Check
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
                                Please go ahead with Credit Check for My Company
                            </Box>
                            <Button
                                disabled={submitCreditModal}
                                onClick={handleCreditCheck}
                                sx={{
                                    color: "white", backgroundColor: '#00A06C', mt: 2, py: 3, '&:hover': {
                                        color: 'white !important', backgroundColor: '#00A06C !important',

                                    }, '&:disabled': {
                                        color: 'white !important',
                                        backgroundColor: '#00A06C !important', // opacity: 0.5,
                                        cursor: 'not-allowed',
                                    }
                                }}>
                                {submitCreditModal ? <Box> Credit Verified! <CheckCircleIcon/></Box> :
                                    <Box>Credit Check <EastIcon/></Box>}
                            </Button>
                            <CreditCheck
                                openCredit={openCredit}
                                setIsOpenCredit={setIsOpenCredit}
                                setSubmitCreditModal={setSubmitCreditModal}
                            />
                        </Box>


                        <Box component={'h5'} sx={{pt: 5, fontWeight: 'bold', color: '#00A06C', width: '100%'}}>
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
                            }}>7</Box>
                            Insurance Check
                        </Box>

                        <Box component={'div'} sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'start', width: '100%'
                        }}>

                            <Box component={'div'} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '48%'
                            }}>


                                <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Insurer</Typography>
                                <input
                                    id="insurer"
                                    name="insurer"
                                    type="text"
                                    placeholder={"Name"}
                                    onChange={formik.handleChange}
                                    value={formik.values.insurer}
                                    style={{
                                        width: '95%',
                                        border: `1px solid ${formik.errors.insurer ? 'red' : '#11192A'}`,
                                        borderRadius: '8px',
                                        padding: '8px 8px',
                                        color: '#11192A',
                                        outlineColor: `${formik.errors.insurer ? '#ff4d48' : '#11192A'}`
                                    }}
                                />
                                {formik.errors.insurer && (<span style={{
                                        color: '#ff4d48', fontSize: '12px', paddingLeft: '4px'
                                    }}>*{formik.errors.insurer}</span>)}

                            </Box>
                            <Box component={'div'} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '48%'
                            }}>
                                <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Policy
                                    Number</Typography>
                                <input
                                    id="policy_number"
                                    name="policy_number"
                                    type="text"
                                    placeholder={"eg: xxx xxx xxx"}
                                    onChange={formik.handleChange}
                                    value={formik.values.policy_number}
                                    style={{
                                        width: '95%',
                                        border: `1px solid ${formik.errors.policy_number ? 'red' : '#11192A'}`,
                                        borderRadius: '8px',
                                        padding: '8px 8px',
                                        color: '#11192A',
                                        outlineColor: `${formik.errors.policy_number ? '#ff4d48' : '#11192A'}`
                                    }}
                                />
                                {formik.errors.policy_number && (<span style={{
                                        color: '#ff4d48', fontSize: '12px', paddingLeft: '4px'
                                    }}>*{formik.errors.policy_number}</span>)}
                            </Box>
                            <Box/>
                        </Box>


                        <Box component={'h5'} sx={{margin: 1, width: '100%'}}>
                            <Box sx={{pb: '10px'}}>
                                Please go with my Insurance Check
                            </Box>
                            <Button
                                disabled={submitInsuranceModal}
                                onClick={handleInsurenceCheck}
                                sx={{
                                    color: "white", backgroundColor: '#00A06C', mt: 2, py: 3, '&:hover': {
                                        color: 'white !important', backgroundColor: '#00A06C !important',

                                    }, '&:disabled': {
                                        color: 'white !important',
                                        backgroundColor: '#00A06C !important', // opacity: 0.5,
                                        cursor: 'not-allowed',
                                    }
                                }}>
                                {submitInsuranceModal ? <Box>Insurance Verified <CheckCircleIcon/></Box> :
                                    <Box>Insurance Check <EastIcon/></Box>}
                            </Button>
                            <InsuranceCheck
                                openInsurence={openInsurence}
                                setIsOpenInsurence={setIsOpenInsurence}
                                setInsuranceSubmitModal={setInsuranceSubmitModal}
                            />
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

                    <Box component={'h5'} sx={{
                        margin: 1,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pt: 10
                    }}>
                        <Button variant="outlined" sx={{
                            color: "#00A06C",
                            backgroundColor: 'white',
                            outlineColor: '#00A06C',
                            mt: 2,
                            mx: 5,
                            p: 3,
                            width: "20%",
                            '&:hover': {
                                color: 'white !important', backgroundColor: '#00A06C !important',
                            }
                        }}
                                onClick={() => {
                                    setCurrentStep(currentStep - 1)
                                }}
                        >
                            Back
                        </Button>
                        <Button sx={{
                            color: "white", backgroundColor: '#00A06C', mt: 2, mx: 5, p: 3, width: "20%", '&:hover': {
                                color: 'white !important', backgroundColor: '#00A06C !important',
                            }, '&:disabled': {
                                color: 'white !important', backgroundColor: '#00A06C !important', // opacity: 0.5,
                                cursor: 'not-allowed',
                            }
                        }}
                                disabled={!(submitInsuranceModal && submitCreditModal)}
                                onClick={() => {
                                    // setCurrentStep(currentStep + 1)
                                }}

                                type="submit">
                            Next <EastIcon/>
                        </Button>
                    </Box>

                </form>
            </Box>
        </Box>);
};

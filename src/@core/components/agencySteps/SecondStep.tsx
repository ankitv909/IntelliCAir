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
import {Router, useRouter} from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import {Theme, useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import EastIcon from '@mui/icons-material/East';
import AccountVerificationModal from './modals/AccountVerificationModal';
import InputLabel from '@mui/material/InputLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {recruiterBankVerification, recruiterBasicDetails, recruiterOnboarding} from "@/redux/apps/recruiter/actions";
import {useAppDispatch} from "@/redux/hooks";
import {useAuth} from "@/hooks/useAuth";


export const SecondStep = (props: any) => {
    const dispatch=useAppDispatch()
    const [bank, setBank] = React.useState('');
    const [submitModal, setSubmitModal] = React.useState<boolean>(false);
const router=useRouter()


    // const handleBankChange = (event: SelectChangeEvent) => {
    //     setBank(event.target.value as string);
    // };


    const {currentStep, setCurrentStep,basicDetails} = props;

    const theme = useTheme();
    const {agencyOnBoardingDetails} = useAuth();

    const [personName, setPersonName] = React.useState<string[]>([]);
    const [open, setIsOpen] = React.useState(false);


    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    interface MyValues {
     // userId:61,
     // bankName:"AXIS",
     // accountNumber:"12345",
     // accountHoldersName:"Aditya singh",
     // status"NOT_VERIFIED"
     //
        account_holder_name: string,
        account_number: string,
        bank: string
    }
    const validationSchema = yup.object().shape({
        account_holder_name: yup
            .string()
            .trim().matches(/^(?!.*[-\s]{2})[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s.'-]*$/gi, "Enter Valid Account Holder's Name")
            .min(2, ' Account Holder"s Name should be of minimum 2 characters length.')
            .max(100, ' Account Holder"s Name should be of ,maximum 100 characters length.')
            .required('Account Holder"s Name is required.'),
        account_number: yup
            .string()
            .trim()
            .matches(/^\d+$/, 'Account number is invalid. It should only contain digits.')
            .min(11, 'Account number must be at least 11 digits.')
            .max(16, 'Account number must be at most 16 digits.')
            .required('Account number is required.'),
        bank: yup.string().trim().required('Bank is required.'),
    });


    const formik = useFormik<MyValues>({
        initialValues: {
            account_holder_name: '',
            account_number: '',
            bank: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const agencyOnboardingDetails= sessionStorage.getItem('onboarding')

                const parsed=JSON.parse(agencyOnboardingDetails!)


            const {
                account_holder_name,
                account_number,
                bank,
            } = values;
            const mappedData:any = {
              userId:agencyOnBoardingDetails?.userId,
              bankName:bank,
              accountNumber:account_number,
              accountHoldersName:account_holder_name,
              status:'VERIFIED'
            };

            try {
               const  res =await dispatch(recruiterBankVerification(mappedData)).then(unwrapResult)
                if(res) {
                    setCurrentStep(currentStep + 1)
                }
                console.log("Form submitted: ", values);
            }catch (e:any) {
                toast.error(e.message)

            }


            // postISOData({...values, commission: +values.commission}).then(console.log);

        },
    });

    const handleAccVerification = () => {
        setIsOpen(true);
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
            <Box component={'h1'} sx={{pl: 5, py:5}}>
                Business Account Verification
            </Box>
            <Box component={'div'}
                 sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'row', p: 5}}>
                <form onSubmit={formik.handleSubmit} style={{
                    display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Box component={'h5'} sx={{marginY: '1rem', fontWeight: 'bold', color: '#00A06C', width: '100%'}}>
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
                        }}>5</Box>
                        Bank Account Verification
                    </Box>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'start',
                        flexDirection: 'row',
                        gap: 4,
                        flexWrap: 'wrap'
                    }}>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Box sx={{minWidth: 580}}>
                                <Typography sx={{color: '#22333B'}} variant={'subtitle2'}>Select
                                    Bank</Typography>
                                <FormControl fullWidth>
                                    {/*<InputLabel id="demo-simple-select-label">Bank</InputLabel>*/}
                                    <Select
                                        inputProps={{
                                            sx: {
                                                paddingTop: '14px',
                                                paddingBottom: '10px',
                                            },
                                        }}
                                        labelId="demo-simple-select-label"
                                        id="bank"
                                        name={"bank"}
                                        value={formik.values.bank}
                                        // label="bank"
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={'HDFC'}>HDFC</MenuItem>
                                        <MenuItem value={'Kotak'}>Kotak</MenuItem>
                                        <MenuItem value={'SBI'}>SBI</MenuItem>
                                        <MenuItem value={'Montana'}>Montana</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Bank Account
                                Number</Typography>
                            <input
                                id="account_number"
                                name="account_number"
                                type="text"
                                placeholder={"eg: xxx xxx xxx"}
                                onChange={formik.handleChange}
                                value={formik.values.account_number}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.account_number ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.account_number ? '#ff4d48' : '#11192A'}`

                                }}
                            />
                            {formik.errors.account_number && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.account_number}</span>
                            )}
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Account Holder&apos;s Name</Typography>
                            <input
                                id="account_holder_name"
                                name="account_holder_name"
                                type="text"
                                placeholder={"Account Holder's Name"}
                                onChange={formik.handleChange}
                                value={formik.values.account_holder_name}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.account_holder_name ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.account_holder_name ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.account_holder_name && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.account_holder_name}</span>
                            )}

                        </Box>
                        <Box/>


                        <Box component={'h5'} sx={{margin: 1, width: '100%'}}>
                            <Box sx={{paddingBottom: "10px"}}>
                                Please go with my Bank Account Verification
                            </Box>
                            <Button
                                disabled={submitModal}
                                onClick={handleAccVerification}
                                sx={{
                                    color: "white", backgroundColor: '#00A06C', mt: 2, py: 3,px: 10,
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
                                {submitModal ? <Box>Account Verified!  <CheckCircleIcon/></Box> : <Box>Account Verification  <EastIcon/></Box>}
                            </Button>
                            <AccountVerificationModal
                                open={open}
                                setIsOpen={setIsOpen}
                                setSubmitModal={setSubmitModal}
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
                                color: 'white !important',
                                backgroundColor: '#00A06C !important',
                            }
                        }}
                                onClick={() => {
                                    setCurrentStep(currentStep - 1)
                                }}
                        >
                            Back
                        </Button>
                        <Button sx={{
                            color: "white", backgroundColor: '#00A06C', mt: 2, mx: 5, p: 3, width: "20%",
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
                            disabled={!submitModal}
                                // onClick={() => {
                                //     setCurrentStep(currentStep + 1)
                                // }}

                                type="submit">
                            Next <EastIcon/>
                        </Button>
                    </Box>

                </form>
            </Box>
        </Box>
    );
};

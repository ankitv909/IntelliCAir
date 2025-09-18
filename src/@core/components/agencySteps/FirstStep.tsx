// @flow
import * as React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
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
import BbbCheckModal from './modals/BbbCheckModal'
import InputLabel from '@mui/material/InputLabel';
import {recruiterOnboarding} from "@/redux/apps/recruiter/actions";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useEffect, useState} from "react";
import {unwrapResult} from "@reduxjs/toolkit";
import {router} from "next/client";
import {useAuth} from "@/hooks/useAuth";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,
        },
    },
};

const statesAllowed = ['alaska', 'alabama', 'arkansas', 'american samoa', 'arizona', 'california', 'colorado', 'connecticut', 'district of columbia', 'delaware', 'florida', 'georgia', 'guam', 'hawaii', 'iowa', 'idaho', 'illinois', 'indiana', 'kansas', 'kentucky', 'louisiana', 'massachusetts', 'maryland', 'maine', 'michigan', 'minnesota', 'missouri', 'mississippi', 'montana', 'north carolina', 'north dakota', 'nebraska', 'new hampshire', 'new jersey', 'new mexico', 'nevada', 'new york', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'puerto rico', 'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas', 'utah', 'virginia', 'virgin islands', 'vermont', 'washington', 'wisconsin', 'west virginia', 'wyoming']
const titleCase = (str: any) => {
    if (str !== null) {
        str = str?.toLowerCase()?.split(' ');
        for (let i = 0; i < str?.length; i++) {
            str[i] = str[i]?.charAt(0)?.toUpperCase() + str[i]?.slice(1);
        }
        return str?.join(' ');
    }

}


export const FirstStep = (props : any) => {
    const {agencyOnBoardingDetails,setAgencyOnBoardingDetails} = useAuth();
    const {currentStep, setCurrentStep,basicDetails} = props;
    const dispatch=useAppDispatch()
    const [stateValue, setStateValue] = React.useState<string>('');
    const [city, setCity] = React.useState<string>('');
    const [zip, setZip] = React.useState<string>('');



    const theme = useTheme();
    const [open, setIsOpen] = React.useState<boolean>(false);
    const [submitModal, setSubmitModal] = React.useState<boolean>(false);


    const [mobileNumber, setMobileNumber] = useState('')
    const [businessTelephoneNumber, setBusinessTelephoneNumber] = useState('')
    const [businessPointOfContact, setBusinessPointOfContact] = useState('')

    // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setPersonName(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    // const dispatch = useDispatch<AppDispatch>();
    // const loading = useSelector((state: RootState) => {
    //     return state.iso.createLoading;
    // });


    // useEffect(() => {
    //     if (basicDetails){
    //         // router.push({pathname:''})
    //     }
    // }, []);
    interface MyValues {
        name: string,
        business_name: string,
        business_address_1: string,
        business_address_2: string,
        ein: string,
        state: string,
        city: string,
        zip_code: string,
        business_telephone_number: string,
        business_website_url: string,
        business_point_of_contact: string,
        business_email: string,
        // country_code: string,
        ssn: string,
        mobile_number: string,
        email: string,
        bbb:string
        // country_code1: string,
        // country_code2: string,
        // country_code3: string

    }


    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .trim().
            matches(/^(?!.*[-\s]{2})[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s.'-]*$/gi,"Enter Valid Name")
            .min(2, ' Name should be of minimum 2 characters length.')
            .max(100, ' Name should be of ,maximum 100 characters length.')
            .required(' Name is required.'),
        business_name: yup
            .string()
            .trim().
            matches(/^(?!.*[-\s]{2})[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s.'-]*$/gi,"Enter Valid Name")
            .min(2, 'Business Name should be of minimum 2 characters length.')
            .max(100, 'Business Name should be of ,maximum 100 characters length.')
            .required('Business Name is required.'),
        business_address_1: yup
            .string()
            .trim()
            .matches(
                /^([A-Za-z0-9_\s\W]*)$/gi, 'Enter a Valid Address',
            )
            .min(10, 'Business Address 1 should be of minimum 10 characters length.')
            .max(200,'Business Address 1 should be of maximum 200 characters length.')
            .required('Business Address 1 is required.'),
        business_address_2: yup
            .string()
            .trim()
            .matches(
                /^([A-Za-z0-9_\s\W]*)$/gi, 'Enter a Valid Address',
            )
            .min(4, 'Business Address 2 should be of minimum 4 characters length.')
            .max(200,'Business Address 2 should be of maximum 200 characters length.')
            .required('Business Address 2 is required.'),
        ein: yup
            .string()
            .trim()
            .matches(
                /^[a-zA-Z0-9]+$/,
                'EIN is invalid. It should contain only alphanumeric characters.'
            )
            .length(11, 'EIN is invalid. It should be exactly 11 characters long.')
            .required('EIN is required.'),
        state: yup.string().trim().required('State is required.'),
        city: yup.string().trim().required('City is required.'),
        zip_code: yup.string().trim().required('Zip Code is required.'),
        business_telephone_number: yup
            .string()
            .trim()
            .required('Business Telephone Number is required.'),
        business_website_url: yup
            .string()
            .matches(
                /^(?!:\/\/)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/i,
                // /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                'Enter Valid Website Url'
            )
            .trim()
            .required('Business Website Url is required'),
        business_point_of_contact: yup
            .string()
            .trim()
            .required('Business Point of Contact is required.'),
        business_email: yup
            .string()
            .trim()
            .matches(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                'Invalid Business Email address'
            )
            .required('Business Email is required.'),
        // business_website_url: yup
        //     .string()
        //     .trim()
        //     .required('Business Website Url is required.'),
        // country_code: yup
        //     .string()
        //     .trim()
        //     .required('Country Code is required.'),


        ssn: yup
            .string()
            .trim()
            .matches(
                /^\d{3}-\d{2}-\d{4}$/,
                'SSN is invalid. It should be in the format 111-11-1111.'
            )
            .required('SSN is required.'),

            // .required('SSN is required.'),


        mobile_number: yup
            .string()
            .trim()
            .required('Mobile Number is required.'),

        email: yup
            .string()
            .trim()
            .matches(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                'Invalid Email address'
            )
            .required('Email is required.'),


    });


    // const postISOData = async (values: ISOData) => {
    //     const response = await dispatch(createIso(values)).then(unwrapResult).catch((error) => {
    //         toast.error(
    //             error?.message ??
    //             'Something went wrong, error while creating ISO.',
    //         )
    //     });
    //     if (response) {
    //         localStorage.setItem('create-iso-data', JSON.stringify(response));
    //         Router.events.on('routeChangeComplete', () => {
    //             localStorage.removeItem('create-iso-data');
    //             props.setCurrentStep(0);
    //         })
    //         setIso(response);
    //         toast.success("ISO created successfully!");
    //         props.setCurrentStep(props.currentStep + 1);
    //     }
    // }






    const formik = useFormik<MyValues>({
        initialValues: {
            business_name: '',
            business_address_1: '',
            business_address_2: '',
            business_email: '',
            business_website_url: '',
            business_telephone_number: '',
            business_point_of_contact: '',
            ein: '',
            city: '',
            state: '',
            zip_code: '',
            name: '',
            mobile_number: '',
            email: '',
            ssn: '',
            bbb:''

        },
        validateOnChange:true,
        validationSchema: validationSchema, // Pass the validation schema
        onSubmit: async (values) => {
            const {
                business_name,
                ein,
                business_address_1,
                business_address_2,
                state,
                city,
                zip_code,
                business_telephone_number,
                business_website_url,
                business_email,
                business_point_of_contact,
                bbb,
                name,
                ssn,
                mobile_number,
                email
            } = values;
            const mappedData:any = {
                businessName:business_name,
                employerIdentificationNumber:ein,
                businessAddress1:business_address_1,
                businessAddress2:business_address_2,
                state,
                city,
                zipCode:zip_code,
                businessTelephoneNumber:business_telephone_number,
                businessWebsite:business_website_url,
                businessEmail:business_email,
                pointOfContact:business_point_of_contact,
                BBB:'VERIFIED',
                name,
                SSN:ssn,
                mobileNumber:mobile_number,
                emailId:email
            };

            try {
               const res=await dispatch(recruiterOnboarding(mappedData)).then(unwrapResult)
               if(res) {
                   console.log('response---',res)
                   setAgencyOnBoardingDetails(res)
                   // sessionStorage.setItem('onboarding',JSON.stringify(res?.result))
                   setCurrentStep(currentStep + 1)
               }
                console.log("Form submitted: ", values);
            }catch (e:any) {
                toast.error(e.message)

            }



        },
    });


    const handleBbbCheck = () => {
        setIsOpen(true);
    };

    const handleStateChange = (event: SelectChangeEvent) => {
        setStateValue(event.target.value as string);

    };
    const handleCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
        formik.setFieldValue('city', city);
    };
    // const handleZipChange = (event: SelectChangeEvent) => {
    //     setZip(event.target.value as string);
    //     formik.setFieldValue('zip_code', zip);
    // };

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
            <Box component={'h1'} sx={{pl: 5, py:5, color: 'rgba(84, 78, 93, 1)'
            }}>
                Agency Onboarding
            </Box>
            <Box component={'div'}
                 sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'row', p: 5}}>
                <form onSubmit={formik.handleSubmit} style={{
                    display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Box component={'h5'} sx={{pb: 2, fontWeight: 'bold', color: '#00A06C'}}>
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
                        }}>1</Box>
                        Business Registered Name and Number
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
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Business Name</Typography>
                            <input
                                id="business_name"
                                name="business_name"
                                type="text"
                                placeholder={"Registered Business Name"}
                                onChange={formik.handleChange}
                                value={formik.values.business_name}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.business_name ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.business_name ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.business_name && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.business_name}</span>
                            )}

                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Employer Identification
                                Number</Typography>
                            <input
                                id="ein"
                                name="ein"
                                type="text"
                                placeholder={"eg: xxx xxx xxx"}
                                onChange={formik.handleChange}
                                value={formik.values.ein}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.ein ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.ein ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.ein && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.ein}</span>
                            )}
                        </Box>
                    <Box/>


                        <Box component={'h5'} sx={{pt: 5,fontWeight: 'bold', color: '#00A06C', width: '100%'}}>
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
                            }}>2</Box>
                            Business Address
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>

                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Business Address 1</Typography>
                            <input
                                id="business_address_1"
                                name="business_address_1"
                                type="text"
                                placeholder={"eg: 761 golf street USA 3345"}
                                onChange={formik.handleChange}
                                value={formik.values.business_address_1}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.business_address_1 ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.business_address_1 ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.business_address_1 && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.business_address_1}</span>
                            )}
                        </Box>

                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Business Address 2</Typography>
                            <input
                                id="business_address_2"
                                name="business_address_2"
                                type="text"
                                placeholder={"eg: 761 golf street USA 3345"}
                                onChange={formik.handleChange}
                                value={formik.values.business_address_2}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.business_address_2 ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.business_address_2 ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.business_address_2 && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.business_address_2}</span>
                            )}
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '30%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>State</Typography>
                            <Box sx={{ minWidth: 360 }}>
                                <FormControl fullWidth>
                                    {/*<InputLabel id="">Select</InputLabel>*/}
                                    <Select
                                        sx={{
                                            "& .MuiOutlinedInput-input:focus": {
                                                outlineColor: "black !important",
                                                borderColor: "black !important",
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                outlineColor: "black !important",
                                                borderColor: "black !important",
                                            },
                                            "& css-10c7m6s-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root:focus": {
                                                outlineColor: "black !important",
                                                borderColor: "black !important",
                                            },
                                        }}

                                        inputProps={{
                                            sx: {
                                                paddingTop: '14px',
                                                paddingBottom: '10px',
                                                outlineColor: "black !important",
                                                borderColor: "black !important",
                                            },
                                        }}

                                        // labelId="demo-simple-select-label"
                                        id="state"
                                        name="state"
                                        value={formik.values.state}
                                        // label="state"
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={'delhi'}>Delhi</MenuItem>
                                        <MenuItem value={'maharastra'}>Maharastra</MenuItem>
                                        <MenuItem value={'gujrat'}>Gujrat</MenuItem>
                                        <MenuItem value={'montana'}>Montana</MenuItem>
                                    </Select>


                                </FormControl>
                            </Box>

                            {formik.errors.state && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.state}</span>
                            )}
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '30%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>City</Typography>
                            <Box sx={{ minWidth: 360 }}>
                                <FormControl fullWidth>
                                    {/*<InputLabel id="demo-simple-select-label">Select</InputLabel>*/}
                                    <Select
                                        // sx={{MuiOutlinedInput-input: ''}}
                                        inputProps={{
                                            sx: {
                                                paddingTop: '14px',
                                                paddingBottom: '10px',
                                            },
                                        }}
                                        labelId="demo-simple-select-label"
                                        id="city"
                                        name="city"
                                        value={formik.values.city}

                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={'Kolakata'}>Kolakata</MenuItem>
                                        <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
                                        <MenuItem value={'Lucknow'}>Lucknow</MenuItem>
                                        <MenuItem value={'Bozeman'}>Bozeman</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            {formik.errors.city && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.city}</span>
                            )}
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '30%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Zip Code</Typography>
                            <Box sx={{ minWidth: 360 }}>
                                <FormControl fullWidth>
                                    {/*<InputLabel id="demo-simple-select-label">Select</InputLabel>*/}
                                    <Select
                                        sx={{
                                            "& .MuiOutlinedInput-input:focus": {
                                                outlineColor: "black !important",
                                            },
                                            "& css-10c7m6s-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root:focus": {
                                                outlineColor: "black !important",
                                            },
                                        }}

                                        inputProps={{
                                            sx: {
                                                paddingTop: '14px',
                                                paddingBottom: '10px',
                                                outlineColor: "black !important",
                                            },
                                        }}
                                        labelId="zip_code"
                                        id="zip_code"
                                        name="zip_code"
                                        value={formik.values.zip_code}
                                        // label="zip_code"
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={'110041'}>110041</MenuItem>
                                        <MenuItem value={'100053'}>100053</MenuItem>
                                        <MenuItem value={'100065'}>100065</MenuItem>
                                        <MenuItem value={'12345'}>12345</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            {formik.errors.zip_code && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.zip_code}</span>
                            )}
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
                            }}>3</Box>
                            Business Contact & Authorized Status
                        </Box>

                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B'}} variant={'subtitle2'}>Business Telephone Number
                            </Typography>
                            {/*<input
                                id="contact_number"
                                name="contact_number"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.contact_number}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.name ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.name ? '#ff4d48' : '#11192A'}`
                                }}
                            />*/}
                            <PhoneInput
                                placeholder={"+81 0000 000 000"}
                                specialLabel={''}
                                value={businessTelephoneNumber}
                                isValid={(value, country: any) => {
                                    if (
                                        value.slice(country?.dialCode.length).length < 10 &&
                                        value.slice(country?.dialCode.length).length >= 1
                                    ) {
                                        // formik.setErrors({ business_telephone_number: 'Invalid Contact' });
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }}
                                country={'us'}
                                countryCodeEditable={false}
                                // preferredCountries={['in', 'us']}
                                // onlyCountries={['in', 'us']}
                                onChange={(value, data, event, formattedValue) => {
                                    if ('dialCode' in data) {
                                        formik.setFieldValue(
                                            'business_telephone_number',
                                            value
                                        );
                                        setBusinessTelephoneNumber(value)
                                        // formik.setFieldValue(
                                        //     'country_code1',
                                        //     value.slice(data?.dialCode.length)
                                        // );
                                    }
                                }}
                                inputStyle={{
                                    width: '100%',
                                    border: `1px solid ${
                                        formik.errors.business_telephone_number ? 'red' : '#11192A'
                                    }`,
                                    borderRadius: '8px',
                                    height: '42px',
                                    color: '#11192A',
                                    outlineColor: `${
                                        formik.errors.business_telephone_number ? '#ff4d48' : '#11192A'
                                    }`,
                                }}
                                containerStyle={{
                                    marginTop: '0.5rem',
                                    width: '100%',
                                    color: '#11192A',
                                    outlineColor: `${
                                        formik.errors.business_telephone_number ? '#ff4d48' : '#11192A'
                                    }`,
                                }}
                            />

                            {formik.errors.business_telephone_number && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.business_telephone_number}</span>
                            )}
                        </Box>

                        <Box
                            component={'div'}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '47%',
                                '@media (max-width:768px)': {
                                    width: '100%',
                                },
                            }}
                        >
                            <Typography sx={{ color: '#22333B' }} variant={'subtitle2'}>
                                Business Website URL
                            </Typography>

                            <input
                                placeholder={"e.g.https://intelli-care.ai/"}
                                id='business_website_url'
                                name='business_website_url'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.business_website_url}
                                style={{
                                    marginTop: '0.5rem',
                                    width: '100%',
                                    border: `1px solid ${formik.errors.business_website_url ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.business_website_url ? '#ff4d48' : '#11192A'}`,
                                }}
                            />
                            {formik.errors.business_website_url && (
                                <span
                                    style={{
                                        color: '#ff4d48',
                                        fontSize: '12px',
                                        paddingLeft: '4px',
                                    }}
                                >
                                  *{formik?.errors?.business_website_url?.toString()}
                                </span>
                            )}
                        </Box>


                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{ color: '#22333B'}} variant={'subtitle2'}>Business Point of Contact
                                </Typography>
                            {/*<input
                                id="contact_number"
                                name="contact_number"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.contact_number}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.name ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.name ? '#ff4d48' : '#11192A'}`
                                }}
                            />*/}
                            <PhoneInput

                                placeholder={"+81 0000 000 000"}
                                specialLabel={''}
                                value={businessPointOfContact}
                                isValid={(value, country: any) => {
                                    if (
                                        value.slice(country?.dialCode.length).length < 10 &&
                                        value.slice(country?.dialCode.length).length >= 1
                                    ) {
                                        // formik.setErrors({ business_point_of_contact: 'Invalid Contact' });
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }}
                                country={'us'}
                                countryCodeEditable={false}
                                // preferredCountries={['in', 'us']}
                                // onlyCountries={['in', 'us']}
                                onChange={(value, data, event, formattedValue) => {
                                    if ('dialCode' in data) {
                                        formik.setFieldValue(
                                            'business_point_of_contact',
                                            value
                                        );
                                        setBusinessPointOfContact(value)
                                        // formik.setFieldValue(
                                        //     'country_code2',
                                        //     value.slice(data?.dialCode.length)
                                        // );
                                    }
                                }}
                                inputStyle={{
                                    width: '100%',
                                    border: `1px solid ${
                                        formik.errors.business_point_of_contact ? 'red' : '#11192A'
                                    }`,
                                    borderRadius: '8px',
                                    height: '42px',
                                    color: '#11192A',
                                    outlineColor: `${
                                        formik.errors.business_point_of_contact ? '#ff4d48' : '#11192A'
                                    }`,
                                }}
                                containerStyle={{
                                    marginTop: '0.2rem',
                                    width: '100%',
                                    color: '#11192A',
                                    outlineColor: `${
                                        formik.errors.business_point_of_contact ? '#ff4d48' : '#11192A'
                                    }`,
                                }}
                            />

                            {formik.errors.business_point_of_contact && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.business_point_of_contact}</span>
                            )}
                        </Box>




                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography  sx={{ color: '#22333B', mb: 1 }} variant={'subtitle2'}>Business E-Mail</Typography>
                            <input
                                placeholder={"e.g.@gmail.com"}
                                id="business_email"
                                name="business_email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.business_email}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.business_email ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.business_email ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.business_email && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.business_email}</span>
                            )}
                        </Box>

                        <Box component={'h5'} sx={{margin: 1, width: '100%'}}>
                            <Box sx={{pb: 3}}>
                                Click to Verify the Agency reputation on Better Business Bureau
                            </Box>
                            <Button
                                disabled={submitModal}
                                onClick={handleBbbCheck}
                                sx={{color: "white", backgroundColor: '#00A06C', mt: 2, py: 3,px: 10,
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
                                {submitModal ? 'BBB Verified' : <Box>BBB Check <EastIcon/></Box>}
                            </Button>
                            <BbbCheckModal
                                open={open}
                                setIsOpen={setIsOpen}
                                setSubmitModal={setSubmitModal}
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
                            }}>4</Box>
                            Authorized Signatory / Personal Details
                        </Box>

                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Name</Typography>
                            <input
                                placeholder={"George"}
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.name ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.name ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.name && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.name}</span>
                            )}

                        </Box>

                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>SSN (Social Security
                                Number)</Typography>
                            <input
                                placeholder={"Optional"}
                                id="ssn"
                                name="ssn"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.ssn}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.ssn ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.ssn ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.ssn && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.ssn}</span>
                            )}
                        </Box>

                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{ color: '#22333B'}} variant={'subtitle2'}>Mobile Number
                            </Typography>
                            {/*<input
                                id="contact_number"
                                name="contact_number"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.contact_number}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.name ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.name ? '#ff4d48' : '#11192A'}`
                                }}
                            />*/}
                            <PhoneInput
                                placeholder={"+81 0000 000 000"}
                                specialLabel={''}
                                value={mobileNumber}
                                isValid={(value, country: any) => {
                                    if (
                                        value.slice(country?.dialCode.length).length < 10 &&
                                        value.slice(country?.dialCode.length).length >= 1
                                    ) {
                                        // formik.setErrors({ business_point_of_contact: 'Invalid Contact' });
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }}
                                country={'us'}

                                countryCodeEditable={false}
                                // preferredCountries={['in', 'us']}
                                // onlyCountries={['in', 'us']}
                                onChange={(value, data, event, formattedValue) => {
                                    if ('dialCode' in data) {
                                        formik.setFieldValue(
                                            'mobile_number',
                                            value
                                        );
                                        setMobileNumber(value)
                                        // formik.setFieldValue(
                                        //     'country_code3',
                                        //     value.slice(data?.dialCode.length)
                                        // );
                                    }
                                }}
                                inputStyle={{
                                    width: '100%',
                                    border: `1px solid ${
                                        formik.errors.mobile_number ? 'red' : '#11192A'
                                    }`,
                                    borderRadius: '8px',
                                    height: '42px',
                                    color: '#11192A',
                                    outlineColor: `${
                                        formik.errors.mobile_number ? '#ff4d48' : '#11192A'
                                    }`,
                                }}
                                containerStyle={{
                                    marginTop: '0.2rem',
                                    width: '100%',
                                    color: '#11192A',
                                    outlineColor: `${
                                        formik.errors.mobile_number ? '#ff4d48' : '#11192A'
                                    }`,
                                }}
                            />

                            {formik.errors.mobile_number && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.mobile_number}</span>
                            )}
                        </Box>

                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>E-Mail</Typography>
                            <input
                                placeholder={"e.g.https://intelli-care.ai/"}
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.email ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.email ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.email && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.email}</span>
                            )}
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
                            } }}>
                            Cancel
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
                            }}}
                            // disabled={}
                            type="submit"
                        >
                            Next <EastIcon/>
                        </Button>
                    </Box>

                </form>
            </Box>
        </Box>
    );
};

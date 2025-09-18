// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import toast from "react-hot-toast";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useTheme} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import EastIcon from '@mui/icons-material/East';
import {useAppDispatch} from "@/redux/hooks";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAuth} from "@/hooks/useAuth";
import {hospitalOnboarding} from "@/redux/apps/hospital/actions";
import {styled} from "@mui/system";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,
        },
    },
};

interface CityZip {
    [city: string]: string[];
}

interface StateCities {
    [state: string]: {
        cities: CityZip;
    };
}

const usaData: StateCities = {
    'Alabama': {
        cities: {
            'Birmingham': ['35203', '35205', '35213'],
            'Montgomery': ['36104', '36106', '36108'],
            'Mobile': ['36601', '36602', '36603']
        }
    },
    'California': {
        cities: {
            'Los Angeles': ['90001', '90002', '90003'],
            'San Francisco': ['94101', '94102', '94103'],
            'San Diego': ['92101', '92102', '92103']
        }
    },
    'New York': {
        cities: {
            'New York City': ['10001', '10002', '10003'],
            'Buffalo': ['14201', '14202', '14203'],
            'Rochester': ['14602', '14604', '14605']
        }
    },
    'Montana ': {
        cities: {
            'Bozeman ': ['59715', '59717', '59718']
        }
    }
};

const statesAllowed = Object.keys(usaData);

const titleCase = (str: any) => {
    if (str !== null) {
        str = str?.toLowerCase()?.split(' ');
        for (let i = 0; i < str?.length; i++) {
            str[i] = str[i]?.charAt(0)?.toUpperCase() + str[i]?.slice(1);
        }
        return str?.join(' ');
    }
};


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export const OnboardingStep = (props: any) => {
    const {agencyOnBoardingDetails, setAgencyOnBoardingDetails} = useAuth();
    const {currentStep, setCurrentStep, basicDetails} = props;
    const dispatch = useAppDispatch()
    const [stateValue, setStateValue] = React.useState<string>('');
    const [citiesList, setCitiesList] = React.useState<string[]>([]);
    const [zipCodesList, setZipCodesList] = React.useState<string[]>([]);
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
        hospital_name: string,
        hospital_address_1: string,
        hospital_address_2: string,
        state: string,
        city: string,
        zip_code: string,
        hospital_telephone_number: string,
        hospital_email: string,
        mobile_number: string,
        email: string,
    }


    const validationSchema = yup.object().shape({
        name: yup.string()
            .trim().matches(/^(?!.*[-\s]{2})[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s.'-]*$/gi, "Enter Valid Name")
            .min(2, ' Name should be of minimum 2 characters length.')
            .max(100, ' Name should be of ,maximum 100 characters length.')
            .required(' Name is required.'),
        hospital_name: yup.string()
            .trim().matches(/^(?!.*[-\s]{2})[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s.'-]*$/gi, "Enter Valid Name")
            .min(2, 'Business Name should be of minimum 2 characters length.')
            .max(100, 'Business Name should be of ,maximum 100 characters length.')
            .required('Business Name is required.'),
        hospital_address_1: yup.string()
            .trim()
            .matches(
                /^([A-Za-z0-9_\s\W]*)$/gi, 'Enter a Valid Address',
            )
            .min(10, 'Business Address 1 should be of minimum 10 characters length.')
            .max(200, 'Business Address 1 should be of maximum 200 characters length.')
            .required('Business Address 1 is required.'),
        hospital_address_2: yup
            .string()
            .trim()
            .matches(
                /^([A-Za-z0-9_\s\W]*)$/gi, 'Enter a Valid Address',
            )
            .min(10, 'Business Address 2 should be of minimum 10 characters length.')
            .max(200, 'Business Address 2 should be of maximum 200 characters length.')
            .required('Business Address 2 is required.'),
        state: yup.string().trim().required('State is required.'),
        city: yup.string().trim().required('City is required.'),
        zip_code: yup.string().trim().required('Zip Code is required.'),
        hospital_telephone_number: yup
            .string()
            .trim()
            .required('Business Telephone Number is required.'),
        hospital_email: yup
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

        //
        // ssn: yup
        //     .string()
        //     .trim()
        //     .matches(
        //         /^\d+$/,
        //         'SSN is invalid.'
        //     ).length(9,'SSN is invalid'),

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
    const formik = useFormik<MyValues>({
        initialValues: {
            hospital_name: '',
            hospital_address_1: '',
            hospital_address_2: '',
            hospital_email: '',
            hospital_telephone_number: '',
            city: '',
            state: '',
            zip_code: '',
            name: '',
            mobile_number: '',
            email: '',
        },
        validateOnChange: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const mappedData: any = {
                authorized_person: {
                    email: values.email,
                    telephone: values.mobile_number,
                    firstName: values.name,
                },
                name: values.hospital_name,
                address1: values.hospital_address_1,
                address2: values.hospital_address_2,
                city: values.city,
                state: values.state,
                zip: values.zip_code,
            };

            try {
                const res = await dispatch(hospitalOnboarding(mappedData)).then(unwrapResult);
                if (res) {
                    setAgencyOnBoardingDetails(res);
                    setCurrentStep(currentStep + 1);
                }
                console.log("Form submitted: ", values);
            } catch (e: any) {
                toast.error(e.message);
            }
        },
    });


    const handleStateChange = (event: SelectChangeEvent) => {
        const selectedState = event.target.value as string;
        setStateValue(selectedState);
        const selectedCities = usaData[selectedState]?.cities || {};
        setCitiesList(Object.keys(selectedCities));
        formik.setFieldValue('state', selectedState);
        formik.setFieldValue('city', '');
        formik.setFieldValue('zip_code', '');
    };

    const handleCityChange = (event: SelectChangeEvent) => {
        const selectedCity = event.target.value as string;
        formik.setFieldValue('city', selectedCity);
        const selectedZipCodes = usaData[stateValue]?.cities[selectedCity] || [];
        setZipCodesList(selectedZipCodes);
        formik.setFieldValue('zip_code', '');
    };

    useEffect(() => {
        console.log('Form error: ', formik.errors);
        console.log('Form values: ', formik.values);
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
            <Box component={'h1'} sx={{
                pl: 5, py: 5, color: 'rgba(84, 78, 93, 1)'
            }}>
                Hospital Onboarding
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
                        Registered Name
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
                            <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Hospital Name</Typography>
                            <input
                                id="hospital_name"
                                name="hospital_name"
                                type="text"
                                placeholder={"Registered Hospital Name"}
                                onChange={formik.handleChange}
                                value={formik.values.hospital_name}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.hospital_name ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.hospital_name ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.hospital_name && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.hospital_name}</span>
                            )}

                        </Box>
                        {/*<Box component={'div'} sx={{
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
                        </Box>*/}
                        <Box/>


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
                            }}>2</Box>
                            Hospital Address
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: '100%',
                            gap: 2
                        }}>
                            <Box component={'div'} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '48%'
                            }}>

                                <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Address 1</Typography>
                                <input
                                    id="hospital_address_1"
                                    name="hospital_address_1"
                                    type="text"
                                    placeholder={"eg: 761 golf street USA 3345"}
                                    onChange={formik.handleChange}
                                    value={formik.values.hospital_address_1}
                                    style={{
                                        width: '100%',
                                        border: `1px solid ${formik.errors.hospital_address_1 ? 'red' : '#11192A'}`,
                                        borderRadius: '8px',
                                        padding: '8px 8px',
                                        color: '#11192A',
                                        outlineColor: `${formik.errors.hospital_address_1 ? '#ff4d48' : '#11192A'}`
                                    }}
                                />
                                {formik.errors.hospital_address_1 && (
                                    <span style={{
                                        color: '#ff4d48',
                                        fontSize: '12px',
                                        paddingLeft: '4px'
                                    }}>*{formik.errors.hospital_address_1}</span>
                                )}
                            </Box>

                            <Box component={'div'} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '48%'
                            }}>
                                <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Address 2</Typography>
                                <input
                                    id="hospital_address_2"
                                    name="hospital_address_2"
                                    type="text"
                                    placeholder={"eg: 761 golf street USA 3345"}
                                    onChange={formik.handleChange}
                                    value={formik.values.hospital_address_2}
                                    style={{
                                        width: '100%',
                                        border: `1px solid ${formik.errors.hospital_address_2 ? 'red' : '#11192A'}`,
                                        borderRadius: '8px',
                                        padding: '8px 8px',
                                        color: '#11192A',
                                        outlineColor: `${formik.errors.hospital_address_2 ? '#ff4d48' : '#11192A'}`
                                    }}
                                />
                                {formik.errors.hospital_address_2 && (
                                    <span style={{
                                        color: '#ff4d48',
                                        fontSize: '12px',
                                        paddingLeft: '4px'
                                    }}>*{formik.errors.hospital_address_2}</span>
                                )}
                            </Box>
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 2,
                        }}>
                            <Box component={'div'} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '30%'
                            }}>
                                <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>State</Typography>
                                <Box sx={{minWidth: 360}}>
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
                                            onChange={handleStateChange}
                                        >
                                            {statesAllowed.map(state => (
                                                <MenuItem key={state} value={state}>{state}</MenuItem>
                                            ))}
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
                                <Box sx={{minWidth: 360}}>
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
                                            onChange={handleCityChange}
                                        >
                                            {citiesList.map(city => (
                                                <MenuItem key={city} value={city}>{city}</MenuItem>
                                            ))}
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
                                <Box sx={{minWidth: 360}}>
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
                                            onChange={formik.handleChange}
                                        >
                                            {zipCodesList.map(zip => (
                                                <MenuItem key={zip} value={zip}>{zip}</MenuItem>
                                            ))}
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
                            Hospital Contact & Authorized Status
                        </Box>

                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 2,
                            width: '100%',
                        }}>
                            <Box component={'div'} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '48%'
                            }}>
                                <Typography sx={{color: '#22333B'}} variant={'subtitle2'}>Hospital Telephone Number
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
                                        return !(value.slice(country?.dialCode.length).length < 10 && value.slice(country?.dialCode.length).length >= 1);
                                    }}
                                    country={'us'}
                                    countryCodeEditable={false}
                                    onChange={(value, data, event, formattedValue) => {
                                        if ('dialCode' in data) {
                                            formik.setFieldValue('hospital_telephone_number', value);
                                            setBusinessTelephoneNumber(value);
                                        }
                                    }}
                                    inputStyle={{
                                        width: '100%',
                                        border: `1px solid ${
                                            formik.errors.hospital_telephone_number ? 'red' : '#11192A'
                                        }`,
                                        borderRadius: '8px',
                                        height: '42px',
                                        color: '#11192A',
                                        outlineColor: `${
                                            formik.errors.hospital_telephone_number ? '#ff4d48' : '#11192A'
                                        }`,
                                    }}
                                    containerStyle={{
                                        marginTop: '0.5rem',
                                        width: '100%',
                                        color: '#11192A',
                                        outlineColor: `${
                                            formik.errors.hospital_telephone_number ? '#ff4d48' : '#11192A'
                                        }`,
                                    }}
                                />

                                {formik.errors.hospital_telephone_number && (
                                    <span style={{
                                        color: '#ff4d48',
                                        fontSize: '12px',
                                        paddingLeft: '4px'
                                    }}>*{formik.errors.hospital_telephone_number}</span>
                                )}
                            </Box>
                            <Box component={'div'} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '48%'
                            }}>
                                <Typography sx={{color: '#22333B', mb: 1}} variant={'subtitle2'}>Hospital
                                    E-Mail</Typography>
                                <input
                                    placeholder={"e.g.@gmail.com"}
                                    id="hospital_email"
                                    name="hospital_email"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.hospital_email}
                                    style={{
                                        width: '100%',
                                        border: `1px solid ${formik.errors.hospital_email ? 'red' : '#11192A'}`,
                                        borderRadius: '8px',
                                        padding: '8px 8px',
                                        color: '#11192A',
                                        outlineColor: `${formik.errors.hospital_email ? '#ff4d48' : '#11192A'}`
                                    }}
                                />
                                {formik.errors.hospital_email && (
                                    <span style={{
                                        color: '#ff4d48',
                                        fontSize: '12px',
                                        paddingLeft: '4px'
                                    }}>*{formik.errors.hospital_email}</span>
                                )}
                            </Box>
                        </Box>

                        {/*<Box
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
                        </Box>*/}

                        {/*<Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{ color: '#22333B'}} variant={'subtitle2'}>Business Point of Contact
                                </Typography>
                            <input
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
                            />
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
                        </Box>*/}


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
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 4,
                            width: '100%',
                            flexWrap: 'wrap'
                        }}>
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
                                <Typography sx={{color: '#22333B'}} variant={'subtitle2'}>Mobile Number
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

                        {/*<Box component={'div'} sx={{
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
*/}
                        {/*  <Box component={'h5'} sx={{pt: 5, fontWeight: 'bold', color: '#00A06C', width: '100%'}}>
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
                            Upload Logo
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <Box component={'div'} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '48%'
                            }}>
                                <Button sx={{
                                    color: "white", backgroundColor: '#00A06C', padding: '12px 20px',
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
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon sx={{color: '#ffffff'}}/>}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file"/>
                                </Button>
                            </Box>
                        </Box>*/}

                    </Box>

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
                        }}>
                            Cancel
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

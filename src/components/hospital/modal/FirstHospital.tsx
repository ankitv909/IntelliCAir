import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import EastIcon from '@mui/icons-material/East';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useFormik} from 'formik';
import * as yup from 'yup';


const FirstHospital = ({handleNext, jobType}: any) => {

    interface MyValues {
        speciality: string,
        hospitalName: string
    }

    const validationSchema = yup.object().shape({
        speciality: yup.string().trim().required('Job Speciality is required.'),
        hospitalName: yup
            .string()
            .trim().matches(/^(?!.*[-\s]{2})[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s.'-]*$/gi, "Enter Valid Hospital Name")
            .min(2, 'Hospital Name should be of minimum 2 characters length.')
            .max(100, 'Hospital Name should be of ,maximum 100 characters length.')
            .required('Hospital Name is required.'),
    });
    const specialties = [
        'Pediatric Nursing',
        'Geriatric Nursing',
        'Oncology Nursing',
        'Neonatal Nursing'
    ];

    const specialityText: { [key: string]: string } = {
        'Pediatric Nursing': 'Specialized care for children, administering treatments, monitoring vital signs, and offering emotional support. They collaborate with healthcare teams, educate families, and advocate for patients\' well-being, ensuring comprehensive care in the pediatric unit.',
        'Geriatric Nursing': 'Responsibilities include assessing their unique health needs, managing chronic conditions, promoting wellness, and providing emotional support. Geriatric nurses collaborate with interdisciplinary teams to ensure quality care for older adults in various settings like hospitals, nursing homes, and community.',
        'Oncology Nursing': 'Dedicated to caring for individuals diagnosed with cancer. Oncology nurses play a crucial role in all stages of cancer care, from diagnosis to survivorship or end-of-life care. Responsibilities include administering chemotherapy, managing symptoms, providing emotional support, educating patients and families.',
        'Neonatal Nursing': 'Care of newborn infants, particularly those born prematurely or with health complications. Neonatal nurses provide critical care in neonatal intensive care units (NICUs), supporting infants with respiratory distress, infections, congenital abnormalities, and other conditions.',
    };
    const defaultSpeciality = specialties[0];

    const [selectedSpecialty, setSelectedSpecialty] = useState<string>(defaultSpeciality);

    const handleSpecialityChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string;
        formik.setFieldValue('speciality', value);
        setSelectedSpecialty(value);
    };


    const formik = useFormik<MyValues>({
        initialValues: {
            speciality: defaultSpeciality,
            hospitalName: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log("Form submitted: ", values);
            handleNext({...values, jobType, selectedSpecialty});
        },
    });
    const handleContinue = () => {
        console.log("handleNext")
        // handleNext()
    };

    React.useEffect(() => {
        console.log('Form error: ', formik.errors);
        console.log('Form values: ', formik.values);
        // console.log('Form initialValues: ', initialValues);
    }, [formik.values]);

    useEffect(() => {
        setSelectedSpecialty(formik.values.speciality);
    }, [formik.values.speciality]);


    return (
        // <Dialog sx={{padding: "0px 0px"}} open={open} PaperProps={{ sx: { borderRadius: "20px", minWidth: "900px" }  }}>
        //     <DialogTitle sx={{padding: 0}}>
        //         <Typography component={"h2"} sx={{
        //             backgroundColor: '#008059',
        //             color:  'white',
        //             padding: 5,
        //             fontWeight: "bold"
        //         }}>intellicAIr - Job Creator</Typography>
        //     </DialogTitle>
        //     <DialogContent sx={{paddingX:'40px'}}>
        <Box component={'div'} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            // flexDirection: 'column',
            width: '100%',
            px: 5
        }}>
            <form onSubmit={formik.handleSubmit} style={{
                padding: "20px 10px",
                width: '50%'
            }}>
                <Box component={'div'} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    flexDirection: 'column',

                }}>
                    <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}}
                                variant={'subtitle2'}>Job Speciality</Typography>
                    <Box sx={{minWidth: 380}}>
                        <FormControl fullWidth>
                            {/*<InputLabel id="demo-simple-select-label">Select</InputLabel>*/}
                            <Select
                                sx={{
                                    borderColor: '#00A06C',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#00A06C',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#00A06C',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#00A06C',
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: "#00A06C !important",
                                    }
                                }}
                                inputProps={{
                                    sx: {
                                        paddingTop: '14px',
                                        paddingBottom: '10px',
                                    },
                                }}
                                labelId="demo-simple-select-label"
                                id="speciality"
                                name="speciality"
                                value={formik.values.speciality}
                                onChange={handleSpecialityChange}
                            >
                                {specialties.map((speciality) => (
                                    <MenuItem key={speciality} value={speciality}>
                                        {speciality}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>
                    {formik.errors.speciality && (
                        <span style={{
                            color: '#ff4d48',
                            fontSize: '12px',
                            paddingLeft: '4px'
                        }}>*{formik.errors.speciality}</span>
                    )}

                </Box>

                <Box component={'div'} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    flexDirection: 'column',
                    py: 5
                }}>
                    <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}}
                                variant={'subtitle2'}>Branch Name</Typography>
                    <Box sx={{minWidth: 380}}>
                        <input
                            id="hospitalName"
                            name="hospitalName"
                            type="text"
                            placeholder={"Branch Name"}
                            onChange={formik.handleChange}
                            value={formik.values.hospitalName}
                            style={{
                                width: '100%',
                                border: `1px solid ${formik.errors.hospitalName ? 'red' : '#11192A'}`,
                                borderRadius: '8px',
                                padding: '8px 8px',
                                color: '#11192A',
                                outlineColor: `${formik.errors.hospitalName ? '#ff4d48' : '#11192A'}`
                            }}
                        />
                    </Box>
                    {formik.errors.hospitalName && (
                        <span style={{
                            color: '#ff4d48',
                            fontSize: '12px',
                            paddingLeft: '4px'
                        }}>*{formik.errors.hospitalName}</span>
                    )}

                </Box>
                <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                    <Button
                        // disabled={submitModal}
                        type="submit"
                        onClick={() => {
                            // handleNext()
                        }}
                        sx={{
                            color: "white", backgroundColor: '#00A06C', mt: 2, py: 3, px: 5, mr: 2,
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
                        Continue <EastIcon/>
                    </Button>
                </Box>
            </form>
            <Box sx={{
                py: 5,
                pb: 10,
                width: '50%',
                p: 5
            }}>
                <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}} variant={'subtitle2'}>Job
                    Speciality</Typography>

                <h5>{specialityText[selectedSpecialty]}</h5>
                {/*<Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1, pt: 5}}*/}
                {/*            variant={'subtitle2'}>Hospital Name</Typography>*/}
                {/*<h5>Lorem ipsum dolor sit amet consectetur.
                    Egestas gravida luctus in eget bibendum laoreet et
                    pellentesque.</h5>*/}
            </Box>
        </Box>
        //     </DialogContent>
        // </Dialog>
    )

}
export default FirstHospital

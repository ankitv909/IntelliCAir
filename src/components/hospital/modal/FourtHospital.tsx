import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import WestIcon from '@mui/icons-material/West';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import EastIcon from "@mui/icons-material/East";
import { FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const FourthHospital = ({ setIsOpen, handleNext, handleBack,jobType }: any) => {
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleContinue = () => {
        setIsOpen(true);
    };

    interface MyValues {
        startDate: Date,
        endDate: Date,
        featured: boolean,
        sponsored: boolean
    }

    const validationSchema = yup.object().shape({
        startDate:yup.date().required('Contract Start Date is required.'),
        endDate:yup.date().required('Contract End Date is required.'),
    });

    const formik = useFormik<MyValues>({
        initialValues: {
            startDate: new Date(),
            endDate: new Date(),
            featured: false,
            sponsored: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const dataToSubmit: any = {
                featured: values.featured,
                sponsored: values.sponsored,
                startDate: values.startDate,
                endDate: values.endDate,
            };
            handleNext(dataToSubmit);
        },
    });

    useEffect(() => {
        console.log('Form errors: ', formik.errors);
        console.log('Form values: ', formik.values);
    }, [formik.values, formik.errors]);

    return (
        <Box component={'div'} sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            width: '100%'
        }}>
            <form onSubmit={formik.handleSubmit} style={{
                padding: "20px 10px",
                width: '50%'
            }}>
                <Box component={'div'} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                }}>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start',
                        flexDirection: 'column',
                        width: '48%'
                    }}>
                        <Typography sx={{ color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1 }}
                                    variant={'subtitle2'}>Contract Start Date</Typography>
                        <Box>
                            <DatePicker
                                selected={formik.values.startDate}
                                onChange={(date: Date) => formik.setFieldValue('startDate', date)}
                            />
                        </Box>
                        {formik.errors.startDate && <Typography color="error">{String(formik.errors.startDate)}</Typography>}
                    </Box>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start',
                        flexDirection: 'column',
                        width: '48%'
                    }}>
                        <Typography sx={{ color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1 }}
                                    variant={'subtitle2'}>Contract End Date</Typography>
                        <Box>
                            <DatePicker
                                selected={formik.values.endDate}
                                onChange={(date: Date) => formik.setFieldValue('endDate', date)}
                            />
                        </Box>
                        {formik.errors.endDate && <Typography color="error">{String(formik.errors.endDate)}</Typography>}
                    </Box>
                </Box>
                <Box component={'div'} sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'start',
                    flexDirection: 'row',
                    py: 6
                }}>
                    <FormGroup sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        flexDirection: 'row',
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.featured}
                                    onChange={(e) => formik.setFieldValue('featured', e.target.checked)}
                                />
                            }
                            label="Featured"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.sponsored}
                                    onChange={(e) => formik.setFieldValue('sponsored', e.target.checked)}
                                />
                            }
                            label="Sponsored"
                        />
                    </FormGroup>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mt: 25, pb: 15 }}>
                    <Button
                        onClick={() => {
                            handleBack()
                        }}
                        sx={{
                            color: "white", backgroundColor: 'rgba(255, 186, 83, 1)', mt: 2, mr: 4, py: 3, px: 5,
                            '&:hover': {
                                color: 'white !important',
                                backgroundColor: 'rgba(255, 186, 83, 1) !important',
                            },
                            '&:disabled': {
                                color: 'white !important',
                                backgroundColor: 'rgba(255, 186, 83, 1) !important',
                                cursor: 'not-allowed',
                            }
                        }}>
                        <WestIcon /> Back
                    </Button>
                    <Button
                        type="submit"
                        sx={{
                            color: "white", backgroundColor: '#00A06C', mt: 2, py: 3, px: 5,
                            '&:hover': {
                                color: 'white !important',
                                backgroundColor: '#00A06C !important',
                            },
                            '&:disabled': {
                                color: 'white !important',
                                backgroundColor: '#00A06C !important',
                                cursor: 'not-allowed',
                            }
                        }}>
                        Continue <EastIcon />
                    </Button>
                </Box>
            </form>
            <Box sx={{
                py: 5,
                pb: 10,
                width: '50%',
                p: 5
            }}>
                <Typography sx={{ color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1 }} variant={'subtitle2'}>Job
                    Speciality</Typography>
                <h5>Specialized care for children, administering treatments, monitoring vital signs, and offering emotional support. They collaborate with healthcare teams, educate families, and advocate for patients well-being, ensuring comprehensive care in the pediatric unit.</h5>
                {/*<Typography sx={{ color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1, pt: 2 }}*/}
                {/*            variant={'subtitle2'}>Hospital Name</Typography>*/}
               {/* <h5>Lorem ipsum dolor sit amet consectetur.
                    Egestas gravida luctus in eget bibendum laoreet et
                    pellentesque.</h5>*/}
            </Box>
        </Box>
    )
}
export default FourthHospital;

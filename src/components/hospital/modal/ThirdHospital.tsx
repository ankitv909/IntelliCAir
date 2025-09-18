import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import Box from '@mui/material/Box';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useFormik} from 'formik';
import * as yup from 'yup';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


const ThirdHospital = ({open, setIsOpen, setSubmitModal, handleNext, handleBack, jobType}: any) => {
    const [checked, setChecked,] = React.useState(false);
    const [bidStartDate, setBidStartDate] = useState(new Date());
    const [bidEndDate, setBidEndDate] = useState(new Date());
    console.log('ThirdHospital',jobType);


    const handleClose = () => {
        setIsOpen(false)
    }

    const handleCheckedChange = (e: any) => {
        setChecked(e.target.checked);
    };

    interface MyValues {
        state: string;
        city: string
        bidStartDate: Date | null;
        bidEndDate: Date | null;

    }

    const validationSchema = yup.object().shape({
        state: yup.string().trim().required('Location is required.'),
        city: yup.string().trim().required('Location is required.'),
        bidStartDate:yup.date().required('Bid Start Date is required.'),
        bidEndDate:yup.date().required('Bid End Date is required.'),

    });


    const formik = useFormik<MyValues>({
        initialValues: {
            state: '',
            city: '',
            bidStartDate: new Date(),
            bidEndDate: new Date(),

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let formData = {
                state: values.state,
                city: values.city,
                bidStartDate: values.bidStartDate,
                bidEndDate: values.bidEndDate,
            };
            handleNext(formData);
        },
    });


    React.useEffect(() => {
        console.log('Form error: ', formik.errors);
        console.log('Form values: ', formik.values);
        // console.log('Form initialValues: ', initialValues);
    }, [formik.values]);

    return (
        <Box component={'div'} sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            // flexDirection: 'column',
            width: '100%'
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
                    <Box component={'div'} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        flexDirection: 'row',
                        width:'100%', py: 5


                    }}>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width:'48%',
                        }}>
                            <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}}
                                        variant={'subtitle2'}>State</Typography>
                            <Box sx={{width:'100%'}}>
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
                                        id="state"
                                        name="state"
                                        value={formik.values.state}
                                        onChange={formik.handleChange}

                                    >
                                        <MenuItem value={'California'}>California</MenuItem>
                                        <MenuItem value={'Texas'}>Texas</MenuItem>
                                        <MenuItem value={'New York'}>New York</MenuItem>
                                        <MenuItem value={'Florida'}>Florida</MenuItem>
                                        <MenuItem value={'Montana'}>Montana</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            {formik.errors.state && (
                                <Typography color="error" variant="caption" display="block">
                                    {formik.errors.state}
                                </Typography>
                            )}
                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width:'48%'
                        }}>
                            <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}}
                                        variant={'subtitle2'}>City</Typography>
                            <Box sx={{width:'100%'}}>
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
                                        id="city"
                                        name="city"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}

                                    >
                                        <MenuItem value={'Los Angeles'}>Los Angeles</MenuItem>
                                        <MenuItem value={'Houston'}>Houston</MenuItem>
                                        <MenuItem value={'New York City'}>New York City</MenuItem>
                                        <MenuItem value={'Miami'}>Miami</MenuItem>
                                        <MenuItem value={'Bozeman'}>Bozeman</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            {formik.errors.city && (
                                <Typography color="error" variant="caption" display="block">
                                    {formik.errors.city}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        pt: 5,

                        // flexDirection: 'column',

                    }}>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}}
                                        variant={'subtitle2'}>Bid Start Date</Typography>
                            <DatePicker
                                selected={formik.values.bidStartDate}
                                onChange={(date: Date) => formik.setFieldValue('bidStartDate', date)}
                            />
                            {formik.errors.bidStartDate && (
                                <Typography color="error" variant="caption" display="block">
                                    {String(formik.errors.bidStartDate)}
                                </Typography>
                            )}

                        </Box>
                        <Box component={'div'} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            flexDirection: 'column',
                            width: '48%'
                        }}>
                            <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}}
                                        variant={'subtitle2'}>Bid End Date</Typography>
                            <DatePicker
                                selected={formik.values.bidEndDate}
                                onChange={(date: Date) => formik.setFieldValue('bidEndDate', date)}
                            />
                            {formik.errors.bidEndDate && (
                                <Typography color="error" variant="caption" display="block">
                                    {String(formik.errors.bidEndDate)}
                                </Typography>
                            )}

                        </Box>
                    </Box>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center', pt: 5}}>
                    <Button
                        // disabled={submitModal}
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
                                // opacity: 0.5,
                                cursor: 'not-allowed',
                            }
                        }}>
                        <WestIcon/> Back
                    </Button>
                    <Button
                        // disabled={submitModal}
                        type="submit"
                        onClick={() => {
                            // handleNext()
                        }}
                        sx={{
                            color: "white", backgroundColor: '#00A06C', mt: 2, py: 3, px: 5,
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

                <h5>Specialized care for children, administering treatments, monitoring vital signs, and offering emotional support. They collaborate with healthcare teams, educate families, and advocate for patients well-being, ensuring comprehensive care in the pediatric unit.</h5>
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
export default ThirdHospital

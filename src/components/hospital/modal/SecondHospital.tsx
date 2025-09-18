import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import Box from '@mui/material/Box';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useFormik} from 'formik';
import * as yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


const SecondHospital = ({open, setIsOpen, setSubmitModal, handleNext, handleBack, jobType, setJobType}: any) => {
    const [checked, setChecked,] = React.useState(false);

    interface MyValues {
        job_type: string,
        hourlyPay?: number | undefined,
        salaryLowerLimit?: number | undefined,
        salaryUpperLimit?: number | undefined,

    }

    const validationSchema = yup.object().shape({
        job_type: yup.string().trim().required('Job Type is required.'),
        hourlyPay: yup.number().when('job_type', ([job_type], schema) => {
            return job_type === 'part-time' ? schema.required('Offer Pay is required') :
                schema.notRequired()
        }),
        salaryLowerLimit: yup.number().when('job_type', ([job_type], schema) => {
            return job_type === 'full-time' ? schema.required('Offer Lower Limit is required.') :
                schema.notRequired()
        }),
        salaryUpperLimit: yup.number().when('job_type', ([job_type], schema) => {
            return job_type === 'full-time' ? schema.required('Offer Upper Limit is required.') :
                schema.notRequired()
        }),

    });


    const formik = useFormik<MyValues>({
        initialValues: {
            job_type: jobType,
            hourlyPay: undefined ,
            salaryLowerLimit: undefined,
            salaryUpperLimit: undefined,

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setJobType(values.job_type);
            const formData = {
               /* job_type: values.job_type,*/
                ...(values.job_type === 'part-time' ? { hourlyPay: values.hourlyPay } : {}),
                ...(values.job_type === 'full-time' ? { salaryLowerLimit: values.salaryLowerLimit, salaryUpperLimit: values.salaryUpperLimit } : {}),
            };
            handleNext(formData);
        },
    });

    console.log('job_type_formik', formik.errors);

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleCheckedChange = (e: any) => {
        setChecked(e.target.checked);
    };

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
                    <Box sx={{minWidth: 380}}>
                        <FormControl>
                            <FormLabel style={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', marginBottom: 1}}
                                       id="demo-row-radio-buttons-group-label">Job Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                id="job_type"
                                name="job_type"
                                value={formik.values.job_type}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel
                                    value="full-time"
                                    // control={<Radio />}
                                    control={<Radio icon={<RadioButtonUncheckedIcon/>} checkedIcon={<CheckCircleIcon
                                        sx={{color: 'rgba(5, 196, 132, 1)'}}/>}/>}
                                    label="Full Time"
                                />
                                <FormControlLabel
                                    value="part-time"
                                    // control={<Radio />}
                                    control={<Radio icon={<RadioButtonUncheckedIcon/>} checkedIcon={<CheckCircleIcon
                                        sx={{color: 'rgba(5, 196, 132, 1)'}}/>}/>}
                                    label="Part Time"
                                />

                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {formik.errors.job_type && (
                        <span style={{
                            color: '#ff4d48',
                            fontSize: '12px',
                            paddingLeft: '4px'
                        }}>*{formik.errors.job_type}</span>
                    )}
                </Box>
                {formik.values.job_type === 'part-time' && (
                    <Box component={'div'} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start',
                        flexDirection: 'column',
                        width: '90%',
                        pt: 2
                    }}>
                        <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}}
                                    variant={'subtitle2'}>Offered Pay</Typography>
                        <input
                            id="hourlyPay"
                            name="hourlyPay"
                            type="number"
                            placeholder={"$ Per Hour"}
                            onChange={formik.handleChange}
                            value={formik.values.hourlyPay}
                            style={{
                                width: '100%',
                                border: `1px solid ${formik.errors.hourlyPay ? 'red' : '#11192A'}`,
                                borderRadius: '8px',
                                padding: '8px 8px',
                                color: '#11192A',
                                outlineColor: `${formik.errors.hourlyPay ? '#ff4d48' : '#11192A'}`
                            }}
                        />
                        {formik.errors.hourlyPay && (
                            <span style={{
                                color: '#ff4d48',
                                fontSize: '12px',
                                paddingLeft: '4px'
                            }}>*{formik.errors.hourlyPay}</span>
                        )}

                    </Box>
                )}

                {formik.values.job_type === 'full-time' && (
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
                                        variant={'subtitle2'}>Offer Lower Limit</Typography>
                            <input
                                id="salaryLowerLimit"
                                name="salaryLowerLimit"
                                type="number"
                                placeholder={"$/Hour"}
                                onChange={formik.handleChange}
                                value={formik.values.salaryLowerLimit}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.salaryLowerLimit ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.salaryLowerLimit ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.salaryLowerLimit && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.salaryLowerLimit}</span>
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
                                        variant={'subtitle2'}>Offer Upper Limit</Typography>
                            <input
                                id="salaryUpperLimit"
                                name="salaryUpperLimit"
                                type="number"
                                placeholder={"$/Hour"}
                                onChange={formik.handleChange}
                                value={formik.values.salaryUpperLimit}
                                style={{
                                    width: '100%',
                                    border: `1px solid ${formik.errors.salaryUpperLimit ? 'red' : '#11192A'}`,
                                    borderRadius: '8px',
                                    padding: '8px 8px',
                                    color: '#11192A',
                                    outlineColor: `${formik.errors.salaryUpperLimit ? '#ff4d48' : '#11192A'}`
                                }}
                            />
                            {formik.errors.salaryUpperLimit && (
                                <span style={{
                                    color: '#ff4d48',
                                    fontSize: '12px',
                                    paddingLeft: '4px'
                                }}>*{formik.errors.salaryUpperLimit}</span>
                            )}

                        </Box>
                    </Box>
                )}

                <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center', mr: 0}}>
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
                <Typography sx={{color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1}} variant={'subtitle2'}>Job Type</Typography>
                <h5>Please select the Job Type</h5>

            </Box>
        </Box>
        //     </DialogContent>
        // </Dialog>
    )

}
export default SecondHospital

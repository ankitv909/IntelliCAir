import React, { useState } from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Dialog, DialogContent } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import EastIcon from "@mui/icons-material/East";
import * as yup from "yup";
import { useFormik } from "formik";
import Image from "next/image";
import DynamicNumberInput from "@/components/recruiter/dynamic-number-input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { bidding } from '@/redux/apps/recruiter/actions';
import { RootState } from "@/redux/store";
import { fetchJobs } from "@/redux/apps/dashboard/actions";
import { Job } from "@/interfaces/get-all-jobs-response.interface";

interface IBidding {
    handleClose: () => void;
    open: boolean;
    job: Job;
}

interface MyValues {
    amount: number | undefined;
}

const Bidding = (props: IBidding) => {
    const { handleClose, open, job } = props;
    const dispatch = useAppDispatch();
    const recruiterLoading = useAppSelector((state: RootState) => state.recruiter.recruiterLoading);

    const [amount, setAmount] = useState<number | null>(null);

    const validationSchema = yup.object().shape({
        amount: yup.number()
            .required('Bid amount is required.')
            .min(1, 'Bid amount must be at least 1.'),
    });

    const formik = useFormik<MyValues>({
        initialValues: {
            amount: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = { jobId: job.id, amount: values.amount! };
            console.log('bidFormData', formData);
            dispatch(bidding(formData)).unwrap()
                .then(() => {
                    dispatch(fetchJobs());
                    handleClose();
                });
        },
    });

    return (
        <Dialog sx={{ padding: "0px 0px" }} PaperProps={{ sx: { borderRadius: "20px", minWidth: "900px" } }} open={open}
                onClose={handleClose}>
            <DialogTitle sx={{ padding: 0 }}>
                <Typography component={"h2"} sx={{
                    backgroundColor: '#008059',
                    color: 'white',
                    padding: 5,
                    fontWeight: "bold"
                }}>
                    Place your Bid
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ backgroundColor: 'rgba(255, 255, 255, 1) !important' }}>
                <Box component={'div'}
                     sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexDirection: 'row', width: '100%', px: 5, py: 5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Typography sx={{ color: '#22333B', fontSize: '1rem', fontWeight: 'bold' }}
                                        variant={'subtitle2'}>Hospital’s Offer</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                                <Image src={'/images/dollar-coin.svg'} height={32} width={32} alt={'coin'} />
                                {job?.jobType === 'PART_TIME' ? (
                                    <Typography sx={{ color: '#22333B', fontSize: '1rem' }} variant={'subtitle2'}>{job?.jobDetails?.hourlyPay}</Typography>
                                ) : (
                                    <Typography sx={{ color: '#22333B', fontSize: '1rem' }} variant={'subtitle2'}>{job?.jobDetails?.salaryLowerLimit}-{job?.jobDetails?.salaryUpperLimit}</Typography>
                                )}
                            </Box>
                            <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                                <Box component={'div'} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'start',
                                    flexDirection: 'column',
                                    width: '100%'
                                }}>
                                    <Typography sx={{ color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1 }}
                                                variant={'subtitle2'}>Place your Bid
                                    </Typography>

                                    <Box sx={{ width: 380 }}>
                                        <FormControl fullWidth>
                                            <DynamicNumberInput
                                                aria-label="Quantity Input"
                                                min={1}
                                                onChange={(_, value: number | null) => {
                                                    setAmount(value);
                                                    formik.setFieldValue('amount', value);
                                                }}
                                                value={amount ?? null}
                                                onBlur={formik.handleBlur}
                                            />
                                        </FormControl>
                                    </Box>
                                    {formik.errors.amount && formik.touched.amount && (
                                        <span style={{
                                            color: '#ff4d48',
                                            fontSize: '12px',
                                            paddingLeft: '4px'
                                        }}>*{formik.errors.amount}</span>
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%' }}>
                                    <Button
                                        disabled={recruiterLoading}
                                        type="submit"
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: "white", backgroundColor: '#00A06C', mt: 2, py: 3, px: 5, mr: 2,
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
                                        {recruiterLoading ? 'Loading' : "Submit Bid"}
                                        <EastIcon />
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>

                    <Box sx={{
                        py: 5,
                        pb: 10,
                        width: '50%',
                        p: 5
                    }}>
                        <Typography sx={{ color: '#22333B', fontSize: '1rem', fontWeight: 'bold', mb: 1 }}
                                    variant={'subtitle2'}>Job Bid</Typography>
                        <h5 className={'text-sm text-[#6D6775]'}>Lorem ipsum dolor sit amet consectetur. Egestas gravida
                            luctus in eget bibendum laoreet et pellentesque.</h5>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Bidding;

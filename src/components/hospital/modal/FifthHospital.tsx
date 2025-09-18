"use client"
import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import {MDEditorProps} from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import * as yup from "yup";
import {useFormik} from "formik";
import WestIcon from "@mui/icons-material/West";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import EastIcon from "@mui/icons-material/East";
import Typography from "@mui/material/Typography";
import {ISpecialityDescriptionResponse, specialityDescription} from "@/redux/apps/hospital/actions";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import IconButton from "@mui/material/IconButton";
import {Fingerprint} from "@mui/icons-material";


const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
    ssr: false,
});
const ReactMarkdown = dynamic(() => import("react-markdown"), {ssr: false});


interface MyValues {
    description: string,

}

const FifthHospital = ({setOpen, handleNext, handleBack, jobType, selectedSpecialty}: any) => {
    const dispatch = useAppDispatch();
    const [checked, setChecked,] = React.useState(false);
    const {
        specialityDescriptionData,
        specialityDescriptionLoading,
        specialityDescriptionError
    } = useAppSelector((state: {
        jobCreate: {
            specialityDescriptionData: ISpecialityDescriptionResponse | null;
            specialityDescriptionLoading: boolean;
            specialityDescriptionError: string | null;
        };
    }) => state.jobCreate);
    console.log('selectedSpecialtySelected----', selectedSpecialty);
    console.log('specialityDescriptionData----', specialityDescriptionData);

    const validationSchema = yup.object().shape({
        description: yup.string().trim().required(),
    });

    const formik = useFormik<MyValues>({
        initialValues: {
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await handleNext(values);
        },
    });

    useEffect(() => {
        if (selectedSpecialty) {
            handleJobDescription();
        }
    }, [selectedSpecialty, dispatch]);

    useEffect(() => {
        console.log('specialityDescriptionData', specialityDescriptionData);
        if (specialityDescriptionData) {
            formik.setFieldValue('description', specialityDescriptionData);
            console.log('specialityDescriptionData', specialityDescriptionData);
        }
    }, [specialityDescriptionData]);

    const handleEditorChange = (value: string | undefined) => {
        formik.setFieldValue('description', value);
    };

    const handleJobDescription = async () => {
        dispatch(specialityDescription({speciality: selectedSpecialty}));
    };


    useEffect(() => {
        console.log('Form errors: ', formik.errors);
        console.log('Form values: ', formik.values);
    }, [formik.values, formik.errors]);

    return (
        <Box component={'div'} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <Box component={'h2'} sx={{color: 'black', fontWeight: "bold", py: 4}}>
                Job Description
            </Box>
            <form onSubmit={formik.handleSubmit} style={{padding: "20px 10px", width: '100%'}}>
                <div data-color-mode="light">
                    {specialityDescriptionLoading && (
                        <span className={'text-center w-full flex justify-center items-center'}> Loading...</span>
                    )}
                    {!specialityDescriptionLoading && (
                        <>
                            <MDEditor
                                style={{
                                    width: '100%',
                                    minHeight: '300px'
                                }}
                                value={formik.values.description}
                                onChange={handleEditorChange}
                            />
                            {formik.errors.description &&
                                <Typography color="error">{formik.errors.description}</Typography>}
                        </>
                    )}
                </div>

                <Box component={'div'} sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '8px',
                    marginTop: '1rem',
                }}>
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
                                // opacity: 0.5,
                                cursor: 'not-allowed',
                            }
                        }}>
                        <WestIcon/> Back
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
                                // opacity: 0.5,
                                cursor: 'not-allowed',
                            }
                        }}>
                        Submit <EastIcon/>
                    </Button>
                    <IconButton aria-label="fingerprint" onClick={handleJobDescription} className={'ai-button'}>
                        <Fingerprint/>
                    </IconButton>
                </Box>

            </form>

        </Box>
        // {/*    </DialogContent>*/}
        // {/*</Dialog>*/}
    )

}
export default FifthHospital

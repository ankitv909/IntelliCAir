"use client";
import React, {useEffect, useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import Image from 'next/image';
import DividerWithText from "@/components/divider-text/divider-text";
import * as yup from 'yup'
import {ObjectSchema} from 'yup'
import {FormikHelpers, FormikProps, useFormik} from "formik";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import toast from "react-hot-toast";
import {ForgotPasswordAtLoginParams, ForgotPasswordParams, LoginParams, OtpParams} from "@/context/types";
import OtpVerification from "@/components/auth/otp-verification";
import {useAuth} from "@/hooks/useAuth";
import Sucesss from "@/components/auth/sucess";

const validationSchema: ObjectSchema<LoginParams> = yup.object().shape({
    email: yup.string()
        .email().trim()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
        .required(),
    password: yup.string()
        .trim()
        /*.min(8)
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\w\d\s\S])(?=.*[^\s]).{8,}$/i, 'Enter Strong Password(alteast one uppercase letter,lowercase letter,one digit,one special character.')*/
        .required(),
})
const validationSchemaForgotPassword: ObjectSchema<ForgotPasswordAtLoginParams> = yup.object().shape({
    email: yup.string()
        .email().trim()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
        .required(),
    password: yup.string()
        .trim()
        /*.min(8)
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\w\d\s\S])(?=.*[^\s]).{8,}$/i, 'Enter Strong Password(alteast one uppercase letter,lowercase letter,one digit,one special character.')*/
        .optional(),
})

const otpSchema = yup.object().shape({
    key: yup.string().trim().required("Key is missing."),
    code: yup.string().trim().length(6, 'Enter all digits').required("Please Enter  OTP"),
});
const otpSchemaForResetPassword = yup.object().shape({
    key: yup.string().trim().required("Key is missing."),
    code: yup.string().trim().length(6, 'Enter all digits').required("Please Enter OTP"),
    password: yup.string().trim().required("Please Enter Password"),
    confirm_password: yup.string().trim().required("Please Confirm Password")
        .oneOf([yup.ref('password'), 'Confirm password must match with new password'], 'Confirm password must match with new password')
});

const LoginForm = () => {
    const [resettingPassword, setResettingPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const {login, verifyEmail, reSendOtp, verifyEmailForResetPassword, handleForgotPassword, loginTry} = useAuth();

    const [otpShow, setOtpShow] = useState(false);
    const [resendOTPLoading, setResendOTPLoading] = useState<boolean>(false);
    const [thankYouShow, setThankYouShow] = useState(false);
    const handleOtpSubmit = async (values: OtpParams, actions: FormikHelpers<OtpParams>) => {
        actions.setSubmitting(true);
        try {
            const response = await verifyEmail(values, actions, setOtpShow, setThankYouShow);
            console.log('handleOtpSubmit', response);
            /*toast.success('Login successful!');*/
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Login failed: ${error.response.data.message}`);
            } else {
                toast.error('Login failed');
            }
        } finally {
            actions.setSubmitting(false);
        }
    };
    const handleOtpSubmitForResetPassword = async (values: ForgotPasswordParams, actions: FormikHelpers<ForgotPasswordParams>) => {
        actions.setSubmitting(true);
        try {
            const response = await verifyEmailForResetPassword(values, actions, setOtpShow, setThankYouShow);
            console.log('handleOtpSubmit', response);
            /*toast.success('Login successful!');*/
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Login failed: ${error.response.data.message}`);
            } else {
                toast.error('Login failed');
            }
        } finally {
            actions.setSubmitting(false);
        }
    };

    const otpFormik: FormikProps<OtpParams> = useFormik({
        initialValues: {
            key: '',
            code: ''
        }, validateOnChange: true, validationSchema: otpSchema,
        onSubmit: async (values, actions) => {
            await handleOtpSubmit(values, actions)
        },
    });
    const resetPasswordFormik: FormikProps<ForgotPasswordParams> = useFormik({
        initialValues: {
            key: '',
            code: '',
            password: '',
            confirm_password: ''

        }, validationSchema: otpSchemaForResetPassword,
        onSubmit: async (values, actions) => {
            await handleOtpSubmitForResetPassword(values, actions)
        },
    });

    const handleSubmit = async (values: LoginParams, actions: FormikHelpers<LoginParams>) => {
        actions.setSubmitting(true);
        try {
            const response = await login(values, actions, setOtpShow, otpFormik);
            console.log('handleSubmitResponse', response);
            /* toast.success('Login successful!');*/
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Login failed: ${error.response.data.message}`);
            } else {
                toast.error('Login failed');
            }
        } finally {
            actions.setSubmitting(false);
        }
    };
    const handleSubmitInitPasswordReset = async (values: LoginParams, actions: FormikHelpers<LoginParams>) => {
        actions.setSubmitting(true);
        try {
            // if (resettingPassword){
            const response = await handleForgotPassword(values, actions, setOtpShow, resetPasswordFormik);
            console.log('handleSubmitResponse', response);
            // }
            // else {
            //     const response = await login(values, actions, setOtpShow, otpFormik);
            //     console.log('handleSubmitResponse',response);
            // }

            /* toast.success('Login successful!');*/
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Login failed: ${error.response.data.message}`);
            } else {
                toast.error('Login failed');
            }
        } finally {
            actions.setSubmitting(false);
        }
    };


    const formik: FormikProps<LoginParams> = useFormik({
        initialValues: {
            email: '', password: ''
        },
        validationSchema: resettingPassword ? validationSchemaForgotPassword : validationSchema,
        onSubmit: resettingPassword ? handleSubmitInitPasswordReset : handleSubmit,
    });
    useEffect(() => {
        console.log('forgot password errors', formik.values, formik.errors)
    }, [formik.values, formik.errors]);

    const handleResendOtp = async () => {
        try {
            const response = await reSendOtp({
                type: 'FORGOT',
                email: formik.values.email
            }, setResendOTPLoading);
            console.log('handleResendOtp-response', response);
        } catch (error) {
            toast.error('Failed to send OTP');
        }
    };

    useEffect(() => {
        console.log("formik in login", formik.values);
    }, [formik.values]);


    const handleGoogleLogin = () => {
        /*href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/redirect`}*/
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}auth/oAuth/google`;
    };

    return (

        <div className={`py-8 ${(!otpShow && !thankYouShow) ? 'w-full' : 'w-9/12'}`}>
            {!otpShow && !thankYouShow &&
                <div className={''}>
                    <h1 className={'py-8'}>Artificial Intelligence (AI) Empowered Nursing Community Platform</h1>
                    <form onSubmit={formik.handleSubmit} className={'w-9/12'}>
                        <div className="mb-8">
                            <label htmlFor="email" className="block text-lg font-normal mb-3 text-black">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Enter your email"
                                className="border rounded-lg w-full p-3 shadow-light"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Box component={'span'}><Typography variant={'caption'}
                                                                    sx={{color: 'red',}}>{formik.errors.email}</Typography></Box>) : null}
                        </div>

                        <div
                            className={`mb-2 relative ${resettingPassword ? 'hidden opacity-0' : 'visible opacity-100'}`}>
                            <label htmlFor="password" className="block text-lg font-normal mb-3 text-black">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="Enter your password"
                                className="border rounded-lg w-full p-3 shadow-light"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 transform eye-transform -translate-y-1/2 right-6"
                            >
                                {showPassword ? <FaEye/> : <FaEyeSlash/>}
                            </button>
                            {formik.touched.password && formik.errors.password ? (
                                <Box component={'span'}><Typography variant={'caption'}
                                                                    sx={{color: 'red',}}>{formik.errors.password}</Typography></Box>) : null}

                        </div>
                        {loginTry >= 3 && <div className={'flex justify-end'}>
                            <p className={'text-xs mr-1'}>Seems Like you have forgotten your current password, try</p>
                            <button type={'button'} onClick={async () => {
                                setResettingPassword(!resettingPassword)
                                // await formik.validateForm(formik.values)
                            }} className={' text-green text-xs hover:underline'}>reset Password?
                            </button>

                        </div>}

                        <button type="submit"
                                className="w-full login-button text-white rounded-lg p-3 mt-4 disabled:bg-gray-400"
                                disabled={!formik.isValid || formik.isSubmitting || resetPasswordFormik.isSubmitting || (loginTry >= 3 && !resettingPassword)}>
                            {(formik.isSubmitting || resetPasswordFormik.isSubmitting) ? 'Loading...' : resettingPassword ? 'Reset Password' : 'Proceed'}
                        </button>
                        <div className={'w-full flex justify-center'}>
                            <DividerWithText text="or continue with"/>
                        </div>
                        <div className="flex flex-row gap-14 justify-center py-12">
                            <button type={'button'} onClick={handleGoogleLogin} className="social-media-card">
                                <Image src={'/images/google.svg'} width={32} height={32} alt={'Logo'}/>
                            </button>
                            <button type={'button'} className="social-media-card">
                                <Image src={'/images/facebook.svg'} width={40} height={40} alt={'Logo'}/>
                            </button>
                            <button type={'button'} className="social-media-card">
                                <Image src={'/images/linkdin.svg'} width={38} height={38} alt={'Logo'}/>
                            </button>
                        </div>

                    </form>
                </div>
            }

            {otpShow && !thankYouShow && <Box className={'w-full justify-start align-middle'}>
                <OtpVerification resetPasswordFormik={resetPasswordFormik} formik={otpFormik}
                                 resettingPassword={resettingPassword} handleResendOtp={handleResendOtp}
                                 setOtpShow={setOtpShow} resendOTPLoading={resendOTPLoading}
                                 email={formik.values.email}/>
            </Box>
            }
            {thankYouShow && !otpShow && <Sucesss setOtpShow={setOtpShow}
                                                  setThankYouShow={setThankYouShow}
                                                  setResettingPassword={setResettingPassword}
                                                  resettingPassword={resettingPassword}/>
            }

        </div>
    );
};

export default LoginForm;

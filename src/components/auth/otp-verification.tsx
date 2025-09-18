import React, {useEffect, useState} from 'react';
import OtpInput from "react-otp-input";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormikProps} from "formik";
import {useAuth} from "@/hooks/useAuth";
import {useTheme} from "@mui/material/styles";
import {ForgotPasswordParams, OtpParams} from "@/context/types";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {FaEye, FaEyeSlash} from "react-icons/fa";
import DividerWithText from "@/components/divider-text/divider-text";
import Image from "next/image";

interface IOtpVerification {
    formik: FormikProps<OtpParams> ;
    resetPasswordFormik: FormikProps<ForgotPasswordParams>;
    handleResendOtp: () => void;
    setOtpShow: (value:boolean) => void;
    resendOTPLoading: boolean;
    email:string;
    resettingPassword:boolean;
}

const OtpVerification = ({formik, handleResendOtp, resendOTPLoading, email,setOtpShow,resettingPassword,resetPasswordFormik}: IOtpVerification) => {
    const theme = useTheme();
    useEffect(() => {
        console.log('resettting--',resettingPassword)
        console.log('resettting values--',resetPasswordFormik.values)
        console.log('resettting errors--',resetPasswordFormik.errors)
    }, [resettingPassword,resetPasswordFormik.values]);
    return (<>

            <div className=" py-2 w-full">
                <form noValidate autoComplete='off' onSubmit={ resettingPassword ?resetPasswordFormik.handleSubmit : formik.handleSubmit}>
                    <Box>
                        <Box>
                            <Typography sx={{color: '#00A06C'}} variant={"h4"} paddingY={"2rem"} textAlign={"start"}>
                                {resettingPassword ? 'Create New Password' : 'Secure PIN Verification'}
                            </Typography>
                            <Typography sx={{color: '#80807F'}} paddingY={"4px"} variant={"body2"} textAlign={"start"}>
                                Enter the verification code we just sent to your email {email}
                            </Typography>

                        </Box>
                        <Box
                            sx={{
                                width: "100%", height: "100%", py: 8, px: 0, display: "flex", flexDirection: "column", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center",
                            }}
                        >
                            <OtpInput

                                inputStyle={{
                                    width: 60, height: 60, border: `1px solid${formik.errors?.code ? "#FF0000" : "#13C49F"}`, borderRadius: "4px", color: `${theme.palette.primary.dark}`
                                }}


                                containerStyle={{borderColor: "#fff", display:'flex', gap:'8px', padding:'0 12px'}}
                                value={resettingPassword ? resetPasswordFormik.values.code : formik.values.code}
                                onChange={(e) => {
                                    resettingPassword ? resetPasswordFormik.setFieldValue('code', e) :
                                    formik.setFieldValue('code', e)
                                }}
                                numInputs={6}
                                renderSeparator={<span></span>}
                                renderInput={(props: any) => <input {...props} />}
                            />
                            <Box
                                sx={{
                                    display: "flex", marginTop: "2rem", justifyContent: "flex-start", alignContent: "center",
                                }}
                            >
                                {formik.touched.code && formik.errors.code ? (
                                    <Box component={'span'}>
                                        <Typography variant={'caption'}
                                                    sx={{color: 'red',}}>{formik.errors.code}</Typography></Box>) : null}

                            </Box>

                            {resettingPassword && resetPasswordFormik && <div className={'w-full flex flex-col gap-2 px-4 mt-4'}>
                                <div
                                    className={`mb-1 relative`}>
                                    <label htmlFor="password" className="block text-lg font-normal mb-1 text-black">
                                        New Password
                                    </label>
                                    <input
                                        type={'text'}
                                        id="password"
                                        value={resetPasswordFormik.values?.password}
                                        onChange={resetPasswordFormik.handleChange}
                                        placeholder="Enter New password"
                                        className="border rounded-lg w-full px-3 shadow-light"
                                    />
                                    {/*<button*/}
                                    {/*    type="button"*/}
                                    {/*    onClick={() => setShowPassword(!showPassword)}*/}
                                    {/*    className="absolute top-1/2 transform eye-transform -translate-y-1/2 right-6"*/}
                                    {/*>*/}
                                    {/*    {showPassword ? <FaEye/> : <FaEyeSlash/>}*/}
                                    {/*</button>*/}
                                    {resetPasswordFormik.touched?.password || resetPasswordFormik.errors?.password ? (
                                        <Box component={'span'}><Typography variant={'caption'}
                                                                            sx={{color: 'red',}}>{resetPasswordFormik.errors?.password}</Typography></Box>) : null}

                                </div>
                                <div
                                    className={`mb-2 relative`}>
                                    <label htmlFor="password" className="block text-lg font-normal mb-1 text-black">
                                        Confirm Password
                                    </label>
                                    <input
                                        type={'text'}
                                        id="confirm_password"
                                        value={resetPasswordFormik.values.confirm_password}
                                        onChange={resetPasswordFormik.handleChange}
                                        placeholder="Enter Confirm password"
                                        className="border rounded-lg w-full p-3 shadow-light"
                                    />
                                    {/*<button*/}
                                    {/*    type="button"*/}
                                    {/*    onClick={() => setShowPassword(!showPassword)}*/}
                                    {/*    className="absolute top-1/2 transform eye-transform -translate-y-1/2 right-6"*/}
                                    {/*>*/}
                                    {/*    {showPassword ? <FaEye/> : <FaEyeSlash/>}*/}
                                    {/*</button>*/}


                                    {resetPasswordFormik.touched?.confirm_password || resetPasswordFormik.errors?.confirm_password ? (
                                        <Box component={'span'}><Typography variant={'caption'}
                                                                            sx={{color: 'red',}}>{resetPasswordFormik.errors?.confirm_password}</Typography></Box>) : null}


                                </div>

                                {/*<button type="submit"*/}
                                {/*        className="w-full login-button text-white rounded-lg p-3 mt-4"*/}
                                {/*        disabled={!formik.isValid || formik.isSubmitting}>*/}
                                {/*    {formik.isSubmitting ? 'Loading...' : 'Proceed'}*/}
                                {/*</button>*/}
                            </div>
                            }


                            <Box>
                                <Typography fontSize={'smaller'}>Didn’t receive code? <button
                                    style={{
                                        color: '#00A06C', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600
                                    }}
                                    disabled={resendOTPLoading}
                                    onClick={handleResendOtp}
                                >{resendOTPLoading ? 'Loading...' : 'Resend'}</button>
                                </Typography>
                            </Box>




                        </Box>



                        <Box
                            sx={{
                                padding: "12px 0 0 0", display: "flex", justifyContent: "center",
                            }}
                        >
                            <Button
                                disabled={ resettingPassword ? (!resetPasswordFormik.isValid || resetPasswordFormik.isSubmitting ) : (!formik.isValid || formik.isSubmitting)  }
                                size={"large"}
                                variant={"contained"}
                                type={'submit'}
                                sx={{
                                    width:'50%',
                                    backgroundColor: `#00A06C`, mb: 2, "&:hover": {
                                        backgroundColor: `#00A06C`
                                    },
                                }}
                            >
                                {formik.isSubmitting ? 'Loading...' : 'Verify'}
                            </Button>


                        </Box>
                        <Box sx={{
                            display: "flex", justifyContent: "center",
                        }}>
                            <Typography sx={{
                                fontWeight: 400, fontSize: '12px'
                            }}>
                                Entered wrong credentials <span
                                style={{
                                    color: '#00A06C', textDecoration: 'underline', cursor: 'pointer', fontWeight: 400, fontSize: '12px'
                                }}
                                onClick={() => {setOtpShow(false)}}
                            >change</span>
                            </Typography>
                        </Box>


                    </Box>

                </form>
            </div>
        </>

    );
};

export default OtpVerification;

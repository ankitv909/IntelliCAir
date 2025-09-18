const auth = {
  meEndpoint: '/auth/user',
  loginEndpoint: '/auth/login',
  verifyEmailEndpoint: '/auth/verify-otp',
  verifyOtpForRestPasswordEndpoint: '/auth/verify-forgot-password',
  reSendOtpEndpoint: '/auth/resend-otp',
  recruiterOnboardingBasicDetails:'/recruiter/recruiter-onboarding/basic-details',
  logoutEndpoint: '/auth/logout',
  forgotPasswordEndpoint: '/auth/forgot-password',
  resetPasswordEndpoint: '/auth/reset-password',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
}

export default auth;

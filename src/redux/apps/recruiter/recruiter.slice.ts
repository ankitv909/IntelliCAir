import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    bidding, fetchReviewJobs,
    recruiterBankVerification,
    recruiterBasicDetails,
    recruiterCreditCheck,
    recruiterEscrowAgreement,
    recruiterOnboarding
} from "@/redux/apps/recruiter/actions";

import { Pagination, Job } from "@/interfaces/review-jobs-response.interface";


interface IBasicDetails {
    id: number;
    businessName: string;
    employerIdentificationNumber: string;
    businessAddress1: string;
    businessAddress2: string;
    city: string;
    state: string;
    zipCode: number;
    businessTelephoneNumber: number;
    businessWebsite: string;
    pointOfContact: string;
    businessEmail: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    BBB: string;
    name: string;
    SSN: string;
    mobileNumber: string;
    emailId: string;
    bankDetails: null | any;
    creditDetails: null | any;
    EscrowAgreement: null | any;
    user: {
        id: number;
        uid: string;
        firstName: string | null;
        lastName: string | null;
        email: string;
        gender: string | null;
        phoneNumber: string | null;
        role: string;
        onboardingStatus: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface Recruiter {
    id: number;
    uId: string;
    userId: number;
    jobType: 'PART_TIME' | 'FULL_TIME';
    speciality: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    city: string;
    state: string;
    hospitalName: string;
    jobDetails: {
        startDate: string;
        endDate: string;
        hourlyPay?: number;
        bidCount?: number;
        salaryUpperLimit?: number;
        salaryLowerLimit?: number;
        totalApplicants?: number;
    };
    basicDetails:IBasicDetails;
}


export const recruiterAdapter = createEntityAdapter<Recruiter>({
    // @ts-ignore
    selectId: (recruiter:Recruiter) => recruiter.id,

});

interface RecruiterState {
    recruiterLoading: boolean;
    recruiterError: string | null;
    basicDetails:IBasicDetails | undefined;
    jobs: Job[];
    pagination: Pagination | null;
}

const initialState = recruiterAdapter.getInitialState<RecruiterState>({
    recruiterLoading: false,
    recruiterError: null,
    basicDetails:undefined,
    jobs: [],
    pagination: null

});

export const recruiterSlice = createSlice({
    name: 'recruiter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(recruiterOnboarding.pending, (state) => {
            state.recruiterLoading = true;
            state.recruiterError = null;
        });

        builder.addCase(recruiterOnboarding.fulfilled, (state, action: PayloadAction<{result:IBasicDetails }>) => {
            state.recruiterLoading = false;
            state.basicDetails=action.payload.result

        });

        builder.addCase(recruiterOnboarding.rejected, (state, action: PayloadAction<any>) => {
            state.recruiterLoading = false;
            state.recruiterError = action.payload || 'Failed to fetch recruiter';
        });
        builder.addCase(recruiterBankVerification.pending, (state) => {
            state.recruiterLoading = true;
            state.recruiterError = null;
        });

        builder.addCase(recruiterBankVerification.fulfilled, (state, action: PayloadAction<{result: IBasicDetails}>) => {
            state.recruiterLoading = false;
            console.log('Redux job results:', action.payload.result);
            state.basicDetails= action.payload.result
        });

        builder.addCase(recruiterBankVerification.rejected, (state, action: PayloadAction<any>) => {
            state.recruiterLoading = false;
            state.recruiterError = action.payload || 'Failed to fetch recruiter';
        });
        builder.addCase(recruiterCreditCheck.pending, (state) => {
            state.recruiterLoading = true;
            state.recruiterError = null;
        });

        builder.addCase(recruiterCreditCheck.fulfilled, (state, action: PayloadAction<{result: IBasicDetails}>) => {
            state.recruiterLoading = false;
            console.log('Redux job results:', action.payload.result);
            state.basicDetails= action.payload.result
        });

        builder.addCase(recruiterCreditCheck.rejected, (state, action: PayloadAction<any>) => {
            state.recruiterLoading = false;
            state.recruiterError = action.payload || 'Failed to fetch recruiter';
        });
        builder.addCase(recruiterEscrowAgreement.pending, (state) => {
            state.recruiterLoading = true;
            state.recruiterError = null;
        });

        builder.addCase(recruiterEscrowAgreement.fulfilled, (state, action: PayloadAction<{result: IBasicDetails}>) => {
            state.recruiterLoading = false;
            console.log('Redux job results:', action.payload.result);
            state.basicDetails= action.payload.result
        });

        builder.addCase(recruiterEscrowAgreement.rejected, (state, action: PayloadAction<any>) => {
            state.recruiterLoading = false;
            state.recruiterError = action.payload || 'Failed to fetch recruiter';
        });



        builder.addCase(recruiterBasicDetails.pending, (state) => {
            state.recruiterLoading = true;
            state.recruiterError = null;
        });

        builder.addCase(recruiterBasicDetails.fulfilled, (state, action: PayloadAction<IBasicDetails>) => {
             state.recruiterLoading = false;
            console.log('Redux job results:', action.payload);
            state.basicDetails=action.payload;
        });

        builder.addCase(recruiterBasicDetails.rejected, (state, action: PayloadAction<any>) => {
            state.recruiterLoading = false;
            state.recruiterError = action.payload || 'Failed to fetch recruiter';
        });
        builder.addCase(bidding.pending, (state) => {
            state.recruiterLoading = true;
            state.recruiterError = null;
        });

        builder.addCase(bidding.fulfilled, (state, action: PayloadAction<IBasicDetails>) => {
            state.recruiterLoading = false;
            console.log('Redux bidding results:', action.payload);
            state.basicDetails=action.payload;
        });

        builder.addCase(bidding.rejected, (state, action: PayloadAction<any>) => {
            state.recruiterLoading = false;
            state.recruiterError = action.payload || 'Failed to fetch recruiter';
        });

        // Fetch Review Jobs
        builder.addCase(fetchReviewJobs.pending, (state) => {
            state.recruiterLoading = true;
            state.recruiterError = null;
        });

        builder.addCase(fetchReviewJobs.fulfilled, (state, action: PayloadAction<{ result: { jobs: Job[], pagination: Pagination } }>) => {
            state.recruiterLoading = false;
            state.jobs = action.payload.result.jobs;
            state.pagination = action.payload.result.pagination;
        });

        builder.addCase(fetchReviewJobs.rejected, (state, action: PayloadAction<any>) => {
            state.recruiterLoading = false;
            state.recruiterError = action.payload || 'Failed to fetch jobs';
        });
    },
});

export default recruiterSlice.reducer;

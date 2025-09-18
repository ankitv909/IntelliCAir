import axios, {http, thunkHandler} from '@/@core/utils/axios';
// ** Config
import {createAsyncThunk} from '@reduxjs/toolkit';
import {JobsReviewResponse} from "@/interfaces/review-jobs-response.interface";

const baseUrl =process.env.NEXT_PUBLIC_BASE_URL


export interface IBusinessData {
    businessName: string;
    employerIdentificationNumber: string;
    businessAddress1: string;
    businessAddress2: string;
    state: string;
    city: string;
    zipCode: string;
    businessTelephoneNumber: string;
    businessWebsite: string;
    businessEmail: string;
    pointOfContact: string;
    BBB: string;
    name: string;
    SSN: string;
    mobileNumber: string;
    emailId: string;
}

interface IBankAccountData {
    userId: number;
    bankName: string;
    accountNumber: string;
    accountHoldersName: string;
    status: "NOT_VERIFIED" | "VERIFIED" | "BLOCKED";
}
interface ICreditCheckData {
    userId: number;
    insurer: string;
    policyNumber: string;
    creditStatus: "VERIFIED" | "NOT_VERIFIED";
    insuranceStatus: "VERIFIED" | "NOT_VERIFIED";
}

interface IEscrowAgreementData {
    userId: number;
    escrowStatus: "VERIFIED" | "NOT_VERIFIED";
    achStatus: "VERIFIED" | "NOT_VERIFIED";
    subscription: "FIVE_LOGIN" | "TEN_LOGIN" | "FIFTEEN_LOGIN";
}

export const recruiterOnboarding = createAsyncThunk('recruiter/onboarding', async (body:IBusinessData, thunkAPI) => {
    const response = await http().post(`${baseUrl}recruiter/recruiter-onboarding/basic`,body);
    return thunkHandler(response, thunkAPI);
});
export const recruiterBankVerification = createAsyncThunk('recruiter/bank-verification', async ( body:IBankAccountData, thunkAPI) => {
    const response = await http().post(`${baseUrl}recruiter/recruiter-onboarding/bank-verification`,body);
    return thunkHandler(response, thunkAPI);
});

export const recruiterCreditCheck = createAsyncThunk('recruiter/credit-check', async (body:ICreditCheckData, thunkAPI) => {
    const response = await http().post(`${baseUrl}recruiter/recruiter-onboarding/credit-check`,body);
    return thunkHandler(response, thunkAPI);
});

export const recruiterEscrowAgreement = createAsyncThunk('recruiter/escrow-agreement', async (body:IEscrowAgreementData, thunkAPI) => {
    const response = await http().post(`${baseUrl}recruiter/recruiter-onboarding/escrow-agreement`,body);
    return thunkHandler(response, thunkAPI);

});
export const recruiterBasicDetails = createAsyncThunk('recruiter/basic-details', async (body:any, thunkAPI) => {
    const response = await http().get(`${baseUrl}recruiter/recruiter-onboarding/basic-details/${body?.userId}`,body);
    return thunkHandler(response, thunkAPI);

});
export const bidding = createAsyncThunk('recruiter/bidding', async (body: { jobId: number; amount: number }, thunkAPI) => {
    const response = await http().post(`${baseUrl}jobs/bid/${body.jobId}?amount=${body.amount}`);
    return thunkHandler(response, thunkAPI);

});

export const fetchReviewJobs = createAsyncThunk('fetchReview/Jobs', async ({ page, perPage }: { page: number; perPage: number }, thunkAPI) => {
    const response = await http().get<JobsReviewResponse>(`${baseUrl}jobs/review-jobs?page=${page}&perPage=${perPage}`);
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});








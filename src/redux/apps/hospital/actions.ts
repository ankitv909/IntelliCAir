import {http, thunkHandler} from '@/@core/utils/axios';
// ** Config
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';
import * as process from "process";

export interface IPartTimeJobCreate {
    hourlyPay: number;
    bidCount: number;
    startDate: string;
    endDate: string;
    hospitalName: string;
    state: string;
    city: string;
    speciality: string;
    description: string;
    featured: boolean;
    sponsored: false
}

export interface IFullTimeJobCreate {
    totalApplicants: number;
    salaryLowerLimit: number;
    salaryUpperLimit: number;
    hospitalName: string;
    state: string;
    city: string;
    speciality: string;
    featured: boolean;
    sponsored: boolean;
    description: string;
    userId: string;
}

export interface IHospitalData {
    authorized_person: {
        email: string;
        telephone: string;
        firstName: string;
    },
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
}

export interface ISpecialityDescriptionResponse {
    message: string;
    data: string;
    errorCode: number;
    status: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const baseChatUrl = process.env.NEXT_PUBLIC_CHAT_URL


/* Part Time Job Create*/
export const partTimeJobCreate = createAsyncThunk('partTimeJob/create', async (body: IPartTimeJobCreate, thunkAPI: AsyncThunkConfig) => {
    const response = await http().post(`${baseUrl}jobs/part-time/post`, body);
    console.log('partTimeJobCreate API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

/* Full Time Job Create*/
export const fullTimeJobCreate = createAsyncThunk('fullTimeJob/create', async (body: IFullTimeJobCreate, thunkAPI: AsyncThunkConfig) => {
    const response = await http().post(`${baseUrl}jobs/full-time/post`, body);
    console.log('fullTimeJobCreate API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

export const hospitalOnboarding = createAsyncThunk('hospital/onboarding', async (body: IHospitalData, thunkAPI) => {
    const response = await http().post(`${baseUrl}hospital/hospital-onboarding/basic`, body);
    return thunkHandler(response, thunkAPI);
});

/*bid approve*/
export const bidApprove = createAsyncThunk('bid/approve', async ({bidId, jobId}: {
    bidId: number,
    jobId: number
}, thunkAPI) => {
    const response = await http().post(`${baseUrl}jobs/bid/approve/${bidId}/${jobId}`);
    return thunkHandler(response, thunkAPI);
});

/*job Speciality description*/
export const specialityDescription = createAsyncThunk('jobSpeciality/description',
    async ({speciality}: { speciality: string }, thunkAPI) => {
        const response = await http().post(`${baseChatUrl}candidate/job/description`, {speciality});
        return thunkHandler(response, thunkAPI);
    }
);

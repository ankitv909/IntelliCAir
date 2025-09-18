import axios, {http, thunkHandler} from '@/@core/utils/axios';
// ** Config
import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetAllJobsResponse} from "@/interfaces/get-all-jobs-response.interface";

const baseUrl =process.env.NEXT_PUBLIC_BASE_URL
export const fetchJobs = createAsyncThunk('jobs/fetchAll', async (_, thunkAPI) => {
    const response = await http().get<GetAllJobsResponse>(`${baseUrl}jobs/get-all-jobs`);
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

export const fetchCategories = createAsyncThunk('jobs/categories', async (_, thunkAPI) => {
    const response = await http().get(`${baseUrl}jobs/get-popular-categories`);
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});
export const fetchFeatured = createAsyncThunk('jobs/featured', async (_, thunkAPI) => {
    const response = await http().get(`${baseUrl}jobs/get-all-featured-job`);
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});



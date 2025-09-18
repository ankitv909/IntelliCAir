import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchCategories, fetchFeatured, fetchJobs} from '@/redux/apps/dashboard/actions';
import {GetAllJobsResponse, Job} from "@/interfaces/get-all-jobs-response.interface";


export const jobAdapter = createEntityAdapter<Job>({
// @ts-ignore
    selectId: (job: Job) => job.id,
});


interface JobState {
    jobsLoading: boolean;
    jobsError: string | null;
    jobCategoryLoading: boolean;
    jobCategoryData: { result: any } | undefined;
    jobFeaturedLoading: boolean;
    jobFeaturedData: { result: any } | undefined;
}

const initialState = jobAdapter.getInitialState<JobState>({
    jobsLoading: false,
    jobsError: null,
    jobCategoryLoading: false,
    jobCategoryData: undefined,
    jobFeaturedLoading: false,
    jobFeaturedData: undefined,
});

export const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchJobs.pending, (state) => {
            state.jobsLoading = true;
            state.jobsError = null;
        });

        builder.addCase(fetchJobs.fulfilled, (state, action: PayloadAction<GetAllJobsResponse>) => {
            state.jobsLoading = false;
            console.log('Redux job results:', action.payload.result);
            jobAdapter.setAll(state, action.payload.result.jobs);
        });

        builder.addCase(fetchJobs.rejected, (state, action: PayloadAction<any>) => {
            state.jobsLoading = false;
            state.jobsError = action.payload || 'Failed to fetch jobs';
        });

        builder.addCase(fetchCategories.pending, (state) => {
            state.jobCategoryLoading = true;
            // state.botResponseError = null;
        });

        builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<any>) => {
            state.jobCategoryLoading = false;
            state.jobCategoryData = action.payload;
            console.log('jobCategoryData results:', action.payload.result);
        });

        builder.addCase(fetchCategories.rejected, (state, action: PayloadAction<any>) => {
            state.jobCategoryLoading = false;
            // state.botResponseError = action.payload || 'Failed to fetch jobs';
        });

        builder.addCase(fetchFeatured.pending, (state) => {
            state.jobFeaturedLoading = true;
            // state.botResponseError = null;
        });

        builder.addCase(fetchFeatured.fulfilled, (state, action: PayloadAction<any>) => {
            state.jobFeaturedLoading = false;
            state.jobFeaturedData = action.payload;
            console.log('jobCategoryData results:', action.payload.result);
        });

        builder.addCase(fetchFeatured.rejected, (state, action: PayloadAction<any>) => {
            state.jobFeaturedLoading = false;
            // state.botResponseError = action.payload || 'Failed to fetch jobs';
        });
    },
});


export default jobSlice.reducer;

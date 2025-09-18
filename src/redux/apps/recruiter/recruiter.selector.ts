import { RootState, store } from '@/redux/store';
import {recruiterAdapter} from "@/redux/apps/recruiter/recruiter.slice";

export const recruiterSelectors = recruiterAdapter.getSelectors(
    (state: RootState) => state.recruiter
);

export const selectAllRecruiters = (state: RootState) => recruiterSelectors.selectAll(state);
export const selectRecruiterById = (state: RootState, id: number) => recruiterSelectors.selectById(state, id);
export const selectRecruiterLoading = (state: RootState) => state.recruiter.recruiterLoading;
export const selectRecruiterError = (state: RootState) => state.recruiter.recruiterError;
export const selectRecruiterPagination = (state: RootState) => state.recruiter.pagination;
export const selectReviewJobs = (state: RootState) => state.recruiter.jobs;

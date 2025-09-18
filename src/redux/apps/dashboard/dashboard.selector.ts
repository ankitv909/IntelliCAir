import { RootState, store } from '@/redux/store';
import { jobAdapter } from '@/redux/apps/dashboard/dashboard.slice';

export const jobSelectors = jobAdapter.getSelectors(
    (state: RootState) => state.jobs
);



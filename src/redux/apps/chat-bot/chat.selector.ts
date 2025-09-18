import {RootState} from '@/redux/store';
import {jobAdapter} from "@/redux/apps/dashboard/dashboard.slice";


export const botResponse = (state: RootState) => state.chats.botResponse;
export const botResponseLoading = (state: RootState) => state.chats.botResponseLoading;
export const examDataLoading = (state: RootState) => state.chats.examDetailsDataLoading;
export const examData = (state: RootState) => state.chats.examDetailsData;
export const examDataError = (state: RootState) => state.chats.examDetailsError;
export const examSubmitLoading = (state: RootState) => state.chats.examSubmitLoading;


import {RootState} from '@/redux/store';
import {examQuestionAdapter} from "@/redux/apps/exam/exam.slice";

export const examQuestionSelectors = examQuestionAdapter.getSelectors((state: RootState) => state.exam)


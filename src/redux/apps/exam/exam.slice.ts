import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {questionsList} from "@/redux/apps/exam/actions";

interface Option {
    id: string;
    content: string;
    questionId: string;
}

interface Question {
    question: string;
    options: Option[];
    answer_type: string;
}

interface ExamQuestion {
    id: string;
    examId: string;
    questionId: string;
    selected_options: any; // You might want to define a proper type for this
    question: Question;
}

interface ExtraState {
    loading: boolean
}

const extraStateValues: ExtraState = {
    loading: true,
}

export const examQuestionAdapter = createEntityAdapter<ExamQuestion>({})

export const examSlice = createSlice({
    name: 'exam', initialState: examQuestionAdapter.getInitialState({
        ...extraStateValues
    }), reducers: {}, extraReducers: (builder) => {
        /*Questions List*/
        builder.addCase(questionsList.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(questionsList.fulfilled, (state, action: PayloadAction<{ exam_questions: ExamQuestion[] }>) => {
            state.loading = false;
            console.log(action.payload.exam_questions);
            examQuestionAdapter.removeAll(state);
            examQuestionAdapter.addMany(state, action.payload.exam_questions);
        });

        builder.addCase(questionsList.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
        });

    },
});

export default examSlice.reducer;

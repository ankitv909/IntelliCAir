import {createAsyncThunk} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';
import {http, thunkHandler} from "@/@core/utils/axios";
import {IGetQuestions} from "@/redux/apps/chat-bot/actions";
import process from "process";

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
    selected_options: any;
    question: Question;
}
const chatEndPoint=process.env.NEXT_PUBLIC_CHAT_URL

export const questionsList = createAsyncThunk('list/questions', async (params: IGetQuestions, thunkAPI?: AsyncThunkConfig) => {
    const response = await http().get(`${chatEndPoint}exam/getQuestions/${params?.examId}`,);
    return thunkHandler(response, thunkAPI);
});

import {calculateProgress, fileUpload, http, IFileUpload, thunkHandler} from '@/@core/utils/axios';
// ** Config
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';
import {fileUploadPercentage} from "@/redux/apps/chat-bot/chat.slice";
import * as process from "process";

export interface IJobApply {
    jobPostId: number;
}

export interface IToolResponse {
    agent: string,
    toolCallId: string,
    toolResponse: string,
    filePath?: string;
}

export interface IConersationReply {
    conversationId: string;
    toolResponses: IToolResponse[],
}

export interface IInitExam {
    jobApplicationId: string,
    conversationId: string,
    toolCallId: string
}
export interface IGetQuestions {
    examId: string,
}

export interface IInitExamResponse {
    id: string;
    total_question: number;
    per_question_marks: number;
    marks: number;
    start_time: string | null;
    end_time: string | null;
    exam_status: "CREATED" | "STARTED" | "COMPLETED" | "CANCELLED";
    conversationId: string;
    toolCallId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    jobApplicationId: string;
}
export interface IAnswerBody {
    answer: string[],
    params: {
        examId: string, questionNumber: string
    }

}

export interface IStartExam {
    examId: string,
}
export interface ISubmitExam {
    examId: string,
}

export interface IJobConversation {
    jobId: number
}

interface IUploadResponseData {
    filePath: string;
}

interface IUploadApiResponse {
    message: string;
    data: IUploadResponseData;
    errorCode: number;
    status: string;
}
const chatEndPoint=process.env.NEXT_PUBLIC_CHAT_URL
const baseUrl=process.env.NEXT_PUBLIC_BASE_URL


// hr/initCreateJobPost
export const jobApply = createAsyncThunk('job/apply', async (body: IJobApply, thunkAPI: AsyncThunkConfig) => {
    const response = await http().post(`${chatEndPoint}candidate/job/apply`, body);
    /*${chatEndPoint}hr/initCreateJobPost*/
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});


export const conversationReply = createAsyncThunk('conversation/reply', async (body: IConersationReply, thunkAPI: AsyncThunkConfig) => {
    const response = await http().post(`${chatEndPoint}conversation/reply/${body.conversationId}`, {
        toolResponses: body.toolResponses
    });
    console.log('API Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

/*upload resume*/
export const uploadResume = createAsyncThunk('upload/resume', async (files: IFileUpload, thunkAPI: AsyncThunkConfig) => {
    const response = await fileUpload(`${chatEndPoint}upload/file`, files, (progressEvent) => {
        console.log('progressEvent', calculateProgress(progressEvent));
        // @ts-ignore
        thunkAPI.dispatch(fileUploadPercentage(<number>calculateProgress(progressEvent)));
    }, thunkAPI);
    console.log('uploadResume:', response.data);
    return response;
});

/*fetch conversation*/
export const fetchJobsConversion = createAsyncThunk('fetch-job/conversion', async (body: IJobConversation, thunkAPI: AsyncThunkConfig) => {
    const response = await http().get(`${chatEndPoint}conversation/conversation/list/job/${body.jobId}`);
    console.log('fetchJobsConversion Response:', response.data);
    return thunkHandler(response, thunkAPI);
});

/*init exam*/
export const initExamination = createAsyncThunk('init/examination', async (body: IInitExam, thunkAPI?: AsyncThunkConfig) => {
    const response = await http().post(`${chatEndPoint}exam/initExam`, body);
    return thunkHandler(response, thunkAPI);
});

export const checkAnswer = createAsyncThunk('check/answers', async (body: IAnswerBody, thunkAPI?: AsyncThunkConfig) => {
    const params = body.params
    const response = await http().post(`${chatEndPoint}exam/checkAnswer/${params?.examId}/${params?.questionNumber}`, {
        answer: body.answer
    });
    return thunkHandler(response, thunkAPI);
});

export const startExam = createAsyncThunk('start/exam', async (params: IStartExam, thunkAPI?: AsyncThunkConfig) => {
    const response = await http().post(`${chatEndPoint}exam/startExam/${params?.examId}`);
    return thunkHandler(response, thunkAPI);
});

export const submitExam = createAsyncThunk('submit/exam', async (params: ISubmitExam, thunkAPI?: AsyncThunkConfig) => {
    const response = await http().post(`${chatEndPoint}exam/submitExam/${params?.examId}`);
    return thunkHandler(response, thunkAPI);
});


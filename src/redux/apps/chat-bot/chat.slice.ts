import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    conversationReply,
    fetchJobsConversion,
    IInitExamResponse,
    initExamination,
    jobApply, startExam
} from "@/redux/apps/chat-bot/actions";
import {IBotResponse} from "@/interfaces/bot-response.interface";
import {RootState} from "@/redux/store";

interface BotState {
    botResponseLoading: boolean;
    botResponse: IBotResponse | null;
    botResponseError: string | null;
    botJobConversationLoading: boolean;
    fileUploadPercent: number;
    examDetailsData: undefined | IInitExamResponse;
    examDetailsDataLoading: boolean;
    examDetailsError: string | undefined;
    questionsListLoading: boolean;
    questionsList: undefined | [];
    examSubmitLoading: boolean;
}

const initialState: BotState = {
    botResponseLoading: false,
    botResponse: null,
    botResponseError: null,
    botJobConversationLoading: false,
    fileUploadPercent: 0,
    examDetailsData: undefined,
    examDetailsDataLoading: false,
    examDetailsError: undefined,
    questionsListLoading: false,
    questionsList: undefined,
    examSubmitLoading:false,
};

export const chatSlice = createSlice({
    name: 'chats', initialState, reducers: {
        fileUploadPercentage: (state, action: PayloadAction<number>) => {
            state.fileUploadPercent = action.payload
        },
        setBotResponse:(state,action: any) => {
            state.botResponse=action.payload
        }


    }, extraReducers: (builder) => {

        /*chat job Apply*/
        builder.addCase(jobApply.pending, (state) => {
            state.botResponseLoading = true;
            state.botResponseError = null;
        });

        builder.addCase(jobApply.fulfilled, (state, action: PayloadAction<IBotResponse>) => {
            state.botResponseLoading = false;
            console.log('action.payload.data', action.payload);
            state.botResponse = action.payload;
        });

        builder.addCase(jobApply.rejected, (state, action: PayloadAction<any>) => {
            state.botResponseLoading = false;
            state.botResponseError = action.payload || 'Failed to fetch chats';
        });

        /*chat conversation Reply*/
        builder.addCase(conversationReply.pending, (state) => {
            state.botResponseLoading = true;
            state.botResponseError = null;
        });

        builder.addCase(conversationReply.fulfilled, (state, action: PayloadAction<IBotResponse>) => {
            state.botResponseLoading = false;
            state.botResponse = action.payload;
        });

        builder.addCase(conversationReply.rejected, (state, action: PayloadAction<any>) => {
            state.botResponseLoading = false;
            state.botResponseError = action.payload || 'Failed to fetch conversation data';
        });

        /*fetch job conversation with id*/
        builder.addCase(fetchJobsConversion.pending, (state) => {
            state.botJobConversationLoading = true;
            state.botResponseError = null;
        });

        builder.addCase(fetchJobsConversion.fulfilled, (state, action: PayloadAction<any>) => {
            state.botJobConversationLoading = false;
            console.log('botJobConversation result:', action.payload.conversation);
            state.botResponse = action.payload;
        });

        builder.addCase(fetchJobsConversion.rejected, (state, action: PayloadAction<any>) => {
            state.botJobConversationLoading = false;
            state.botResponseError = action.payload || 'Failed to fetch jobs';
        });
        /*init examination*/
        builder.addCase(initExamination.pending, (state) => {
            state.examDetailsDataLoading = true;

        });

        builder.addCase(initExamination.fulfilled, (state, action: PayloadAction<{ exam: IInitExamResponse }>) => {
            state.examDetailsDataLoading = false;
            state.examDetailsData = action.payload.exam;
        });

        builder.addCase(initExamination.rejected, (state, action: PayloadAction<any>) => {
            state.examDetailsDataLoading = false;
            state.examDetailsError = action.payload || 'Failed to fetch jobs';
        });
        /*startExam */
        builder.addCase(startExam.pending, (state) => {
            // state.questionsListLoading = true;
        });

        builder.addCase(startExam.fulfilled, (state, action: PayloadAction<any>) => {
            // state.questionsListLoading = false;
            // state.questionsList = action.payload;
        });

        builder.addCase(startExam.rejected, (state, action: PayloadAction<any>) => {
            // state.questionsListLoading = false;
        });

    },
});

export const fileUploadProgress = (state: RootState) => state.chats.fileUploadPercent;

export const {fileUploadPercentage,setBotResponse} = chatSlice.actions


export default chatSlice.reducer;

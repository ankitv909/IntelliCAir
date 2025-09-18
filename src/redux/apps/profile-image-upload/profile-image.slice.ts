import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {} from "@/redux/apps/chat-bot/actions";
import {RootState} from "@/redux/store";
import {uploadProfileImage} from "@/redux/apps/profile-image-upload/actions";
import {fileUploadResponse} from "@/redux/apps/profile-image-upload/profile-image.selector";

interface ProfileImageUploadState {
    fileUploadPercent: number;
    uploadStatus: string;
    previousFilePath: string | null;
}

const initialState: ProfileImageUploadState = {
    fileUploadPercent: 0,
    uploadStatus: '',
    previousFilePath: null,
};

export const profileImageSlice = createSlice({
    name: 'profile-image',
    initialState,
    reducers: {
        fileUploadPercentage: (state, action: PayloadAction<number>) => {
            state.fileUploadPercent = action.payload
        },
        setPreviousFilePath: (state, action: PayloadAction<string | null>) => {
            state.previousFilePath = action.payload;
        },
        /*setFileUploadResponse:(state,action: any) => {
            state.fileUploadResponse=action.payload
        }*/
    },
    extraReducers: (builder) => {
        builder.addCase(uploadProfileImage.fulfilled, (state, action) => {
            state.uploadStatus = 'Success';
        });
        builder.addCase(uploadProfileImage.rejected, (state, action) => {
            state.uploadStatus = 'Failed';
        });
    },
});

export const { fileUploadPercentage ,setPreviousFilePath} = profileImageSlice.actions;

export const fileUploadProgress = (state: RootState) => state.profileImage.fileUploadPercent;
export const fileUploadStatus = (state: RootState) => state.profileImage.uploadStatus;
export const previousFilePathSelector = (state: RootState) => state.profileImage.previousFilePath;



export default profileImageSlice.reducer;

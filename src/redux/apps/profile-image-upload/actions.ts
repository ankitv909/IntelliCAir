import {calculateProgress, fileUpload, http, IFileUpload, ProfileFileUpload, thunkHandler} from '@/@core/utils/axios';
// ** Config
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';
import * as process from "process";
import {fileUploadPercentage} from "@/redux/apps/profile-image-upload/profile-image.slice";



interface IUploadResponseData {
    message: string;
    statusCode: number;
}

interface IFileUploadParams {
    file: File;
    email: string;
}

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL



/*upload profile-image*/
export const uploadProfileImage = createAsyncThunk('upload/profile-image', async (params: IFileUploadParams, thunkAPI: AsyncThunkConfig) => {
    const response = await ProfileFileUpload(`${baseUrl}auth/uplaod-image?email=${params.email}`, params, (progressEvent) => {
        console.log('progressEvent', calculateProgress(progressEvent));
        // @ts-ignore
        thunkAPI.dispatch(fileUploadPercentage(<number>calculateProgress(progressEvent)));
    }, thunkAPI);
    console.log('uploadResume:', response.data);
    return response;
});

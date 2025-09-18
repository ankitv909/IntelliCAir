import Axios from 'axios'
// ** Config
import authConfig from '@/configs/auth';
import { AsyncThunkConfig } from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';

//getting token from localStorage for Login
export const loginTokenStorage = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(authConfig.storageTokenKeyName);
    }
};

export const http = (headers: any = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    return Axios.create({
        baseURL: baseURL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginTokenStorage()}`,
            ...headers,
        },
    });
};

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

export const thunkHandler = async (asyncFn: any, thunkAPI: any) => {
    try {
        const response = await asyncFn;
        return response.data.meta
            ? {
                meta: response.data.meta,
                data: response.data.data,
            }
            : response.data.data ?? response.data;
    } catch (error: any) {
        if (
            error.response?.status === 400 ||
            error.response?.status === 401 ||
            error.response?.status === 403 ||
            error.response?.status === 404 ||
            error.response?.status === 409 ||
            error.response?.status === 500
        ) {
            return thunkAPI.rejectWithValue({
                type: 'error',
                status: error.response?.status,
                statusText: error.response.statusText,
                ...error.response.data,
            });
        } else {
            return thunkAPI.rejectWithValue({
                type: 'error',
                status: error?.status,
                statusText: error.statusText,
                ...error.data,
            });
        }
    }
};
export interface IFileUpload {
    toolCallId: string;
    file: File;
    messageId: string;
}

export function fileUpload(
    path: string,
    params: IFileUpload,
    progress: (progressEvent: any) => void,
    thunkAPI: AsyncThunkConfig
) {
    const formData: FormData = new FormData();
    formData.append('file', params.file);
    formData.append('toolCallId', params.toolCallId);
    formData.append('messageId', params.messageId);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${loginTokenStorage()}`,
        },
        onUploadProgress: progress,
    };

    return thunkHandler(http().post(path, formData, config), thunkAPI);
}

export interface IProfileFileUpload {
    file: File;
}
export function ProfileFileUpload(
    path: string,
    params: IProfileFileUpload,
    progress: (progressEvent: any) => void,
    thunkAPI: AsyncThunkConfig
) {
    const formData: FormData = new FormData();
    formData.append('file', params.file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${loginTokenStorage()}`,
        },
        onUploadProgress: progress,
    };

    return thunkHandler(http().post(path, formData, config), thunkAPI);
}

export function calculateProgress(event: ProgressEvent) {
    // Ensure the event has the necessary properties
    if (!event || !event.total || event.total === 0) {
        console.error('Invalid progress event');
        return 0; // Return 0 to indicate no progress or error
    }

    // Calculate the progress percentage
    const progressPercentage = (event.loaded / event.total) * 100;

    return progressPercentage.toFixed(2); // Format to two decimal places
}


export default axios

import { RootState } from '@/redux/store';

export const fileUploadResponse = (state: RootState) => state.profileImage.uploadStatus;
export const fileUploadProgress = (state: RootState) => state.profileImage.fileUploadPercent;
export const fileUploadStatus = (state: RootState) => state.profileImage.uploadStatus;

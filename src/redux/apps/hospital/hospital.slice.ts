import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    bidApprove,
    fullTimeJobCreate,
    hospitalOnboarding,
    IFullTimeJobCreate,
    IHospitalData,
    IPartTimeJobCreate,
    ISpecialityDescriptionResponse,
    partTimeJobCreate,
    specialityDescription
} from "@/redux/apps/hospital/actions";

interface JobState {
    jobCreateResponseLoading: boolean;
    jobCreateResponse: IPartTimeJobCreate | IFullTimeJobCreate | null;
    jobCreateResponseError: string | null;
    hospitalOnboardingLoading: boolean;
    hospitalOnboardingError: string | null;
    basicDetails: IBasicDetails | undefined;
    bidApproveLoading: boolean;
    bidApproveError: string | null;
    bidApproveSuccess: boolean;
    specialityDescriptionLoading: boolean;
    specialityDescriptionData: ISpecialityDescriptionResponse | null;
    specialityDescriptionError: string | null;
}


const initialState: JobState = {
    jobCreateResponseLoading: false,
    jobCreateResponse: null,
    jobCreateResponseError: null,
    hospitalOnboardingLoading: false,
    hospitalOnboardingError: null,
    basicDetails: undefined,
    bidApproveLoading: false,
    bidApproveError: null,
    bidApproveSuccess: false,
    specialityDescriptionLoading: false,
    specialityDescriptionData: null,
    specialityDescriptionError: null,
};

interface IBasicDetails {
    authorized_person: {
        email: string;
        telephone: string;
        firstName: string;
    },
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
}

export const hospitalSlice = createSlice({
    name: 'jobCreate',
    initialState, reducers: {},
    extraReducers: (builder) => {
        builder.addCase(hospitalOnboarding.pending, (state) => {
            state.hospitalOnboardingLoading = true;
            state.hospitalOnboardingError = null;
        });

        builder.addCase(hospitalOnboarding.fulfilled, (state, action: PayloadAction<IHospitalData>) => {
            state.hospitalOnboardingLoading = false;
            state.basicDetails = action.payload;

        });

        builder.addCase(hospitalOnboarding.rejected, (state, action: PayloadAction<any>) => {
            state.hospitalOnboardingLoading = false;
            state.hospitalOnboardingError = action.payload || 'Failed to fetch hospital onboarding';
        });
        /*part TimeJob Create*/
        builder.addCase(partTimeJobCreate.pending, (state) => {
            state.jobCreateResponseLoading = true;
            state.jobCreateResponseError = null;
        });

        builder.addCase(partTimeJobCreate.fulfilled, (state, action: PayloadAction<IPartTimeJobCreate>) => {
            state.jobCreateResponseLoading = false;
            console.log('partTimeJobCreate-slice', action.payload);
            state.jobCreateResponse = action.payload;
        });

        builder.addCase(partTimeJobCreate.rejected, (state, action: PayloadAction<any>) => {
            state.jobCreateResponseLoading = false;
            state.jobCreateResponseError = action.payload || 'Failed to fetch chats';
        });

        /*part TimeJob Create*/
        builder.addCase(fullTimeJobCreate.pending, (state) => {
            state.jobCreateResponseLoading = true;
            state.jobCreateResponseError = null;
        });

        builder.addCase(fullTimeJobCreate.fulfilled, (state, action: PayloadAction<IFullTimeJobCreate>) => {
            state.jobCreateResponseLoading = false;
            console.log('fullTimeJobCreate', action.payload);
            state.jobCreateResponse = action.payload;
        });

        builder.addCase(fullTimeJobCreate.rejected, (state, action: PayloadAction<any>) => {
            state.jobCreateResponseLoading = false;
            state.jobCreateResponse = action.payload || 'Failed to fetch chats';
        });

        /*bid approve*/
        builder.addCase(bidApprove.pending, (state) => {
            state.bidApproveLoading = true;
            state.bidApproveError = null;
            state.bidApproveSuccess = false;
        });

        builder.addCase(bidApprove.fulfilled, (state, action: PayloadAction<IHospitalData>) => {
            state.bidApproveLoading = false;
            state.bidApproveSuccess = true;
            /* state.basicDetails=action.payload;*/

        });

        builder.addCase(bidApprove.rejected, (state, action: PayloadAction<any>) => {
            state.bidApproveLoading = false;
            state.bidApproveError = action.payload || 'Failed to approve bid';
        });

        // Speciality Description
        builder.addCase(specialityDescription.pending, (state) => {
            state.specialityDescriptionLoading = true;
            state.specialityDescriptionError = null;
        });
        builder.addCase(specialityDescription.fulfilled, (state, action: PayloadAction<ISpecialityDescriptionResponse>) => {
            state.specialityDescriptionLoading = false;
            state.specialityDescriptionData = action.payload;
        });
        builder.addCase(specialityDescription.rejected, (state, action: PayloadAction<any>) => {
            state.specialityDescriptionLoading = false;
            state.specialityDescriptionError = action.payload || 'Failed to fetch job description';
        });
    },
});

export const {} = hospitalSlice.actions


export default hospitalSlice.reducer;

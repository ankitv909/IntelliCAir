import {configureStore} from '@reduxjs/toolkit'
import jobsReducer from '@/redux/apps/dashboard/dashboard.slice';
import chatsReducer from '@/redux/apps/chat-bot/chat.slice';
import examReducer from '@/redux/apps/exam/exam.slice';
import recruiterReducer from '@/redux/apps/recruiter/recruiter.slice';
import hospitalReducer from '@/redux/apps/hospital/hospital.slice';
import profileImageUploadReducer from '@/redux/apps/profile-image-upload/profile-image.slice';


export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        chats: chatsReducer,
        recruiter:recruiterReducer,
        exam: examReducer,
        jobCreate: hospitalReducer,
        profileImage: profileImageUploadReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

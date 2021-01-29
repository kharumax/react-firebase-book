import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";
import tweetsReducer from "./slices/tweetsSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tweets: tweetsReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
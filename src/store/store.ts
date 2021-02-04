import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";
import tweetsReducer from "./slices/tweetsSlice";
import profileReducer from "./slices/profileSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tweets: tweetsReducer,
        profile: profileReducer,
        users: usersReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
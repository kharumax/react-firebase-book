import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";
import tweetsReducer from "./slices/tweetsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tweets: tweetsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
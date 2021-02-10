import {createSlice} from "@reduxjs/toolkit";
import {Message} from "../../data/entities/Message";
import {FirestoreTimestampToString} from "../../utils/Utils";
import {RootState} from "../store";

const initialMessagesState: Message[] =[
    // {id: "",uid: "",profileImageUrl: "",message: "",timestamp: FirestoreTimestampToString(new Date()),isFromCurrentUser: false}
];


export const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        messages: initialMessagesState
    },
    reducers: {
        addMessages: (state,action) => {
            state.messages = action.payload;
        },
        addNewMessage: (state,action) => {
            const newMessages = state.messages;
            newMessages.unshift(action.payload);
            state.messages = newMessages;
        },
        clearMessages: (state) => {
            state.messages = initialMessagesState;
        },
    }
});

export const { addMessages,addNewMessage,clearMessages } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

export default messagesSlice.reducer;
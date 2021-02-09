import {Room} from "../../data/entities/Room";
import {FirestoreTimestampToString} from "../../utils/Utils";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

const initialRoomsState: Room[] = [
    {
        id: "", partnerUid: "",partnerUsername: "",partnerProfileImageUrl: "",
        currentMessage: "",currentTimestamp: FirestoreTimestampToString(new Date())
    }
];

interface IRoomUpdate {
    roomId: string;
    message: string;
    timestamp: any;
}


export const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        rooms: initialRoomsState,
    },
    reducers: {
        addRooms: (state,action) => {
            state.rooms = action.payload;
        },
        addNewRoom: (state,action) => {
            const newRooms = state.rooms;
            newRooms.unshift(action.payload);
            state.rooms = newRooms;
        },
        updateRoom: (state,action: { payload: IRoomUpdate }) => {
            state.rooms = state.rooms.map(room => {
                if (room.id == action.payload.roomId) {
                    room.currentMessage = action.payload.message;
                    room.currentTimestamp = action.payload.timestamp;
                }
                return room
            })
        }
    }
});


export const { addNewRoom,addRooms,updateRoom } = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms.rooms;

export default roomsSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface CallState {
    incomingCall: InfoCallUser | null;
}

const initialState: CallState = {
    incomingCall: null,
};

export const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        setIncomingCall: (state, action) => {
            state.incomingCall = action.payload;
        },
        clearIncomingCall: (state) => {
            state.incomingCall = null;
        },
    },
});

export const { setIncomingCall, clearIncomingCall } = callSlice.actions;
export default callSlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface CallState {
    incomingCall: InfoCallUser | null;   // Thông tin cuộc gọi đến
    callAccepted: boolean;               // Đã chấp nhận chưa
    callType: 'video' | 'audio' | null;  // Loại cuộc gọi
}

const initialState: CallState = {
    incomingCall: null,
    callAccepted: false,
    callType: null
};

export const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        setIncomingCall: (state, action) => {
            state.incomingCall = action.payload;
            state.callType = action.payload.callType;
            state.callAccepted = false; // reset khi có cuộc gọi mới
        },
        clearIncomingCall: (state) => {
            state.incomingCall = null;
            state.callType = null;
            state.callAccepted = false;
        },
        setCallAccepted: (state, action: PayloadAction<boolean>) => {
            state.callAccepted = action.payload;
        },
        setCallType: (state, action: PayloadAction<'video' | 'audio' | null>) => {
            state.callType = action.payload;
        }
    },
});

export const {
    setIncomingCall,
    clearIncomingCall,
    setCallAccepted,
    setCallType
} = callSlice.actions;

export default callSlice;

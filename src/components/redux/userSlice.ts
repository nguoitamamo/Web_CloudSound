
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUserData: null,
    currentUserId: "",
    onlineUsers: [],
    isLoaderOwner: false,
  },
  reducers: {
    SetCurrentUser: (state, action) => {
      state.currentUserData = action.payload;
    },
    SetCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    SetOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    SetIsLoader: (state, action) => {

      state.isLoaderOwner = action.payload;
      console.log(">>> check truue", state.isLoaderOwner);
    }
  },
});

export const { SetCurrentUser, SetCurrentUserId, SetOnlineUsers, SetIsLoader } =
  userSlice.actions;

export default userSlice;

export interface UserState {
  currentUserData: UserType | null;
  currentUserId: string;
  onlineUsers: string[];
  isLoaderOwner: boolean;
}

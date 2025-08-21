import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import userSlice from "./userSlice";
import genresSlice from "./genresSlice";
import authorsSlice from "./authorsSlice";
import albumssSlice from "./albumsSlice";
import callSlice from "./callSlice";



const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
    authors: authorsSlice.reducer,
    genres: genresSlice.reducer,
    albums: albumssSlice.reducer,
    call: callSlice.reducer,


  },
});

export default store;

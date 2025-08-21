
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface AlbumsState {
    albums: AlbumType[];
    albumID: string;
}

const initialState: AlbumsState = {
    albums: [],
    albumID: ''
};

const albumssSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setAlbums(state, action) {
            state.albums = action.payload;
        },
        setAlbumID(state, action) {
            state.albumID = action.payload
        },
        clearAlbums(state) {
            state.albums = [];
        }
    },
});

export const { setAlbums, clearAlbums, setAlbumID } = albumssSlice.actions;
export default albumssSlice;

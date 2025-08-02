
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GenresState {
    genres: Genre[];
}

const initialState: GenresState = {
    genres: [],
};

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres(state, action) {
            state.genres = action.payload;
        },
        clearGenres(state) {
            state.genres = [];
        }
    },
});

export const { setGenres, clearGenres } = genresSlice.actions;
export default genresSlice;

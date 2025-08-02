
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface AuthorsState {
    authors: UserType[];
}

const initialState: AuthorsState = {
    authors: [],
};

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        setAuthors(state, action) {
            state.authors = action.payload;
        },
        clearAuthors(state) {
            state.authors = [];
        }
    },
});

export const { setAuthors, clearAuthors } = authorsSlice.actions;
export default authorsSlice;

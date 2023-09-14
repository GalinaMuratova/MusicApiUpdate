import {Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchTracks} from "./tracksThunk";

interface TracksSlice {
    items: Track[],
    fetchLoading: boolean;
    createLoading: boolean;
    album: string
}

const initialState: TracksSlice = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    album:''
};

export const tracksSlice = createSlice({
    name:'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(fetchTracks.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
            state.fetchLoading = false;
            state.items = tracks;
            state.album = tracks.map((el) => {return el.album.name})[0];
        });
        builder.addCase(fetchTracks.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;

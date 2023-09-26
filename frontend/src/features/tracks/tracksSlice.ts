import {Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchTracks} from "./tracksThunk";
import {RootState} from "../../app/store";

interface TracksSlice {
    items: Track[],
    fetchLoading: boolean;
    createLoading: boolean;
    album: string,
}

const initialState: TracksSlice = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    album:'',
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
            state.album = tracks[0].album.name;
        });
        builder.addCase(fetchTracks.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracksReducer.items;
export const selectOneAlbum = (state: RootState) => state.tracksReducer.album;
export const selectTracksLoading = (state: RootState) => state.tracksReducer.fetchLoading;


import {Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {changeTrackPublish, createTrack, deleteTrack, fetchTracks} from "./tracksThunk";
import {RootState} from "../../app/store";

interface TracksSlice {
    items: Track[],
    fetchLoading: boolean;
    createLoading: boolean;
    changeLoading:boolean;
    deleteLoading:boolean;
    album: string,
}

const initialState: TracksSlice = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    changeLoading:false,
    deleteLoading:false,
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

        builder.addCase(createTrack.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createTrack.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createTrack.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(changeTrackPublish.pending, (state) => {
            state.changeLoading = true;
        });
        builder.addCase(changeTrackPublish.fulfilled, (state) => {
            state.changeLoading = false;
        });
        builder.addCase(changeTrackPublish.rejected, (state) => {
            state.changeLoading = false;
        });

        builder.addCase(deleteTrack.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteTrack.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteTrack.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracksReducer.items;
export const selectOneAlbum = (state: RootState) => state.tracksReducer.album;
export const selectTracksLoading = (state: RootState) => state.tracksReducer.fetchLoading;
export const selectCreateTrackLoading = (state: RootState) => state.tracksReducer.createLoading;


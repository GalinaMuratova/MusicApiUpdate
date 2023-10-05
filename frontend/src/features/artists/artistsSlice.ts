import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { changeArtistPublish, createArtist, deleteArtist, fetchArtists } from './artistsThunk';
import { RootState } from '../../app/store';

interface ArtistsState {
  items: Artist[];
  fetchLoading: boolean;
  createLoading: boolean;
  changeLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  changeLoading: false,
  deleteLoading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
      state.fetchLoading = false;
      state.items = artists;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createArtist.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(changeArtistPublish.pending, (state) => {
      state.changeLoading = true;
    });
    builder.addCase(changeArtistPublish.fulfilled, (state) => {
      state.changeLoading = false;
    });
    builder.addCase(changeArtistPublish.rejected, (state) => {
      state.changeLoading = false;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteArtist.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artistsReducer.items;
export const selectArtistLoading = (state: RootState) => state.artistsReducer.fetchLoading;
export const selectCreateArtistLoading = (state: RootState) => state.artistsReducer.createLoading;

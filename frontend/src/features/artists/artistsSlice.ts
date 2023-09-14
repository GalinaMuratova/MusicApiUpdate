import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists } from './artistsThunk';

interface ArtistsState {
  items: Artist[];
  fetchLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder)=> {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
      state.fetchLoading = false;
      state.items = artists;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
    })
  }
});

export const artistsReducer = artistsSlice.reducer;
import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import {fetchAlbums, fetchOneAlbum} from './albumsThunk';

interface AlbumsState {
  items: Album[];
  fetchLoading: boolean;
  artist: string
}

const initialState: AlbumsState = {
  items: [],
  fetchLoading: false,
  artist:''
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchAlbums.fulfilled, (state, {payload: artists}) => {
      state.fetchLoading = false;
      state.items = artists;
      state.artist = artists.map((el) => {return el.artist.name})[0];
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchOneAlbum.fulfilled, (state, {payload: artists}) => {
      state.fetchLoading = false;
      state.artist = artists.artist.name;
    });
    builder.addCase(fetchOneAlbum.rejected, (state) => {
      state.fetchLoading = false;
    })
  }
});

export const albumsReducer = albumsSlice.reducer;
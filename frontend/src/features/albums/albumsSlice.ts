import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import {changeAlbumPublish, createAlbum, deleteAlbum, fetchAlbums, fetchAllAlbums, fetchOneAlbum} from './albumsThunk';
import {RootState} from "../../app/store";

interface AlbumsState {
  items: Album[];
  allAlbums: Album[];
  artist: string;
  fetchAllLoading:boolean;
  fetchLoading: boolean;
  createLoading:boolean;
  changeLoading: boolean;
  deleteLoading:boolean
}

const initialState: AlbumsState = {
  items: [],
  allAlbums:[],
  artist:'',
  fetchAllLoading:false,
  fetchLoading: false,
  createLoading:false,
  changeLoading:false,
  deleteLoading:false
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAlbums.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchAllAlbums.fulfilled, (state, {payload: artists}) => {
      state.fetchAllLoading = false;
      state.allAlbums = artists;
    });
    builder.addCase(fetchAllAlbums.rejected, (state) => {
      state.fetchAllLoading = false;
    });

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
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(changeAlbumPublish.pending, (state) => {
      state.changeLoading = true;
    });
    builder.addCase(changeAlbumPublish.fulfilled, (state) => {
      state.changeLoading = false;
    });
    builder.addCase(changeAlbumPublish.rejected, (state) => {
      state.changeLoading = false;
    });

    builder.addCase(deleteAlbum.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteAlbum.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteAlbum.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albumsReducer.items;
export const selectAllAlbums = (state: RootState) => state.albumsReducer.allAlbums;
export const selectOneArtist = (state: RootState) => state.albumsReducer.artist;
export const selectAlbumsLoading = (state: RootState) => state.albumsReducer.fetchLoading;
export const selectOneLoading = (state: RootState) => state.albumsReducer.fetchAllLoading;
export const selectCreateAlbumLoading = (state: RootState) => state.albumsReducer.createLoading;

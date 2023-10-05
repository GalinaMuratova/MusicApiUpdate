import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album, AlbumMutation } from '../../types';

export const fetchAllAlbums = createAsyncThunk<Album[]>('albums/fetchAllItems', async () => {
  const albumsResponse = await axiosApi.get<Album[]>(`/albums`);
  return albumsResponse.data;
});

export const fetchAlbums = createAsyncThunk<Album[], string>('albums/fetchAll', async (id) => {
  const albumsResponse = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
  return albumsResponse.data;
});

export const fetchOneAlbum = createAsyncThunk<Album, string>('albums/fetchOne', async (id) => {
  const albumsResponse = await axiosApi.get<Album>(`/albums/${id}`);
  return albumsResponse.data;
});

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'albums/create',
  async (albumMutation) => {
    const formData = new FormData();

    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];

    keys.forEach((key) => {
      const value = albumMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/albums', formData);
  },
);

export const changeAlbumPublish = createAsyncThunk<void, string>(
  'albums/changePublish',
  async (id) => {
    await axiosApi.patch(`/albums/${id}/togglePublished`);
  },
);

export const deleteAlbum = createAsyncThunk<void, string>('albums/delete', async (id) => {
  await axiosApi.delete(`/albums/${id}`);
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Album} from '../../types';

export const fetchAlbums  =createAsyncThunk<Album[], string>(
  'albums/fetchAll',
  async (id) => {
    const albumsResponse = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
    return albumsResponse.data;
  }
);

export const fetchOneAlbum  =createAsyncThunk<Album, string>(
    'albums/fetchOne',
    async (id) => {
        const albumsResponse = await axiosApi.get<Album>(`/albums/${id}`);
        return albumsResponse.data;
    }
);
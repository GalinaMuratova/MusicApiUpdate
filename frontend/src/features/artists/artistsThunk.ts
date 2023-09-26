import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist, ArtistMutation } from '../../types';

export const fetchArtists  =createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const artistsResponse = await axiosApi.get<Artist[]>('/artists');
    return artistsResponse.data;
  }
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/create',
  async (productMutation) => {
    const formData = new FormData();

    const keys = Object.keys(productMutation) as (keyof ArtistMutation)[];

    keys.forEach(key => {
      const value = productMutation[key];
      if (value !== null) {
        formData.append(key,value);
      }
    })

    await axiosApi.post('/artists', formData, );
  }
);

export const changeArtistPublish = createAsyncThunk<void, string >(
  'artists/changePublish',
  async (id) => {
      await axiosApi.patch(`/artists/${id}/togglePublished`);
  }
);

export const deleteArtist = createAsyncThunk<void, string>(
    'artists/delete',
    async (id) => {
        await axiosApi.delete(`/artists/${id}`);
    }
);
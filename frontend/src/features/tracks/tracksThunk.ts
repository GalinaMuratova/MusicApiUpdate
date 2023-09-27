import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Track, TrackMutation} from '../../types';

export const fetchTracks  =createAsyncThunk<Track[], string>(
    'tracks/fetchAll',
    async (id) => {
        const tracksResponse = await axiosApi.get<Track[]>(`/tracks?album=${id}`);
        return tracksResponse.data;
    }
);

export const createTrack = createAsyncThunk<void, TrackMutation>(
    'tracks/create',
    async (trackMutation) => {

        await axiosApi.post('/tracks', trackMutation, );
    }
);

export const changeTrackPublish = createAsyncThunk<void, string >(
    'tracks/changePublish',
    async (id) => {
        await axiosApi.patch(`/tracks/${id}/togglePublished`);
    }
);

export const deleteTrack = createAsyncThunk<void, string>(
    'tracks/delete',
    async (id) => {
        await axiosApi.delete(`/tracks/${id}`);
    }
);
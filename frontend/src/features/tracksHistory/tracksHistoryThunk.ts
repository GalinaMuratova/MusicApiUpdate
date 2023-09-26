import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { TrackHistory} from '../../types';
import { RootState } from '../../app/store';

export const fetchTracksHistory  =createAsyncThunk<TrackHistory[], void, { state: RootState}>(
  'tracksHistory/fetchAll',
  async (_, thunkAPI) => {
    const userState = thunkAPI.getState().usersReducer;
    const trackHistoryResponse = await axiosApi.get<TrackHistory[]>('/track_history', {headers: {'Authorization': userState.user?.token}});
    return trackHistoryResponse.data;
  });

export const postTrackHistory = createAsyncThunk<void, { track: string, artist: string}>(
  'tracksHistory/postTrackHistory',
  async (trackHistoryData) => {

    await axiosApi.post('/track_history', trackHistoryData);
  }
);
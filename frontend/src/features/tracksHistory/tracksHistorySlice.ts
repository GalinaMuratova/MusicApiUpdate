import { TrackHistory} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchTracksHistory, postTrackHistory } from './tracksHistoryThunk';


interface TracksHistoryState {
  items: TrackHistory[] ,
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: TracksHistoryState = {
  items: [],
  fetchLoading:false,
  createLoading:false,
}
export const tracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracksHistory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTracksHistory.fulfilled, (state, {payload: tracksHistory}) => {
      state.fetchLoading = false;
      state.items = tracksHistory;
    });
    builder.addCase(fetchTracksHistory.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(postTrackHistory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(postTrackHistory.fulfilled, (state, ) => {
      state.createLoading = false;
    });
    builder.addCase(postTrackHistory.rejected, (state) => {
      state.createLoading = false;
    });
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;
export const selectTracksHistoryLoading = (state: RootState) => state.tracksHistoryReducer.fetchLoading;
export const selectTracksHistoryItems = (state: RootState) => state.tracksHistoryReducer.items;

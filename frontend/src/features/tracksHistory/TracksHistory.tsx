import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTracksHistory } from './tracksHistoryThunk';
import { selectTracksHistoryItems } from './tracksHistorySlice';
import TrackHistoryBlock from './components/TrackHistoryBlock';

const TracksHistory = () => {
  const dispatch = useAppDispatch();
  const tracksNew = useAppSelector(selectTracksHistoryItems);

  useEffect(() => {
    dispatch(fetchTracksHistory())
  }, [dispatch]);

  return (
    <>
      <h1>No songs yet</h1>
      {tracksNew.map((el) => (
        <TrackHistoryBlock key={el._id} nameTrack={el.track.name} date={el.datetime} />
      ))}
    </>
  );
};

export default TracksHistory;
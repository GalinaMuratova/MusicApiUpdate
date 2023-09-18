import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTracksHistory } from './tracksHistoryThunk';
import { selectTracksHistoryItems } from './tracksHistorySlice';
import TrackHistoryBlock from './components/TrackHistoryBlock';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

const TracksHistory = () => {
  const dispatch = useAppDispatch();
  const tracksNew = useAppSelector(selectTracksHistoryItems);

  useEffect(() => {
    dispatch(fetchTracksHistory())
  }, [dispatch]);

  const reversedTracks = [...tracksNew].reverse();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate('/login');
    }
  }, [user])

  return (
    <>
      {reversedTracks.length > 0 ? (
        reversedTracks.map((el) => (
          <TrackHistoryBlock key={el._id} nameArtist={el.artist} nameTrack={el.track.name} date={el.datetime} />
        ))
      ) : (
        <div>No songs yet</div>
      )}
    </>
  );
};

export default TracksHistory;
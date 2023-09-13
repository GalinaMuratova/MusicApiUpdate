import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from './artistsThunk';
import { RootState } from '../../app/store';
import ArtistBlock from './components/ArtistBlock/ArtistBlock';
import { Grid } from '@mui/material';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector((state: RootState) => state.artistsReducer.items);
  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <>
      <Grid container item spacing={2}>
        {artists.map((el)=> (
          <ArtistBlock key={el._id} name={el.name} artistsImage={el.image}/>
        ))}
      </Grid>
    </>
  );
};

export default Artists;
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from './artistsThunk';
import ArtistBlock from './components/ArtistBlock/ArtistBlock';
import {CircularProgress, Grid} from '@mui/material';
import {selectArtistLoading, selectArtists} from "./artistsSlice";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <>
        {loading ? (
            <Grid item container justifyContent="center">
                <CircularProgress />
            </Grid>
        ) : (
            <Grid container item spacing={2}>
                {artists.map((el)=> (
                    <ArtistBlock key={el._id} id={el._id} name={el.name} artistsImage={el.image}/>
                ))}
            </Grid>
        )}
    </>
  );
};

export default Artists;
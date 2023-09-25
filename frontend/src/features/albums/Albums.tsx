import React, { useEffect } from 'react';
import {CircularProgress, Grid, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchAlbums} from "./albumsThunk";
import AlbumBlock from "./components/AlbumBlock/AlbumBlock";
import {useSelector} from "react-redux";
import {selectAlbums, selectAlbumsLoading, selectOneArtist} from "./albumsSlice";

const Albums = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const artist = useSelector(selectOneArtist);
  const loading = useAppSelector(selectAlbumsLoading);
  useEffect(() => {
    if (id) {
        dispatch(fetchAlbums(id));
    }}, [dispatch]);
  return (
    <>
        {loading ? (
            <Grid item container justifyContent="center">
                <CircularProgress />
            </Grid>
        ) : (
            <>
                <Typography component='h2' variant='h4' style={{textAlign:"center", margin:'20px 0'}}>{artist}</Typography>
                <Grid container item spacing={3}>
                    {albums.map((el)=> (
                        <AlbumBlock key={el._id} id={el._id} name={el.name} albumsImage={el.image} year={el.year} />
                    ))}
                </Grid>
            </>
        )}
    </>
  );
};

export default Albums;
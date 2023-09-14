import React, { useEffect } from 'react';
import {Grid, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchAlbums} from "./albumsThunk";
import {RootState} from "../../app/store";
import AlbumBlock from "./components/AlbumBlock/AlbumBlock";
import {useSelector} from "react-redux";

const Albums = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector((state: RootState) => state.albumsReducer.items);
  const artist = useSelector((state: RootState) => state.albumsReducer.artist);
  useEffect(() => {
    if (id) {
        dispatch(fetchAlbums(id));
    }}, [dispatch]);
  return (
    <>
        <Typography component='h2' variant='h4' style={{textAlign:"center", margin:'20px 0'}}>{artist}</Typography>
        <Grid container item spacing={3}>
            {albums.map((el)=> (
              <AlbumBlock key={el._id} id={el._id} name={el.name} albumsImage={el.image} year={el.year} />
            ))}
        </Grid>
    </>
  );
};

export default Albums;
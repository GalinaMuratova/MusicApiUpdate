import React, { useEffect } from 'react';
import {CircularProgress, Grid, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchAlbums} from "./albumsThunk";
import AlbumBlock from "./components/AlbumBlock";
import {useSelector} from "react-redux";
import {selectAlbums, selectAlbumsLoading, selectOneArtist} from "./albumsSlice";
import {userRoles} from "../../constants";
import {selectUser} from "../users/usersSlice";

const Albums = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const artist = useSelector(selectOneArtist);
  const loading = useAppSelector(selectAlbumsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
        dispatch(fetchAlbums(id));
    }}, [dispatch]);

  const newAlbums = albums.filter((el) => {
    if (user && user.role === userRoles.admin) {
      return true;
    } else {
      return el.isPublished;
    }
  });
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
                    {newAlbums.map((el)=> (
                        <AlbumBlock key={el._id} idAlbum={el._id} name={el.name} albumsImage={el.image} year={el.year} isPublished={el.isPublished} />
                    ))}
                </Grid>
            </>
        )}
    </>
  );
};

export default Albums;
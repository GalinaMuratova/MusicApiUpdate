import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from './artistsThunk';
import ArtistBlock from './components/ArtistBlock/ArtistBlock';
import {CircularProgress, Grid} from '@mui/material';
import {selectArtistLoading, selectArtists} from "./artistsSlice";
import {selectUser} from "../users/usersSlice";
import {userRoles} from "../../constants";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const newArtists = artists.filter((el) => {
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
            <Grid container item spacing={2}>
              {newArtists.map((el) => (
                  <ArtistBlock key={el._id} id={el._id} name={el.name} artistsImage={el.image} isPublished={el.isPublished}/>
              ))}
            </Grid>
        )}
    </>
  );
};

export default Artists;
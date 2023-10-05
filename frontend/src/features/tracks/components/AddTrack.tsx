import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { selectAllAlbums, selectOneLoading } from '../../albums/albumsSlice';
import { TrackMutation } from '../../../types';
import { fetchAllAlbums } from '../../albums/albumsThunk';
import { createTrack } from '../tracksThunk';
import { selectCreateTrackLoading } from '../tracksSlice';
import { CircularProgress, Grid, MenuItem, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { userRoles } from '../../../constants';
import { selectUser } from '../../users/usersSlice';

const AddTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateTrackLoading);
  const albums = useAppSelector(selectAllAlbums);
  const albumsLoading = useAppSelector(selectOneLoading);
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<TrackMutation>({
    name: '',
    album: '',
    number: 0,
    duration: '',
  });

  useEffect(() => {
    dispatch(fetchAllAlbums());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createTrack(state)).unwrap();
      navigate(`/tracks/${state.album}`);
    } catch (e) {
      alert('Invalid field');
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const newAlbums = albums.filter((el) => {
    if (user && user.role === userRoles.admin) {
      return true;
    } else {
      return el.isPublished;
    }
  });

  return !albumsLoading ? (
    <>
      <form autoComplete="on" onSubmit={submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              required
              select
              label="Album"
              value={state.album}
              onChange={inputChangeHandler}
              name="album"
            >
              <MenuItem disabled>Please select album</MenuItem>
              {newAlbums.map((el) => (
                <MenuItem key={el._id} value={el._id}>
                  {el.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs>
            <TextField
              id="name"
              label="Track name"
              value={state.name}
              onChange={inputChangeHandler}
              name="name"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="number"
              label="Number of track in album"
              value={state.number}
              onChange={inputChangeHandler}
              name="number"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="duration"
              label="Duration"
              value={state.duration}
              onChange={inputChangeHandler}
              name="duration"
              required
            />
          </Grid>
          <Grid item xs>
            <LoadingButton
              type="submit"
              size="small"
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  ) : (
    <CircularProgress />
  );
};

export default AddTrack;

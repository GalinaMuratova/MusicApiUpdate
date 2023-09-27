import React, { useEffect, useState } from 'react';
import { fetchArtists } from '../../artists/artistsThunk';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {selectArtistLoading, selectArtists} from '../../artists/artistsSlice';
import { AlbumMutation } from '../../../types';
import {CircularProgress, Grid, MenuItem, TextField} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {selectCreateAlbumLoading} from "../albumsSlice";
import {createAlbum} from "../albumsThunk";

const AddAlbumForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateAlbumLoading);
    const artists = useAppSelector(selectArtists);
    const artistsLoading = useAppSelector(selectArtistLoading);

    const [state, setState] = useState<AlbumMutation>({
      name:'',
      year: '',
      artist:'',
      image: null
    });

    useEffect(() => {
      dispatch(fetchArtists())
    }, [dispatch]);

    const submitFormHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await dispatch(createAlbum(state)).unwrap();
        navigate('/');
      } catch (e) {
        alert('Invalid field');
      }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setState(prevState => {
        return {...prevState, [name]: value};
      });
    };
    const filesInputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name, files} = e.target;
      if (files) {
        setState((prevState) => ({
          ...prevState,
          [name]: files[0]
        }));
      }
    };

    return !artistsLoading ? (
    <>
      <form
        autoComplete="on"
        onSubmit={submitFormHandler}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              required
              select
              label='Artist'
              value={state.artist}
              onChange={inputChangeHandler}
              name='artist'
            >
              <MenuItem disabled>Please select artist</MenuItem>
              {artists.map((el) => (
                <MenuItem key={el._id} value={el._id}>
                  {el.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs>
            <TextField
              id="name"
              label="Album name"
              value={state.name}
              onChange={inputChangeHandler}
              name="name"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="year"
              label="Year of issue"
              value={state.year}
              onChange={inputChangeHandler}
              name="year"
              required
            />
          </Grid>
          <Grid item xs>
            <FileInput
              onChange={filesInputChangeHandler}
              name='image'
              label='image' />
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
  ) : <CircularProgress />
};

export default AddAlbumForm;
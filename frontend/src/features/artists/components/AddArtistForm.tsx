import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ArtistMutation } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { selectCreateArtistLoading } from '../artistsSlice';
import { createArtist } from '../artistsThunk';

const AddArtistForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateArtistLoading);
  const [state, setState] = useState<ArtistMutation>({
    name:'',
    information:'',
    image: null
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createArtist(state)).unwrap();
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
  return (
    <>
      <form
        autoComplete="on"
        onSubmit={submitFormHandler}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              id="name"
              label="Artist name"
              value={state.name}
              onChange={inputChangeHandler}
              name="name"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              multiline
              rows={3}
              id="information"
              label="Information"
              value={state.information}
              onChange={inputChangeHandler}
              name="information"
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
  );
};

export default AddArtistForm;
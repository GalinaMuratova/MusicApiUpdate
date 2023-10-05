import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import AddArtistForm from './components/AddArtistForm';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

const NewArtist = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Add new artist
        </Typography>
        <AddArtistForm />
      </Container>
    </>
  );
};

export default NewArtist;

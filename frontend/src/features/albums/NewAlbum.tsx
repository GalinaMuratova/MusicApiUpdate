import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AddAlbumForm from './components/AddAlbumForm';

const NewAlbum = () => {
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
          Add new album
        </Typography>
        <AddAlbumForm />
      </Container>
    </>
  );
};

export default NewAlbum;

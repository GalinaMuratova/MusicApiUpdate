import React from 'react';
import { Container } from '@mui/material';
import Artists from '../../features/artists/Artists';
import AppToolbar from "../../components/UI/AppToolbar/AppToolbar";

const HomePage = () => {
  return (
      <>
          <AppToolbar />
          <Container>
              <Artists />
          </Container>
      </>
  );
};

export default HomePage;
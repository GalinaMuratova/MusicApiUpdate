import React from 'react';
import Albums from '../../features/albums/Albums';
import AppToolbar from "../../components/UI/AppToolbar/AppToolbar";

const OneArtistPage = () => {
  return (
    <>
      <AppToolbar />
      <Albums />
    </>
  );
};

export default OneArtistPage;
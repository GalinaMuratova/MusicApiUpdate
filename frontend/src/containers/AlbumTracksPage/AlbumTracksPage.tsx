import React from 'react';
import AppToolbar from "../../components/UI/AppToolbar/AppToolbar";
import Tracks from "../../features/tracks/Tracks";

const AlbumTracksPage = () => {
    return (
        <>
         <AppToolbar />
         <Tracks />
        </>
    );
};

export default AlbumTracksPage;
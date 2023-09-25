import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {CircularProgress, Grid, Typography} from "@mui/material";
import TrackBlock from "./components/TrackBlock/TrackBlock";
import {fetchTracks} from "./tracksThunk";
import {fetchOneAlbum} from "../albums/albumsThunk";
import {selectOneArtist} from "../albums/albumsSlice";
import {selectOneAlbum, selectTracks, selectTracksLoading} from "./tracksSlice";

const Tracks = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const artist = useAppSelector(selectOneArtist);
    const album = useAppSelector(selectOneAlbum);
    const tracks = useAppSelector(selectTracks);
    const loading = useAppSelector(selectTracksLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
            dispatch(fetchOneAlbum(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {loading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    <Typography variant='h4' style={{textAlign:'center'}} >{artist}</Typography>
                    <Typography variant='h5' style={{textAlign:'center', color:'gray'}}>{album}</Typography>
                    {tracks.map((el) => (
                        <TrackBlock key={el._id} artist={artist} id={el._id} name={el.name} number={el.number} duration={el.duration} />
                    ))}
                </>
            )}
        </>
    );
};

export default Tracks;
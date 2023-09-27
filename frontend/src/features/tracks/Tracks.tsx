import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {CircularProgress, Grid, Typography} from "@mui/material";
import TrackBlock from "./components/TrackBlock";
import {fetchTracks} from "./tracksThunk";
import {fetchOneAlbum} from "../albums/albumsThunk";
import {selectOneArtist} from "../albums/albumsSlice";
import {selectOneAlbum, selectTracks, selectTracksLoading} from "./tracksSlice";
import {userRoles} from "../../constants";
import {selectUser} from "../users/usersSlice";

const Tracks = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const artist = useAppSelector(selectOneArtist);
    const album = useAppSelector(selectOneAlbum);
    const tracks = useAppSelector(selectTracks);
    const loading = useAppSelector(selectTracksLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
            dispatch(fetchOneAlbum(id));
        }
    }, [dispatch, id]);

    const newTracks= tracks.filter((el) => {
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
                <>
                    <Typography variant='h4' style={{textAlign:'center'}} >{artist}</Typography>
                    <Typography variant='h5' style={{textAlign:'center', color:'gray'}}>{album}</Typography>
                    {newTracks.map((el) => (
                        <TrackBlock key={el._id} artist={artist} idTrack={el._id} name={el.name} number={el.number} duration={el.duration} isPublished={el.isPublished}/>
                    ))}
                </>
            )}
        </>
    );
};

export default Tracks;
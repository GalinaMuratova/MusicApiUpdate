import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {Typography} from "@mui/material";
import TrackBlock from "./components/TrackBlock/TrackBlock";
import {fetchTracks} from "./tracksThunk";
import {fetchOneAlbum} from "../albums/albumsThunk";

const Tracks = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const artist = useAppSelector((state: RootState) => state.albumsReducer.artist);
    const album = useAppSelector((state: RootState) => state.tracksReducer.album);
    const tracks = useAppSelector((state: RootState) => state.tracksReducer.items);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
            dispatch(fetchOneAlbum(id));
        }
    }, [dispatch, id]);

    return (
        <>
            <Typography variant='h4' style={{textAlign:'center'}} >{artist}</Typography>
            <Typography variant='h5' style={{textAlign:'center', color:'gray'}}>{album}</Typography>
            {tracks.map((el) => (
                <TrackBlock key={el._id} id={el._id} name={el.name} number={el.number} duration={el.duration} />
            ))}
        </>
    );
};

export default Tracks;
import React, { useState } from 'react';
import {Box, Button, Card, CardContent, Grid, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { postTrackHistory } from '../../tracksHistory/tracksHistoryThunk';
import { selectUser } from '../../users/usersSlice';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {changeTrackPublish, deleteTrack, fetchTracks} from "../tracksThunk";
import {useParams} from "react-router-dom";
import {userRoles} from "../../../constants";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    idTrack: string
    name: string,
    number: number,
    duration: string,
    artist: string,
    isPublished: boolean
}

const TrackBlock: React.FC<Props> = ({name, number, duration,idTrack, artist, isPublished}) => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [playButtonClicked, setPlayButtonClicked] = useState(false);
  const onClick = async () => {
    await dispatch(postTrackHistory({ track: idTrack, artist: artist}));
    setPlayButtonClicked(true);
  };

    const onPublic = async () => {
        await dispatch(changeTrackPublish(idTrack));
        if (id) {
            await dispatch(fetchTracks(id));
        }
    };

    const onDelete = async () => {
        const alert = window.confirm('Do you want to delete this track?');
        if (alert) {
            await dispatch(deleteTrack(idTrack));
            if (id) {
                await dispatch(fetchTracks(id));
            }
        }
    };

  return (
        <Grid item xs={12} sm={6} md={4} lg={3} style={{margin:'10px'}}>
            <Card >
                <CardContent>
                    <Box display="flex" flexDirection="row">
                        <Typography variant="body1" component="div">
                            {number}
                        </Typography>
                        <Typography style={{margin:'0 0 0 50px'}} variant="h6" component="div">
                            {name}
                        </Typography>
                        <Typography style={{marginLeft:'auto'}} variant="body1" component="div">
                            {duration}
                        </Typography>
                        {user ? (
                            <PlayCircleOutlineIcon style={{margin:'0 20px', width:'40px', color: playButtonClicked ? 'blue' : 'inherit'}} onClick={onClick}>
                                Play
                            </PlayCircleOutlineIcon>
                      ) : (
                        <></>
                      )}
                        {user && user.role === userRoles.admin && (
                            <>
                                {isPublished ? (
                                    <>
                                        <Button variant="outlined" style={{marginRight:'20px'}} onClick={onPublic}>
                                            Posted
                                        </Button>
                                        <Button onClick={onDelete} variant="outlined" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outlined" style={{color:'gray', borderColor:'gray'}} >
                                            Not published
                                        </Button>
                                        <Button onClick={onPublic} variant="outlined">
                                            Public
                                        </Button>
                                    </>
                                )
                                }
                            </>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TrackBlock;
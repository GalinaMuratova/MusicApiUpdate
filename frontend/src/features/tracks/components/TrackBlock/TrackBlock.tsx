import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { postTrackHistory } from '../../../tracksHistory/tracksHistoryThunk';
import { selectUser } from '../../../users/usersSlice';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

interface Props {
    id: string
    name: string,
    number: number,
    duration: string,
   artist: string
}

const TrackBlock: React.FC<Props> = ({name, number, duration,id, artist}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [playButtonClicked, setPlayButtonClicked] = useState(false);
  const onClick = async () => {
    await dispatch(postTrackHistory({ track: id, artist: artist}));
    setPlayButtonClicked(true);
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
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TrackBlock;
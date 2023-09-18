import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  nameArtist: string
  nameTrack: string,
  date: string,
}

const TrackHistoryBlock: React.FC<Props> = ({nameTrack, date, nameArtist}) => {
  return (
    <div>
      <Grid item xs={12} sm={6} md={4} lg={3} style={{margin:'10px'}}>
        <Card >
          <CardContent>
            <Box display="flex" flexDirection="row">
              <Typography variant="subtitle1" component="div" style={{color: 'gray'}}>
                {nameArtist}
              </Typography>
              <Typography variant="subtitle1" component="div" style={{margin:'0 0 0 50px'}}>
                {nameTrack}
              </Typography>
              <Typography style={{marginLeft:'auto'}} variant="body1" component="div">
                <span>{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</span>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default TrackHistoryBlock;
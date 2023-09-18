import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

interface Props {
  nameTrack: string,
  date: string,
}

const TrackHistoryBlock: React.FC<Props> = ({nameTrack, date}) => {
  return (
    <div>
      <Grid item xs={12} sm={6} md={4} lg={3} style={{margin:'10px'}}>
        <Card >
          <CardContent>
            <Box display="flex" flexDirection="row">
              <Typography variant="body1" component="div">
                {nameTrack}
              </Typography>
              <Typography style={{margin:'0 0 0 50px'}} variant="h6" component="div">
                {date}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default TrackHistoryBlock;
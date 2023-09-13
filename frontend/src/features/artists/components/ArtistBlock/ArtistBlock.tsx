import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface Props {
  name: string,
  artistsImage: string | null
}
const ArtistBlock: React.FC<Props> = ({name, artistsImage}) => {
  let productImage = 'http://localhost:8000' + '/' + artistsImage;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardContent>
          <CardMedia
            sx={{height:240}}
            image={productImage}
            title={name}
          />
          <Typography gutterBottom variant="h5" component="div">
            { name }
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArtistBlock;
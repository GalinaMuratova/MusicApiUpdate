import React from 'react';
import { Card, CardContent, CardMedia, Grid,styled, Typography } from '@mui/material';
import {  Link as NavLink } from 'react-router-dom';


const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  }
});
interface Props {
  id: string
  name: string,
  artistsImage: string | null
}


const ArtistBlock: React.FC<Props> = ({id, name, artistsImage}) => {
  let productImage = 'http://localhost:8000' + '/' + artistsImage;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to={'/albums/' + id}>
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
import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {  Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { userRoles } from '../../../constants';
import {changeArtistPublish, deleteArtist, fetchArtists} from '../artistsThunk';
import imgNotAvailable from "../../../assets/images/imgNotAvailable.png";


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
  artistsImage: string | null,
  isPublished: boolean
}

const ArtistBlock: React.FC<Props> = ({id, name, artistsImage, isPublished}) => {
  const user = useAppSelector(selectUser);
  let artistImage = imgNotAvailable;
  if (artistsImage) {
      artistImage = 'http://localhost:8000' + '/images/' + artistsImage;
  }
  const dispatch = useAppDispatch();

  const onPublic = async () => {
    await dispatch(changeArtistPublish(id));
    await dispatch(fetchArtists());
  };

  const onDelete = async () => {
      const alert = window.confirm('Do you want to delete this artist?');
      if (alert) {
          await dispatch(deleteArtist(id));
          await dispatch(fetchArtists());
      }
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card>
        <CardContent>
          <CardMedia
            sx={{height:240}}
            image={artistImage}
            title={name}
            component={Link} to={'/albums/' + id}
          />
            <Typography gutterBottom variant="h5" component="div">
                { name }
            </Typography>
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
                    <Button variant="outlined" style={{color:'gray', borderColor:'gray', marginRight:'10px'}} >
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
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArtistBlock;
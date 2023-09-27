import React from 'react';
import {Button, Card, CardContent, CardMedia, Grid, styled, Typography} from "@mui/material";
import  imgNotAvailable from '../../../assets/images/imgNotAvailable.png';
import {Link as NavLink, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {userRoles} from "../../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeAlbumPublish, deleteAlbum, fetchAlbums} from "../albumsThunk";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});
interface Props {
    idAlbum: string
    name: string,
    albumsImage: string | null,
    year: number,
    isPublished: boolean
}
const AlbumBlock: React.FC<Props> = ({idAlbum, name, albumsImage, year, isPublished}) => {
 let albumImage = imgNotAvailable;
 const {id} = useParams();
 const user = useAppSelector(selectUser);
 const dispatch = useAppDispatch();
 if (albumsImage) {
     albumImage = 'http://localhost:8000' + '/images/' + albumsImage;
 }

 const onPublic = async () => {
     await dispatch(changeAlbumPublish(idAlbum));
     if (id) {
         await dispatch(fetchAlbums(id));
     }
 };

 const onDelete = async () => {
     const alert = window.confirm('Do you want to delete this artist?');
     if (alert) {
         await dispatch(deleteAlbum(idAlbum));
         if (id) {
             await dispatch(fetchAlbums(id));
         }
     }
 };
    return (
    <>
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card>
                <CardContent>
                    <CardMedia
                        sx={{height:240}}
                        image={albumImage}
                        title={name}
                        component={Link} to={'/tracks/' + idAlbum}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                        { name }
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        { year }
                    </Typography>
                    {user && user.role === userRoles.admin && (
                        <>
                            {isPublished ? (
                                <>
                                    <Button  variant="outlined" style={{marginRight:'20px'}} onClick={onPublic}>Posted</Button>
                                    <Button onClick={onDelete} variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outlined" style={{color:'gray', borderColor:'gray'}} >Not published</Button>
                                    <Button onClick={onPublic} variant="outlined">Public</Button>
                                </>
                            )
                            }
                        </>
                    )}
                </CardContent>
            </Card>
        </Grid>
    </>
    );
};

export default AlbumBlock;
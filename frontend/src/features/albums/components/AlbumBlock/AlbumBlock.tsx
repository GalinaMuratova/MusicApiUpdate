import React from 'react';
import {Card, CardContent, CardMedia, Grid, styled, Typography} from "@mui/material";
import {Link as NavLink} from "react-router-dom";

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
    albumsImage: string | null,
    year: number,
}
const AlbumBlock: React.FC<Props> = ({id, name, albumsImage, year}) => {
 let albumImage = 'http://localhost:8000' + '/' + albumsImage;
    return (
    <>
        <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to={'/albums/' + id}>
            <Card>
                <CardContent>
                    <CardMedia
                        sx={{height:260}}
                        image={albumImage}
                        title={name}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                        { name }
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        { year }
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </>
    );
};

export default AlbumBlock;
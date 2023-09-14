import React from 'react';
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";

interface Props {
    id: string
    name: string,
    number: number,
    duration: string
}

const TrackBlock: React.FC<Props> = ({name, number, duration}) => {
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
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TrackBlock;
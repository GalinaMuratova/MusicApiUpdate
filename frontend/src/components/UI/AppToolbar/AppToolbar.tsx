import React from 'react';
import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">About music</Link>
            </Typography>
            <Button component={NavLink} to='/register' style={{color:'white'}}>Sign up</Button>
          </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;
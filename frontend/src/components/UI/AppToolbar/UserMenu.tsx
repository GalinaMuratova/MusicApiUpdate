import React, { useState } from 'react';
import {Button, CircularProgress, Menu, MenuItem} from '@mui/material';
import { User } from '../../../types';
import { Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectDeleteLoading} from '../../../features/users/usersSlice';
import { logout } from '../../../features/users/usersThunk';


interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDeleteLoading);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem component={Link}  to='/track_history'>My track history</MenuItem>
        <MenuItem onClick={handleLogout}>
            {loading ? <CircularProgress size={24} /> : 'Logout'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
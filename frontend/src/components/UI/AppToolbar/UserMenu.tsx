import React, { useState } from 'react';
import {Button, CircularProgress, Menu, MenuItem} from '@mui/material';
import { User } from '../../../types';
import { Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import { selectDeleteLoading } from '../../../features/users/usersSlice';
import { logout } from '../../../features/users/usersThunk';
import imgNotAvailable from '../../../assets/images/imgNotAvailable.png';


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

  let avatarImage = imgNotAvailable;
  if (user.avatar) {
    avatarImage = 'http://localhost:8000' + '/images/' + user.avatar;
  }
  return (
    <>
      <img
        style={{width:'40px', height:'40px', borderRadius:'50%', marginBottom:'-15px', objectFit: 'cover'}}
        src={avatarImage}
        alt={user.username}
      />
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.displayName}
      </Button>
      <Button color="inherit" component={Link} to="/artists/new">
          Add artist
      </Button>
      <Button color="inherit" component={Link} to="/albums/new">
          Add album
      </Button>
      <Button color="inherit" component={Link} to="/tracks/new">
          Add track
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
import { useClerk } from '@clerk/clerk-react';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../layouts';
import ProfileMenu from './profile-menu';

export default function PrimarySearchAppBar() {
  const [profileMenuUser, setProfileMenuUser] = useState(null);
  const {setIsNotificationOpen} = useGlobal();
  const { user, signOut } = useClerk();
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setProfileMenuUser({ anchorEl: event.currentTarget, ...user });
  };

  const handleSignOut = () => {
    signOut();
    navigate('/sign-in');
  };

  return (
    <Box sx={{ flexGrow: 1 }} component={'header'}>
      <AppBar position="static" elevation={0} className='navbar'component={'section'}>
        <Toolbar>
          <section className='logo-area' style={{width: '2rem'}}>
            <img src="./logo192.png" alt="website logo" style={{width: '2rem'}}  onClick={() => {navigate("/home")}}/>
          </section>
          <Typography
            variant="h6"
            noWrap
            component="section"
            //sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            GrantEase
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => setIsNotificationOpen(true)}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileClick}
              color="inherit"
            >
              {user && user.imageUrl ? (
              <Avatar src={user.imageUrl} alt="User Avatar" sx={{ mr: 1 }} />
            ) : (
              <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', mr: 1 }}>
                <AccountCircleIcon />
              </Avatar>
            )}
            </IconButton>
            <ProfileMenu
              user={profileMenuUser}
              onClose={() => setProfileMenuUser(null)}
              onSignOut={handleSignOut}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

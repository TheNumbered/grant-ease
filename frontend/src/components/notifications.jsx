import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';
import { getQuery } from '../dataprovider';
import { LoadingPage } from '../pages/loading-page';

export const NotificationsViewer = ({onClose}) => {
  const { data, isLoading, isError } = getQuery("notifications");

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  // Dummy data for notifications
  const notifications = data.notifications;
  // console.log(data);

  return (
    <div className="z-axis-sticky-tab">
      <section style={{display: 'flex', alignItems: 'center', paddingBottom: '1rem'}}>
        <button className='sticky-tab-close-btn' onClick={onClose}>x</button>
        <Typography variant="h2" gutterBottom style={{fontSize: '1.5rem', marginLeft: '2rem'}}>
          Notifications
        </Typography>
      </section>
      
      <Divider></Divider>
      <List>
        {notifications.map(notification => (
          <React.Fragment key={notification.id}>
          <ListItem style={{ paddingLeft: '2rem' }}>
            <ListItemText
              primary={notification.title}
              secondary={notification.body}
              primaryTypographyProps={{ style: { fontWeight: notification.seen === 0 ? 'bold' : 'normal' } }}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
        ))}
      </List>
    </div>
  );
};


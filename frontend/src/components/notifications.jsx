import { Check } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';

export const NotificationsViewer = ({onClose}) => {
  // Dummy data for notifications
  const notifications = [
    { id: 1, user: 'John Doe', activity: 'posted a new funding opportunity' },
    { id: 2, user: 'Alice Smith', activity: 'accepted your funding application' },
    { id: 3, user: 'Bob Johnson', activity: 'sent you a message' },
  ];

  return (
    <div className="z-axis-sticky-tab">
      <section style={{display: 'flex', alignItems: 'center', paddingBottom: '1rem'}}>
        <button className='sticky-tab-close-btn' onClick={onClose}>x</button>
        <Typography variant="h2" gutterBottom style={{fontSize: '1.5rem', marginLeft: '2rem'}}>
          Notifications
        </Typography>
        <a><Check></Check> Mark All As Read</a>
      </section>
      
      <Divider></Divider>
      <List>
        {notifications.map(notification => (
          <React.Fragment key={notification.id}>
            <ListItem style={{paddingLeft: '2rem'}}>
              <ListItemText
                primary={notification.user}
                secondary={notification.activity}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};


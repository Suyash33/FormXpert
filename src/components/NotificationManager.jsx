import React from 'react';
import { Notification } from './Notification';

export const NotificationManager = ({ notifications, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </div>
  );
};

import { useState, useCallback } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type) => {
    const newNotification = {
      id: crypto.randomUUID(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 3000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  return {
    notifications,
    showNotification,
    removeNotification,
  };
};

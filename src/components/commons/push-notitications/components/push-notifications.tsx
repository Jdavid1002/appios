import React from 'react';
import {useNotificationService} from '../../../../utils/push-notifications/notificationService';

export const PushNotifications: React.FC = () => {
  useNotificationService();
  return null;
};

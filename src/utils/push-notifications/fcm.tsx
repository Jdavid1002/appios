import {AsyncStorage} from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment';

const CHANNEL_NAME = 'iqedudo-channel';

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }

  return fcmToken;
};

const requestPermission = async () =>
  await firebase.messaging().requestPermission();

export const attemptToGetToken = async () =>
  requestPermission()
    .then(() => getToken())
    .catch(() => {});

function buildNotification(type, id) {
  const notificationId = `${id}-${moment()
    .utc()
    .valueOf()
    .toString()}`;
  const notification = new firebase.notifications.Notification().setNotificationId(
    notificationId,
  );

  notification.setSound('default');
  notification.android.setTag(notificationId);

  notification.android
    .setChannelId(CHANNEL_NAME)
    .android.setSmallIcon('ic_launcher');

  return notification;
}

export function displayNotification(type = 'NOTIFICATION', id) {
  const notification = buildNotification(type, id);
  // Display the notification
  firebase.notifications().displayNotification(notification);
  return notification;
}

export function scheduleLocalNotification(type, delay, id) {
  const notificationTime = moment.utc().add(delay, 'seconds');
  const notification = buildNotification(type, id);

  firebase.notifications().scheduleNotification(notification, {
    fireDate: notificationTime.valueOf(),
  });
  notification.date = notificationTime.valueOf();

  return notification;
}

// function getDeliveredNotifications() {
//   return firebase.notifications().getDeliveredNotifications();
// }

function getScheduledNotifications() {
  return firebase.notifications().getScheduledNotifications();
}

function cancelAllNotifications() {
  return firebase.notifications().cancelAllNotifications();
}

export const createNotificationListeners = ({
  handleNotifPress,
  handleNotificationReceived,
  addNotifLog,
}) => {
  const onIncoming = firebase.notifications().onNotification(notification => {
    handleNotificationReceived(notification, {by: 'onNotification'});
    addNotifLog(notification, {name: 'onNotification', isListener: true});
    addNotifLog(notification, {name: 'displayNotification'});
    notification.android.priority = 1;
    notification.android.setChannelId(CHANNEL_NAME);
    notification.android.setVibrate([500]);
    notification.android.setDefaults([
      firebase.notifications.Android.Defaults.Vibrate,
    ]);
    notification.setSound('default');

    return firebase.notifications().displayNotification(notification);
  });

  const onDisplayed = firebase
    .notifications()
    .onNotificationDisplayed((notification: Notification) => {
      console.log(
        'MyNotifPipeline APP | onNotificationDisplayed',
        notification,
      );

      handleNotificationReceived(notification, {
        by: 'onNotificationDisplayed',
      });
      addNotifLog(notification, {
        name: 'onNotificationDisplayed',
        isListener: true,
      });
    });

  const onOpened = firebase
    .notifications()
    .onNotificationOpened(notificationOpen => {
      const notif = notificationOpen.notification;
      // does not work when app was terminated
      console.log('MyNotifPipeline APP | onNotificationOpened', notif);
      addNotifLog(notif, {name: 'onNotificationOpened', isListener: true});
    });

  const onTokenRefresh = firebase.messaging().onTokenRefresh(token => {
    // TODO: handle new token. e.g. update token on server
  });

  const onMessage = firebase.messaging().onMessage(message => {
    console.log('MyNotifsPipeline onMessage', message, message.sentTime);
    message.date = message.sentTime || moment().valueOf();
    handleNotificationReceived(message, {by: 'onMessage'});
    addNotifLog(message, {name: 'onMessage', isListener: true});
  });

  // optional -> subscribe device to topic
  firebase.messaging().subscribeToTopic('main-topic');

  return {onIncoming, onOpened, onTokenRefresh, onMessage, onDisplayed};
};

const createAndroidChannel = () => {
  const androidChannel = new firebase.notifications.Android.Channel(
    CHANNEL_NAME,
    'Test Channel',
    firebase.notifications.Android.Importance.Max,
  )
    .setSound('default')
    .setVibrationPattern([500])
    .setLockScreenVisibility(firebase.notifications.Android.Visibility.Public)
    .enableVibration(true)
    .enableLights(true)
    .setDescription('My apps test channel');
  firebase.notifications().android.createChannel(androidChannel);
};

const getInitialNotif = ({handleNotificationReceived, addNotifLog}) => {
  firebase
    .notifications()
    .getInitialNotification()
    .then(notificationOpen => {
      if (notificationOpen) {
        // Get information about the notification that opened the app
        const notif = notificationOpen.notification;
        handleNotificationReceived(notif, {by: 'getInitialNotification'});
        // TODO: handle notification
        addNotifLog(notif, {name: 'getInitialNotification'});
      }
    });
};

function removeAllDeliveredNotifications() {
  return firebase.notifications().removeAllDeliveredNotifications();
}

const clearListeners = ({
  onIncoming,
  onOpened,
  onTokenRefresh,
  onMessage,
  onDisplayed,
}) => {
  onIncoming();
  onOpened();
  onTokenRefresh();
  onMessage();
  onDisplayed();
};

export const fcm = {
  attemptToGetToken,
  createNotificationListeners,
  createAndroidChannel,
  getInitialNotif,
  clearListeners,
  displayNotification,
  scheduleLocalNotification,
  // getDeliveredNotifications,
  getScheduledNotifications,
  removeAllDeliveredNotifications,
  cancelAllNotifications,
};

/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js",
);
importScripts("swEnv.js"); //

firebase.initializeApp({
  apiKey: swEnv.REACT_APP_FIREBASE_API_KEY,
  authDomain: swEnv.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: swEnv.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: swEnv.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: swEnv.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: swEnv.REACT_APP_FIREBASE_APP_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(payload);
});

/* eslint-disable */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA3IYGbZeX1OQhCg3vzNy-9P7syNKqyPDc",
  authDomain: "ellis-docs-b5456.firebaseapp.com",
  projectId: "ellis-docs-b5456",
  storageBucket: "ellis-docs-b5456.appspot.com",
  messagingSenderId: "578034305957",
  appId: "1:578034305957:web:f24b8ace5cede55ed3b64c",
  measurementId: "G-GKCWR1QJP4"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// // worker is running
// console.log('Worker is running');

// messaging.onBackgroundMessage((payload) => {

//   console.log('onBackgroundMessage triggered');

//   const channel = new BroadcastChannel('notification-channel');
//   channel.postMessage({
//     type: 'notificationHandled',
//     payload: 'Action completed',
//   });

// });
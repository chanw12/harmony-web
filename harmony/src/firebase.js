import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBhtfef9Otj2iIjcCwVS1PBgXwxEDUAoOo",
  authDomain: "chat-fcm-df5ca.firebaseapp.com",
  projectId: "chat-fcm-df5ca",
  storageBucket: "chat-fcm-df5ca.appspot.com",
  messagingSenderId: "316915531680",
  appId: "1:316915531680:web:90e2147c59fe5bf05c6ec5",
  measurementId: "G-75R619L1GR",
});

const messaging = getMessaging(firebaseApp);
Notification.requestPermission().then(function (permission) {
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.log("Unable to get permission to notify.");
  }
});

export { messaging };

export const getTokenTW = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BD-ZvTYfUEdMnMP3iYCFB0ban0ARj7_wLguGXQZPZ76PSbRe8ZTT1ciGeK5V5Qcnn-ec7taBRIkN6WQPcmrMUpk",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(null);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

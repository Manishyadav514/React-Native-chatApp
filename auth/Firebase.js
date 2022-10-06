import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   //...
// };


// import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";




// const auth = getAuth();

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_AP_ID,
  apiKey: "AIzaSyBVR15L1TnOpz5hBZAFZneZ_M940E_61ts",
  authDomain: "react-firebase-authentic-8c851.firebaseapp.com",
  projectId: "react-firebase-authentic-8c851",
  storageBucket: "react-firebase-authentic-8c851.appspot.com",
  messagingSenderId: "950890087245",
  appId: "1:950890087245:web:0a259bd4460d71f6caad04",
};
export const app = initializeApp(firebaseConfig);
// export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);


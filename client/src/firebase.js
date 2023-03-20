// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCMstkuW5iJmGtrtSD3jHhy1hjkdmVAhA",
  authDomain: "twitter-clone-7ffb2.firebaseapp.com",
  projectId: "twitter-clone-7ffb2",
  storageBucket: "twitter-clone-7ffb2.appspot.com",
  messagingSenderId: "524797304391",
  appId: "1:524797304391:web:9f5a0eb78e3366ba4a9b62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// to use firebase in our application 
export default app;
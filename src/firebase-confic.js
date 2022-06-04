import {getFirestore} from '@firebase/firestore'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVUUTJW7YqxXRpqBxotE9PS4EPgDrmchM",
  authDomain: "pets-island.firebaseapp.com",
  databaseURL: "https://pets-island-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pets-island",
  storageBucket: "pets-island.appspot.com",
  messagingSenderId: "184876335281",
  appId: "1:184876335281:web:5ae9423170ac2794e1e290"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
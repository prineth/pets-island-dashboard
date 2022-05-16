import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDuqkzvjR-WRqRjexadVePl5THVz2YZf60",
    authDomain: "mobile-uni.firebaseapp.com",
    projectId: "mobile-uni",
    storageBucket: "mobile-uni.appspot.com",
    messagingSenderId: "601334681686",
    appId: "1:601334681686:web:d483002bb3dd4e25622bf7",
    measurementId: "G-7KH6QYTYLF"
  };



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
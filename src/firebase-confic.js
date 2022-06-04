import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getStorage} from 'firebase/storage'

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAVUUTJW7YqxXRpqBxotE9PS4EPgDrmchM",
  authDomain: "pets-island.firebaseapp.com",
  databaseURL: "https://pets-island-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pets-island",
  storageBucket: "pets-island.appspot.com",
  messagingSenderId: "184876335281",
  appId: "1:184876335281:web:5ae9423170ac2794e1e290"
};



const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
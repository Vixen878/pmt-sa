import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAJH8ZLFC9aYdUDbqjnE7J67MICkKW5CcY",
  authDomain: "elik-project-managment-tool.firebaseapp.com",
  projectId: "elik-project-managment-tool",
  storageBucket: "elik-project-managment-tool.appspot.com",
  messagingSenderId: "599744157195",
  appId: "1:599744157195:web:815a6c60466f8f647b590e",
  measurementId: "${config.measurementId}"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const fbAuth = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider()



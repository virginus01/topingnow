// firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import dotenv from 'dotenv';

//dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyBJk6UK1l-mm4QdSG3DMtuGbNlavDP0OaA",
    authDomain: "topingnow01.firebaseapp.com",
    projectId: "topingnow01",
    storageBucket: "topingnow01.appspot.com",
    messagingSenderId: "429333756759",
    appId: "1:429333756759:web:42f2c1215b75f71b565c12",
    measurementId: "G-2C7C0FNQQE"
};

// Initialize Firebase if it hasn't been initialized already
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

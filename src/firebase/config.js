import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR7hDeZ128C26UVrHM_9t58r3QKjsCfec",
  authDomain: "miniblog-f7c6c.firebaseapp.com",
  projectId: "miniblog-f7c6c",
  storageBucket: "miniblog-f7c6c.firebasestorage.app",
  messagingSenderId: "151314770625",
  appId: "1:151314770625:web:0d53451105ed1f7197c240",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

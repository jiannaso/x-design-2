// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDbpCiXpmC46LVtpm_LCaA0KBGtUZi9YYY",
  authDomain: "experience-design.firebaseapp.com",
  projectId: "experience-design",
  storageBucket: "experience-design.appspot.com",
  messagingSenderId: "586633000656",
  appId: "1:586633000656:web:4bde39e08d8e8bcf89d0d5",
  measurementId: "G-JCV7W7HXPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
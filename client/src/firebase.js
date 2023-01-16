import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn11b7p_vvYW5v2mm5NyCosgOvfMO7_Fs",
  authDomain: "letsgossip-eb5d9.firebaseapp.com",
  projectId: "letsgossip-eb5d9",
  storageBucket: "letsgossip-eb5d9.appspot.com",
  messagingSenderId: "310419327435",
  appId: "1:310419327435:web:932acc6df74500ceb0ce4e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCxxFV7GRtahnLKe7Vuxy1iMp6J9rUlhIY",
  authDomain: "resturation-59638.firebaseapp.com",
  projectId: "resturation-59638",
  storageBucket: "resturation-59638.appspot.com",
  messagingSenderId: "470201661495",
  appId: "1:470201661495:web:c5212550a7a3772dce67b2",
  measurementId: "G-4F9FYBRYTP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

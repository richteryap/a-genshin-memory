import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnAEzNBufBWZogh_bkPAyNabHjM8trKPQ",
  authDomain: "a-genshin-memory.firebaseapp.com",
  projectId: "a-genshin-memory",
  storageBucket: "a-genshin-memory.firebasestorage.app",
  messagingSenderId: "1027442261954",
  appId: "1:1027442261954:web:3873253e5551449e63205b",
  measurementId: "G-D1C1YW4YZC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
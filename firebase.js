import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔹 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBKPEyMbACewWmNhf65bjy4Oz8fM_4tpDE",
  authDomain: "healthtrackerapp-7841f.firebaseapp.com",
  projectId: "healthtrackerapp-7841f",
  storageBucket: "healthtrackerapp-7841f.appspot.com",
  messagingSenderId: "800283356427",
  appId: "1:800283356427:web:8baea98d848ef37e10860e",
};

// 🔹 Initialize Firebase App (Properly Handling Multiple Initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 🔹 Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

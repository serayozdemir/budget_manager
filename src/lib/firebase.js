import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, push, onValue, remove} from "firebase/database";
import { getFirestore } from 'firebase/firestore';


/* const firebaseConfig = {
    apiKey: "AIzaSyDuq-HVElHvdT__RRWSJa9YxaKhcoGBYRU",
    authDomain: "budgetmanager-78f2b.firebaseapp.com",
    databaseURL: "https://budgetmanager-78f2b-default-rtdb.firebaseio.com",
    projectId: "budgetmanager-78f2b",
    storageBucket: "budgetmanager-78f2b.appspot.com",
    messagingSenderId: "600346605361",
    appId: "1:600346605361:web:32d6f2082f8b888e4c2210"
}; */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app);
const firestore = getFirestore(app);



export { app, auth, database,firestore, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, ref, push, remove, onValue};

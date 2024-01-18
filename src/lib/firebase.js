import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, push, onValue, remove} from "firebase/database";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
     // YOUR API KEYS
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    // Add more configuration properties as needed
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app);
const firestore = getFirestore(app);



export { app, auth, database,firestore, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, ref, push, remove, onValue};

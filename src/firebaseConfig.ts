import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPGg8bLfPz8GYuDKGP6BhIC6C3Hg0YS58",
  authDomain: "kinex-f9aff.firebaseapp.com",
  projectId: "kinex-f9aff",
  storageBucket: "kinex-f9aff.firebasestorage.app",
  messagingSenderId: "803771213054",
  appId: "1:803771213054:web:b5113166e9798eca3cb1af"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };

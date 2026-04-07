import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-oeYsRunBHbVEFeh4fsTqQ_LCzhcJE8I",
  authDomain: "kinex-f9aff.firebaseapp.com",
  projectId: "kinex-f9aff",
  storageBucket: "kinex-f9aff.firebasestorage.app",
  messagingSenderId: "559498407587",
  appId: "1:559498407587:web:6ace5d9f7fbb98de7e9e27"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };

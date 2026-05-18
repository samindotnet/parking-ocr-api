import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCAKFekDXaJQGvPiMxdjEg_w_wqoeUxhJE",
  authDomain: "parking-app-prod-ff82b.firebaseapp.com",
  projectId: "parking-app-prod-ff82b",
  storageBucket: "parking-app-prod-ff82b.firebasestorage.app",
  messagingSenderId: "150334823417",
  appId: "1:150334823417:web:4516f140880c1b4c457b28",
  measurementId: "G-F60HHXTBTN"
  };

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
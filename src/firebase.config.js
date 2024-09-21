import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6hkLInh5T8e-8rq_uJcmjhyjkpB_dx5A",
  authDomain: "house-marketplace-30bd4.firebaseapp.com",
  projectId: "house-marketplace-30bd4",
  storageBucket: "house-marketplace-30bd4.appspot.com",
  messagingSenderId: "250101694443",
  appId: "1:250101694443:web:2a52283d985492da0ca3ae",
};

export const db = getFirestore(initializeApp(firebaseConfig))
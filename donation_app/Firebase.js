// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1m9uWhjG8l5U3kYSHsTmk4rx-PfiDlao",
  authDomain: "sagift-relief-ce48d.firebaseapp.com",
  projectId: "sagift-relief-ce48d",
  storageBucket: "sagift-relief-ce48d.appspot.com",
  messagingSenderId: "631044694662",
  appId: "1:631044694662:web:cb72f2e13593bedbd3a707",
  measurementId: "G-6M9ZP7X1HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

const storage = getStorage(app);
export const donationFiles = ref(storage, 'donations');
export const profileFiles = ref(storage, 'profiles');
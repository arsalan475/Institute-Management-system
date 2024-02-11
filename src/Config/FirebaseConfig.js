// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfrqg2eOzsoUa7TXDpg4kRxtfgPYqv694",
  authDomain: "institute-managment-system.firebaseapp.com",
  projectId: "institute-managment-system",
  storageBucket: "institute-managment-system.appspot.com",
  messagingSenderId: "405080247322",
  appId: "1:405080247322:web:88b9f5f8e6cd2ca94f95a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initioalizing authentication with app
const auth = getAuth(app);

// adding createUserWithEmailAndPassword function body to createUser Variable
const createUser = createUserWithEmailAndPassword;
const loginUser = signInWithEmailAndPassword;

const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref;
export {
  auth,
  createUser,
  loginUser,
  collection,
  addDoc,
  getDocs,
  where,
  db,
  onAuthStateChanged,
  query,
  storageRef,
  storage,
  uploadBytes,
  getDownloadURL,
  doc,
  deleteDoc,
  signOut,
};

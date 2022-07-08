import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import {
  getFirestore, doc, setDoc, collection, addDoc, query, where, getDocs, getDoc, orderBy, deleteDoc
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js';

import { firebaseConfig } from './config.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
// signInWithRedirect(auth, provider);

export {
  auth,
  app,
  db,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  signInWithPopup,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  deleteDoc,
};

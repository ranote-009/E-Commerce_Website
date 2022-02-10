import firebase from "firebase";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBc3VfXvo5jQaOISmAON4ykDYe03i0mNqQ",
  authDomain: "clone-6d209.firebaseapp.com",
  projectId: "clone-6d209",
  storageBucket: "clone-6d209.appspot.com",
  messagingSenderId: "359759094453",
  appId: "1:359759094453:web:5d10398a9f1511c6c714fc",
  measurementId: "G-K49ZBNRMMW",
});
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

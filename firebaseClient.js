// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNjhv-5V8nucso5joSr7uNb9qloCGgQpY",
  authDomain: "notes-m5wn.firebaseapp.com",
  projectId: "notes-m5wn",
  storageBucket: "notes-m5wn.appspot.com",
  messagingSenderId: "606792853705",
  appId: "1:606792853705:web:e22fb0d76e40700d22c518",
  measurementId: "G-CRXHRRS24Q",
  databaseURL: "https://notes-m5wn-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database 
const database = getDatabase(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {database, auth}

// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAre6kBXdyl0LTqR3h469XhZJ3HM7uHXcQ",
  authDomain: "employeemanagementapp-27357.firebaseapp.com",
  projectId: "employeemanagementapp-27357",
  storageBucket: "employeemanagementapp-27357.appspot.com",  // ✅ fixed typo (.app ➝ .appspot.com)
  messagingSenderId: "876202255415",
  appId: "1:876202255415:web:6a6a483ca2e79d88d4cbb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth and provider for Google Sign-In
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

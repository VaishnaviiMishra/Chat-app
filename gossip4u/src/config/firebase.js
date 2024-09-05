import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; 
import { toast } from "react-toastify";

// Firebase configuration object

const firebaseConfig = {
  apiKey: "AIzaSyBz8fHbmUM_qAwEZz51F8AsiFozIVqpv6c",
  authDomain: "chatapp-78aae.firebaseapp.com",
  projectId: "chatapp-78aae",
  storageBucket: "chatapp-78aae.appspot.com",
  messagingSenderId: "1091750643681",
  appId: "1:1091750643681:web:57f4e8dc4b1e3dbef034a0",
  measurementId: "G-PSK3L2JLGC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Initialize analytics
const auth = getAuth(app); // Initialize auth
const db = getFirestore(app); // Initialize Firestore

// Signup function
const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Set user information in Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There I am using chat app",
      lastSeen: Date.now(),
    });

    // Set up chat data in Firestore
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });

    toast.success("Signup successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Export all necessary modules including db
export { auth, db, signup, login, logout };




import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Import doc and setDoc
import { toast } from "react-toastify";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Correct usage of setDoc to set user information
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There I am using chat app",
      lastSeen: Date.now(),
    });

    // Correct usage of setDoc to set chat data
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });

    toast.success("Signup successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.code);
  }
};

const login = async(email,password) =>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.error(error);
    toast.error(error.code);    
  }

}

export { signup,login };

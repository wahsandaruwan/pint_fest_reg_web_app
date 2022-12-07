import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU3xKKkg_XETB1tiPKc-HoFEGYKLzaQdE",
  authDomain: "pink-fest.firebaseapp.com",
  projectId: "pink-fest",
  storageBucket: "pink-fest.appspot.com",
  messagingSenderId: "636659312596",
  appId: "1:636659312596:web:93658911683a393050d841",
  measurementId: "G-L0J257HQ3B",
};

// Initalize an app
const app = initializeApp(firebaseConfig);

// Export database
export const db = getFirestore(app);

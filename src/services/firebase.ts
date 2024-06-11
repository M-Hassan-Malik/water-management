import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ellis-docs-b5456.firebaseapp.com",
  projectId: "ellis-docs-b5456",
  storageBucket: "ellis-docs-b5456.appspot.com",
  messagingSenderId: "578034305957",
  appId: "1:578034305957:web:f24b8ace5cede55ed3b64c",
  measurementId: "G-GKCWR1QJP4",
};

export const app = initializeApp(firebaseConfig);

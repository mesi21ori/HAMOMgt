// import { initializeApp, FirebaseApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, Firestore } from "firebase/firestore";
// import { getStorage, FirebaseStorage } from "firebase/storage";

// // Firebase config from .env
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase app
// const app: FirebaseApp = initializeApp(firebaseConfig);
// console.log("[] Firebase app initialized successfully");

// // Firestore
// const db: Firestore = getFirestore(app);
// console.log("[] Firestore initialized successfully");

// // Storage
// const storage: FirebaseStorage = getStorage(app);
// console.log("[] Firebase Storage initialized successfully");

// // Analytics (client-side only)
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
//   console.log("[] Analytics initialized successfully");
// }

// export { db, storage, analytics };
// export default app;

import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";  // 👈 import auth

// Firebase config from .env
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app: FirebaseApp = initializeApp(firebaseConfig);

// Firestore
const db: Firestore = getFirestore(app);

// Storage
const storage: FirebaseStorage = getStorage(app);

// Auth
const auth = getAuth(app);

// Analytics (client-side only)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { db, storage, analytics, auth };
export default app;

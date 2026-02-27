// 🔥 Firebase Config File

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ✅ REAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCODdCPvN4L96ye0YuxippaIUHnEUwnT90",
  authDomain: "mdquizzes-c255a.firebaseapp.com",
  projectId: "mdquizzes-c255a",
  storageBucket: "mdquizzes-c255a.appspot.com",
  messagingSenderId: "510171455812",
  appId: "1:510171455812:web:dcead5207dc1272aa9b711"
};


// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export services
export const auth = getAuth(app);
export const db = getFirestore(app);

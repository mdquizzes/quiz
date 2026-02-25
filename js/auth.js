import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


/* ===================================
   SIGNUP FUNCTION
=================================== */

window.signupUser = async function(){

  const fName = document.getElementById("firstName").value.trim();
  const lName = document.getElementById("lastName").value.trim();
  const emailVal = document.getElementById("email").value.trim();
  const passVal = document.getElementById("password").value.trim();

  if(!fName || !lName || !emailVal || !passVal){
    alert("Please fill all fields.");
    return;
  }

  try{

    const userCred = await createUserWithEmailAndPassword(
      auth,
      emailVal,
      passVal
    );

    // Create Firestore user document with UID
    await setDoc(doc(db,"users",userCred.user.uid),{
      firstName: fName,
      lastName: lName,
      totalScore: 0,
      createdAt: Date.now()
    });

    alert("Signup Successful. Please login.");

  }
  catch(error){

    if(error.code === "auth/email-already-in-use"){
      alert("This email is already registered. Please login.");
    }
    else if(error.code === "auth/weak-password"){
      alert("Password must be at least 6 characters.");
    }
    else{
      alert(error.message);
    }
  }
};


/* ===================================
   LOGIN FUNCTION
=================================== */

window.loginUser = async function(){

  const emailVal = document.getElementById("email").value.trim();
  const passVal = document.getElementById("password").value.trim();

  if(!emailVal || !passVal){
    alert("Enter email and password.");
    return;
  }

  try{
    await signInWithEmailAndPassword(auth,emailVal,passVal);
    alert("Login Successful");
  }
  catch(error){

    if(error.code === "auth/user-not-found"){
      alert("No account found. Please signup first.");
    }
    else if(error.code === "auth/wrong-password"){
      alert("Incorrect password.");
    }
    else{
      alert("Login failed. Check credentials.");
    }
  }
};


/* ===================================
   LOGOUT FUNCTION
=================================== */

window.logoutUser = function(){
  signOut(auth);
};


/* ===================================
   AUTH STATE LISTENER (AUTO FIX)
=================================== */

onAuthStateChanged(auth, async (user)=>{

  const statusEl = document.getElementById("userStatus");

  if(user){

    try{

      const userRef = doc(db,"users",user.uid);
      let snap = await getDoc(userRef);

      // 🔥 SELF HEALING LOGIC
      // If Firestore document missing, create automatically
      if(!snap.exists()){

        await setDoc(userRef,{
          firstName: "Student",
          lastName: "",
          totalScore: 0,
          createdAt: Date.now()
        });

        snap = await getDoc(userRef);
      }

      const data = snap.data();

      statusEl.innerText =
        "Welcome " + (data.firstName || "") + " " + (data.lastName || "");

    }
    catch(err){
      statusEl.innerText = "Welcome " + user.email;
    }

  }
  else{
    statusEl.innerText = "Guest User";
  }

});

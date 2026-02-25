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


/* ===========================
   SIGNUP
=========================== */

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

    // Create user document with UID as document ID
    await setDoc(doc(db,"users",userCred.user.uid),{
      firstName: fName,
      lastName: lName,
      totalScore: 0,
      createdAt: Date.now()
    });

    alert("Signup Successful. You can now login.");

  }
  catch(error){

    if(error.code === "auth/email-already-in-use"){
      alert("This email is already registered. Please login.");
    }
    else if(error.code === "auth/weak-password"){
      alert("Password should be at least 6 characters.");
    }
    else{
      alert(error.message);
    }
  }
};


/* ===========================
   LOGIN
=========================== */

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


/* ===========================
   LOGOUT
=========================== */

window.logoutUser = function(){
  signOut(auth);
};


/* ===========================
   AUTH STATE CHANGE
=========================== */

onAuthStateChanged(auth, async (user)=>{

  const statusEl = document.getElementById("userStatus");

  if(user){

    try{
      const snap = await getDoc(doc(db,"users",user.uid));

      if(snap.exists()){
        const data = snap.data();
        statusEl.innerText =
          "Welcome " + data.firstName + " " + data.lastName;
      }
      else{
        statusEl.innerText = "Welcome " + user.email;
      }

    }catch(err){
      statusEl.innerText = "Welcome " + user.email;
    }

  }else{
    statusEl.innerText = "Guest User";
  }

});

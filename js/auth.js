// 🔥 IMPORT CONFIG
import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendEmailVerification,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
doc,
setDoc,
getDoc,
updateDoc,
increment
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


/* =========================
   SIGNUP
========================= */

const signupBtn=document.getElementById("signupBtn");

if(signupBtn){

signupBtn.addEventListener("click",async()=>{

const fName=document.getElementById("firstName")?.value.trim();
const lName=document.getElementById("lastName")?.value.trim();
const email=document.getElementById("emailSignup")?.value.trim();
const pass=document.getElementById("passwordSignup")?.value.trim();

try{

const cred=await createUserWithEmailAndPassword(auth,email,pass);

await sendEmailVerification(cred.user);

await setDoc(doc(db,"users",cred.user.uid),{

firstName:fName,
lastName:lName,
totalScore:0

});

document.getElementById("msg").innerText=
"Verification email sent. Please verify your email.";

}catch(e){

document.getElementById("msg").innerText=e.message;

}

});

}


/* =========================
   LOGIN
========================= */

const loginBtn=document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click",async()=>{

const email=document.getElementById("email")?.value.trim();
const pass=document.getElementById("password")?.value.trim();

try{

const cred=await signInWithEmailAndPassword(auth,email,pass);

if(!cred.user.emailVerified){

document.getElementById("msg").innerText=
"Please verify your email before login.";

return;

}

location.href="dashboard.html";

}catch(e){

document.getElementById("msg").innerText=e.message;

}

});

}


/* =========================
   LOGOUT
========================= */

window.logoutUser=function(){

signOut(auth).then(()=>{
location.reload();
});

};


/* =========================
   AUTH STATE LISTENER
========================= */

onAuthStateChanged(auth,async(user)=>{

const statusEl=document.getElementById("userStatus");
const totalPoints=document.getElementById("totalPoints");

if(!statusEl) return;

if(user){

const snap=await getDoc(doc(db,"users",user.uid));
const data=snap.data();

statusEl.innerText="👤 "+(data?.firstName || "User");

if(totalPoints){

totalPoints.innerText=
"Total Points: "+(data?.totalScore || 0);

}

}else{

statusEl.innerText="Guest User";

if(totalPoints){

totalPoints.innerText=
"Login to accumulate points";

}

}

});


/* =========================
   SAVE OFFICIAL SCORE
========================= */

export async function saveOfficialScore(score){

const user=auth.currentUser;

if(!user){

throw new Error("User not logged in");

}

const userRef=doc(db,"users",user.uid);

const snap=await getDoc(userRef);

if(!snap.exists()){

await setDoc(userRef,{
firstName:"User",
lastName:"",
totalScore:score
});

}else{

await updateDoc(userRef,{
totalScore:increment(score)
});

}

}

window.saveOfficialScore=saveOfficialScore;

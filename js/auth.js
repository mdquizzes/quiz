// IMPORT FIREBASE CONFIG
import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendEmailVerification,
sendPasswordResetEmail,
GoogleAuthProvider,
signInWithPopup,
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
   AUTO EMAIL VERIFICATION DETECTION
========================= */

function startAutoVerification(){

setInterval(async ()=>{

const user = auth.currentUser;

if(user){

await user.reload();

if(user.emailVerified){

const msg = document.getElementById("msg");

if(msg){
msg.innerText="Email verified ✔ Redirecting...";
}

setTimeout(()=>{
location.href="dashboard.html";
},1500);

}

}

},5000);

}



/* =========================
   SIGNUP
========================= */

const signupBtn = document.getElementById("signupBtn");

if(signupBtn){

signupBtn.addEventListener("click",async()=>{

const fName = document.getElementById("firstName")?.value.trim();
const lName = document.getElementById("lastName")?.value.trim();
const email = document.getElementById("emailSignup")?.value.trim();
const pass = document.getElementById("passwordSignup")?.value.trim();

try{

const cred = await createUserWithEmailAndPassword(auth,email,pass);

await sendEmailVerification(cred.user);

await setDoc(doc(db,"users",cred.user.uid),{

firstName:fName,
lastName:lName,
totalScore:0,
createdAt:Date.now()

});

document.getElementById("msg").innerText=
"Verification email sent.";

document.getElementById("verifyBox").style.display="block";

startAutoVerification();

}catch(e){

if(e.code==="auth/email-already-in-use"){

document.getElementById("msg").innerText=
"Email already registered. Please login.";

}else{

document.getElementById("msg").innerText=e.message;

}

}

});

}



/* =========================
   LOGIN
========================= */

const loginBtn = document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click",async()=>{

const email = document.getElementById("email")?.value.trim();
const pass = document.getElementById("password")?.value.trim();

try{

const cred = await signInWithEmailAndPassword(auth,email,pass);

await cred.user.reload();

if(!cred.user.emailVerified){

document.getElementById("msg").innerText=
"Please verify your email first.";

return;

}

location.href="dashboard.html";

}catch(e){

document.getElementById("msg").innerText=e.message;

}

});

}



/* =========================
   FORGOT PASSWORD
========================= */

const forgot = document.getElementById("forgotBtn");

if(forgot){

forgot.addEventListener("click",async()=>{

const email = document.getElementById("email")?.value.trim();

if(!email){

document.getElementById("msg").innerText=
"Enter email first.";

return;

}

await sendPasswordResetEmail(auth,email);

document.getElementById("msg").innerText=
"Password reset email sent.";

});

}



/* =========================
   RESEND VERIFICATION EMAIL
========================= */

const resend = document.getElementById("resendVerify");

if(resend){

resend.addEventListener("click",async()=>{

const user = auth.currentUser;

if(user){

await sendEmailVerification(user);

document.getElementById("msg").innerText=
"Verification email resent.";

}

});

}



/* =========================
   GOOGLE LOGIN
========================= */

const googleBtn = document.getElementById("googleLogin");

if(googleBtn){

googleBtn.addEventListener("click",async()=>{

const provider = new GoogleAuthProvider();

const result = await signInWithPopup(auth,provider);

const user = result.user;

await setDoc(doc(db,"users",user.uid),{

firstName:user.displayName,
lastName:"",
totalScore:0

},{merge:true});

location.href="dashboard.html";

});

}



/* =========================
   LOGOUT
========================= */

window.logoutUser = function(){

signOut(auth).then(()=>{
location.reload();
});

};



/* =========================
   SAVE OFFICIAL SCORE
========================= */

export async function saveOfficialScore(score){

const user = auth.currentUser;

if(!user){
throw new Error("User not logged in");
}

const userRef = doc(db,"users",user.uid);

const snap = await getDoc(userRef);

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

window.saveOfficialScore = saveOfficialScore;

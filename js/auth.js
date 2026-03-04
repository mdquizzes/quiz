import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendEmailVerification,
sendPasswordResetEmail,
GoogleAuthProvider,
signInWithPopup
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
doc,
setDoc
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


/* SIGNUP */

const signupBtn=document.getElementById("signupBtn")

if(signupBtn){

signupBtn.addEventListener("click",async()=>{

const fName=document.getElementById("firstName").value
const lName=document.getElementById("lastName").value
const email=document.getElementById("emailSignup").value
const pass=document.getElementById("passwordSignup").value

try{

const cred=await createUserWithEmailAndPassword(auth,email,pass)

await sendEmailVerification(cred.user)

await setDoc(doc(db,"users",cred.user.uid),{
firstName:fName,
lastName:lName,
totalScore:0
})

document.getElementById("msg").innerText=
"Verification email sent."

document.getElementById("verifyBox").style.display="block"

}catch(e){

if(e.code==="auth/email-already-in-use"){

document.getElementById("msg").innerText=
"Email already registered. Please login."

}else{

document.getElementById("msg").innerText=e.message

}

}

})

}


/* LOGIN */

const loginBtn=document.getElementById("loginBtn")

if(loginBtn){

loginBtn.addEventListener("click",async()=>{

const email=document.getElementById("email").value
const pass=document.getElementById("password").value

try{

const cred=await signInWithEmailAndPassword(auth,email,pass)

await cred.user.reload()

if(!cred.user.emailVerified){

document.getElementById("msg").innerText=
"Please verify your email first."

return

}

location.href="dashboard.html"

}catch(e){

document.getElementById("msg").innerText=e.message

}

})

}


/* FORGOT PASSWORD */

const forgot=document.getElementById("forgotBtn")

if(forgot){

forgot.addEventListener("click",async()=>{

const email=document.getElementById("email").value

if(!email){

document.getElementById("msg").innerText=
"Enter email first."

return

}

await sendPasswordResetEmail(auth,email)

document.getElementById("msg").innerText=
"Password reset email sent."

})

}


/* RESEND VERIFICATION */

const resend=document.getElementById("resendVerify")

if(resend){

resend.addEventListener("click",async()=>{

const user=auth.currentUser

if(user){

await sendEmailVerification(user)

document.getElementById("msg").innerText=
"Verification email resent."

}

})

}


/* GOOGLE LOGIN */

const googleBtn=document.getElementById("googleLogin")

if(googleBtn){

googleBtn.addEventListener("click",async()=>{

const provider=new GoogleAuthProvider()

const result=await signInWithPopup(auth,provider)

const user=result.user

await setDoc(doc(db,"users",user.uid),{

firstName:user.displayName,
lastName:"",
totalScore:0

},{merge:true})

location.href="dashboard.html"

})

}

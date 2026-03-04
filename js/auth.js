// 🔥 IMPORT FROM CONFIG FILE
import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendEmailVerification
} from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
doc,
setDoc
} from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
"Verification email sent. Please verify."

}catch(e){

document.getElementById("msg").innerText=e.message

}

})

}



const loginBtn=document.getElementById("loginBtn")

if(loginBtn){

loginBtn.addEventListener("click",async()=>{

const email=document.getElementById("email").value
const pass=document.getElementById("password").value

try{

const cred=await signInWithEmailAndPassword(auth,email,pass)

if(!cred.user.emailVerified){

document.getElementById("msg").innerText=
"Please verify your email first"

return

}

location.href="dashboard.html"

}catch(e){

document.getElementById("msg").innerText=e.message

}

})

}

/* =========================
   LOGIN
========================= */

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {

    const emailVal = document.getElementById("email")?.value.trim();
    const passVal = document.getElementById("password")?.value.trim();

    if (!emailVal || !passVal) {
      alert("Enter email & password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailVal, passVal);
      alert("Login Successful");
      window.location.href = "index.html";
    }
    catch (error) {
      alert(error.message);
    }

  });
}



/* =========================
   LOGOUT
========================= */

window.logoutUser = function () {
  signOut(auth).then(() => {
    window.location.reload();
  });
};



/* =========================
   AUTH STATE LISTENER
========================= */

onAuthStateChanged(auth, async (user) => {

  const statusEl = document.getElementById("userStatus");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileBtn = document.getElementById("profileBtn");
  const totalPoints = document.getElementById("totalPoints");

  if (!statusEl) return;

  if (user) {

    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.data();

    statusEl.innerText = "👤 " + (data?.firstName || "User");

    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (profileBtn) profileBtn.style.display = "inline-block";

    if (totalPoints) {
      totalPoints.innerText =
        "Total Points: " + (data?.totalScore || 0);
    }

  } else {

    statusEl.innerText = "Guest User";

    if (logoutBtn) logoutBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "none";

    if (totalPoints) {
      totalPoints.innerText =
        "Login to accumulate Total Points";
    }
  }

});



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

    // create document if missing
    await setDoc(userRef,{
      firstName:"User",
      lastName:"",
      totalScore: score
    });

  }else{

    // update score
    await updateDoc(userRef,{
      totalScore: increment(score)
    });

  }

}

window.saveOfficialScore = saveOfficialScore;

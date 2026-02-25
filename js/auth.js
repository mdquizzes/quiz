import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

/* SIGNUP */
window.signupUser = async function(){
  const fName = document.getElementById("firstName")?.value.trim();
  const lName = document.getElementById("lastName")?.value.trim();
  const emailVal = document.getElementById("email")?.value.trim();
  const passVal = document.getElementById("password")?.value.trim();

  if(!fName || !lName || !emailVal || !passVal){
    alert("Fill all fields");
    return;
  }

  const userCred = await createUserWithEmailAndPassword(auth,emailVal,passVal);

  await setDoc(doc(db,"users",userCred.user.uid),{
    firstName:fName,
    lastName:lName,
    totalScore:0,
    role:"student",
    createdAt:Date.now()
  });

  alert("Signup Successful");
  window.location.href="index.html";
};

/* LOGIN */
window.loginUser = async function(){
  const emailVal = document.getElementById("email")?.value.trim();
  const passVal = document.getElementById("password")?.value.trim();

  if(!emailVal || !passVal){
    alert("Enter email & password");
    return;
  }

  await signInWithEmailAndPassword(auth,emailVal,passVal);
  alert("Login Successful");
  window.location.href="index.html";
};

/* LOGOUT */
window.logoutUser = function(){
  signOut(auth).then(()=>{
    window.location.reload();
  });
};

/* AUTH STATE LISTENER */
onAuthStateChanged(auth, async (user)=>{

  const statusEl = document.getElementById("userStatus");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileBtn = document.getElementById("profileBtn");
  const totalPoints = document.getElementById("totalPoints");

  if(!statusEl) return; // login page safety

  if(user){

    const snap = await getDoc(doc(db,"users",user.uid));
    const data = snap.data();

    statusEl.innerText = "👤 " + data.firstName;

    loginBtn.style.display="none";
    logoutBtn.style.display="inline-block";
    profileBtn.style.display="inline-block";

    if(totalPoints){
      totalPoints.innerText = "Total Points: " + (data.totalScore || 0);
    }

  }else{

    statusEl.innerText="Guest User";

    loginBtn.style.display="inline-block";
    logoutBtn.style.display="none";
    profileBtn.style.display="none";

    if(totalPoints){
      totalPoints.innerText="Login to accumulate Total Points";
    }
  }

});

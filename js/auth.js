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

window.signupUser = async function(){
  const userCred = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );

  await setDoc(doc(db,"users",userCred.user.uid),{
    firstName:firstName.value,
    lastName:lastName.value,
    totalScore:0
  });

  alert("Signup Successful");
}

window.loginUser = async function(){
  await signInWithEmailAndPassword(auth,email.value,password.value);
  alert("Login Successful");
}

window.logoutUser = function(){
  signOut(auth);
}

onAuthStateChanged(auth, async (user)=>{
  if(user){
    const snap = await getDoc(doc(db,"users",user.uid));
    if(snap.exists()){
      const data = snap.data();
      userStatus.innerText =
        "Welcome " + data.firstName + " " + data.lastName;
    }
  }else{
    userStatus.innerText = "Guest User";
  }
});

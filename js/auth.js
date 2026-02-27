// 🔥 IMPORT FROM CONFIG FILE
import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment
} from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



/* =========================
   SIGNUP
========================= */

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {

    const fName = document.getElementById("firstName")?.value.trim();
    const lName = document.getElementById("lastName")?.value.trim();
    const emailVal = document.getElementById("email")?.value.trim();
    const passVal = document.getElementById("password")?.value.trim();

    if (!fName || !lName || !emailVal || !passVal) {
      alert("Fill all fields");
      return;
    }

    try {

      const userCred = await createUserWithEmailAndPassword(auth, emailVal, passVal);

      await setDoc(doc(db, "users", userCred.user.uid), {
        firstName: fName,
        lastName: lName,
        totalScore: 0,
        role: "student",
        createdAt: Date.now()
      });

      alert("Signup Successful");
      window.location.href = "index.html";

    } catch (error) {
      alert(error.message);
    }

  });
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

export async function saveOfficialScore(score) {

  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  await updateDoc(doc(db, "users", user.uid), {
    totalScore: increment(score)
  });

}

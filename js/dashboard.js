import { auth, db } from "./firebase-config.js";

import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* =========================
   DOM ELEMENTS
========================= */

const loginStatus = document.getElementById("loginStatus");
const logoutBtn = document.getElementById("logoutBtn");

/* =========================
   DASHBOARD LOGOUT
========================= */

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      logoutBtn.disabled = true;
      logoutBtn.innerText = "Logging out...";

      await signOut(auth);

      if (loginStatus) {
        loginStatus.innerText = "Logged out successfully";
      }

      setTimeout(() => {
        window.location.href = "login.html";
      }, 500);

    } catch (error) {
      console.error("Logout Error:", error);
      alert("Logout failed. Please try again.");
      logoutBtn.disabled = false;
      logoutBtn.innerText = "🚪 Logout";
    }
  });
}

/* =========================
   AUTH CHECK + LOAD DATA
========================= */

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    if (loginStatus) loginStatus.innerText = "Not logged in";
    window.location.href = "login.html";
    return;
  }

  if (loginStatus) loginStatus.innerText = "Logged in securely";

  try {
    await user.reload();

    if (!user.emailVerified) {
      if (loginStatus) loginStatus.innerText = "Email not verified";
      window.location.href = "login.html";
      return;
    }

    /* LOAD USER DATA */
    const snap = await getDoc(doc(db, "users", user.uid));

    let data = {};

    if (snap.exists()) {
      data = snap.data();
    }

    const firstName = data.firstName || "User";
    const lastName = data.lastName || "";

    document.getElementById("userName").innerText =
      (firstName + " " + lastName).trim();

    document.getElementById("points").innerText =
      data.totalScore || 0;

    document.getElementById("attempts").innerText =
      data.quizzesAttempted || 0;

    document.getElementById("correct").innerText =
      data.correctAnswers || 0;

    document.getElementById("wrong").innerText =
      data.wrongAnswers || 0;

    /* CALCULATE ACCURACY */
    const total = (data.correctAnswers || 0) + (data.wrongAnswers || 0);

    let acc = total
      ? ((data.correctAnswers / total) * 100).toFixed(1)
      : 0;

    document.getElementById("accuracy").innerText = acc + "%";

    /* RANK CALCULATION */
    const q = query(
      collection(db, "users"),
      orderBy("totalScore", "desc")
    );

    const snapshot = await getDocs(q);

    let rank = 1;
    let foundRank = false;

    snapshot.forEach(docSnap => {
      if (!foundRank && docSnap.id === user.uid) {
        document.getElementById("rank").innerText = "#" + rank;
        foundRank = true;
      }
      rank++;
    });

    if (!foundRank) {
      document.getElementById("rank").innerText = "Unranked";
    }

    /* LEADERBOARD PREVIEW */
    const q2 = query(
      collection(db, "users"),
      orderBy("totalScore", "desc"),
      limit(5)
    );

    const snap2 = await getDocs(q2);

    let html = "";
    let r = 1;

    snap2.forEach(docSnap => {
      const d = docSnap.data();

      let medal = "";

      if (r === 1) medal = "🥇 ";
      else if (r === 2) medal = "🥈 ";
      else if (r === 3) medal = "🥉 ";

      const displayName =
        ((d.firstName || "User") + " " + (d.lastName || "")).trim();

      html += `<p>${medal}${r}. ${displayName} — ${d.totalScore || 0}</p>`;

      r++;
    });

    document.getElementById("leaderboardPreview").innerHTML =
      html || "<p>No leaderboard data yet.</p>";

  } catch (error) {
    console.error("Dashboard Load Error:", error);
  }

});

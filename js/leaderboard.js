import { auth, db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

/* SAVE OFFICIAL SCORE */

window.saveOfficialScore = async function(points){

  const user = auth.currentUser;
  if(!user) return Promise.reject("Not logged in");

  const userRef = doc(db,"users",user.uid);

  return runTransaction(db, async (transaction)=>{

    const snap = await transaction.get(userRef);
    const oldTotal = snap.data().totalScore || 0;

    transaction.update(userRef,{
      totalScore: oldTotal + points
    });
  });
};


/* LOAD MAIN LEADERBOARD */

window.loadMainLeaderboard = async function(){

  const leaderboardDiv = document.getElementById("leaderboard");
  leaderboardDiv.innerHTML = "Loading...";

  const q = query(
    collection(db,"users"),
    orderBy("totalScore","desc")
  );

  const snapshot = await getDocs(q);

  let html = "<h3>🏆 Top 10 (Earning Points)</h3>";

  let rank = 1;
  let currentUserRank = null;
  const currentUser = auth.currentUser;

  snapshot.forEach(docSnap=>{

    const data = docSnap.data();

    if(rank <= 10){
      html += `<p>${rank}. ${data.firstName} - ${data.totalScore || 0}</p>`;
    }

    if(currentUser && docSnap.id === currentUser.uid){
      currentUserRank = rank;
    }

    rank++;
  });

  if(currentUserRank){
    html += `<hr><p>Your Current Rank: ${currentUserRank}</p>`;
  }

  leaderboardDiv.innerHTML = html;
};

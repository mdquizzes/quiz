import { auth, db } from "./firebase-config.js";

import {
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";


window.loadMainLeaderboard = async function(){

  const leaderboardDiv = document.getElementById("leaderboard");
  leaderboardDiv.innerHTML = "<h3>Loading...</h3>";

  try{

    const q = query(
      collection(db,"users"),
      orderBy("totalScore","desc")
    );

    const snapshot = await getDocs(q);

    let users = [];
    snapshot.forEach(doc=>{
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });

    let html = "<h2>🏆 Main Leaderboard</h2>";
    html += "<h3>Top 10 Students</h3>";

    // Top 10
    for(let i=0; i<Math.min(10, users.length); i++){
      html += `<p>#${i+1} ${users[i].firstName} ${users[i].lastName} - ${users[i].totalScore || 0}</p>`;
    }

    // Find current user rank
    const currentUser = auth.currentUser;

    if(currentUser){

      let userRank = users.findIndex(u => u.id === currentUser.uid);

      if(userRank !== -1){

        html += "<hr>";
        html += "<h3>Your Rank</h3>";
        html += `<p>#${userRank+1} ${users[userRank].firstName} ${users[userRank].lastName} - ${users[userRank].totalScore || 0}</p>`;

      }

    }

    leaderboardDiv.innerHTML = html;

  }
  catch(err){
    leaderboardDiv.innerHTML = "<p>Error loading leaderboard.</p>";
    console.error(err);
  }
};

import { db } from "./firebase-config.js";

import {
collection,
getDocs,
query,
orderBy,
limit
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


window.loadMainLeaderboard = async function(){

const leaderboardDiv = document.getElementById("leaderboard");

if(!leaderboardDiv) return;

leaderboardDiv.innerHTML="Loading...";

const q=query(
collection(db,"users"),
orderBy("totalScore","desc"),
limit(10)
);

const snapshot=await getDocs(q);

let html="<h3>🏆 Top 10 (Earning Points)</h3>";

let rank=1;

snapshot.forEach(docSnap=>{

const data=docSnap.data();

html+=`
<p>${rank}. ${data.firstName || "User"} — ${data.totalScore || 0}</p>
`;

rank++;

});

leaderboardDiv.innerHTML=html;

}

document.addEventListener("DOMContentLoaded",loadMainLeaderboard);

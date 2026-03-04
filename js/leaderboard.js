import { db, auth } from "./firebase-config.js";

import {
collection,
getDocs,
query,
orderBy,
limit
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


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

let medal="";

if(rank===1) medal="🥇 ";
else if(rank===2) medal="🥈 ";
else if(rank===3) medal="🥉 ";

html+=`
<p>${medal}${rank}. ${data.firstName || "User"} — ${data.totalScore || 0}</p>
`;

rank++;

});

leaderboardDiv.innerHTML=html;

};


/* =========================
   CURRENT USER RANK
========================= */

window.loadUserRank = async function(){

const userRankDiv = document.getElementById("userRank");

if(!userRankDiv) return;

onAuthStateChanged(auth, async(user)=>{

if(!user){

userRankDiv.innerHTML="Login to see your rank";
return;

}

const q=query(
collection(db,"users"),
orderBy("totalScore","desc")
);

const snapshot=await getDocs(q);

let rank=1;
let foundRank=null;

snapshot.forEach(docSnap=>{

if(docSnap.id===user.uid){
foundRank=rank;
}

rank++;

});

if(foundRank){

userRankDiv.innerHTML=
`🏅 Your Rank: #${foundRank}`;

}else{

userRankDiv.innerHTML="Rank not available";

}

});

};


/* LOAD ON PAGE */

document.addEventListener("DOMContentLoaded",()=>{

loadMainLeaderboard();
loadUserRank();

});

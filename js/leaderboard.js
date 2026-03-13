import { db, auth } from "./firebase-config.js";

import {
collection,
getDocs,
query,
orderBy,
limit,
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


/* =========================
   GLOBAL LEADERBOARD
========================= */

window.loadMainLeaderboard = async function(){

const leaderboardDiv = document.getElementById("leaderboard");

if(!leaderboardDiv) return;

leaderboardDiv.innerHTML="Loading leaderboard...";

const q=query(
collection(db,"users"),
orderBy("totalScore","desc"),
limit(10)
);

const snapshot=await getDocs(q);

if(snapshot.empty){
leaderboardDiv.innerHTML="No leaderboard data yet.";
return;
}

let html=`<h2>🏆 Global Leaderboard</h2>`;

let rank=1;

snapshot.forEach((docSnap)=>{

const data=docSnap.data();

let medal="";
let rowClass="";

if(rank===1){
medal="🥇";
rowClass="gold";
}
else if(rank===2){
medal="🥈";
rowClass="silver";
}
else if(rank===3){
medal="🥉";
rowClass="bronze";
}

html+=`

<div class="leader-row ${rowClass}">

<div class="rank">
${medal || "#"+rank}
</div>

<div class="player">

<span class="name">
${data.firstName || "User"}
</span>

</div>

<div class="score">
${data.totalScore || 0} pts
</div>

</div>

`;

rank++;

});

leaderboardDiv.innerHTML=html;

};



/* =========================
   CURRENT USER RANK
========================= */

window.loadUserRank = function(){

const userRankDiv=document.getElementById("userRank");

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

snapshot.forEach((docSnap)=>{

if(docSnap.id===user.uid){
foundRank=rank;
}

rank++;

});

if(foundRank){

userRankDiv.innerHTML=`

<div class="my-rank-card">

<h3>🏅 Your Ranking</h3>

<p>Rank : #${foundRank}</p>

</div>

`;

}else{

userRankDiv.innerHTML="Rank not available";

}

});

};



/* =========================
   USER PROFILE CARD
========================= */

window.loadUserProfile = function(){

const profileDiv=document.getElementById("profileCard");

if(!profileDiv) return;

onAuthStateChanged(auth, async(user)=>{

if(!user){

profileDiv.innerHTML="Login to view profile";
return;

}

const snap=await getDoc(doc(db,"users",user.uid));

if(!snap.exists()){
profileDiv.innerHTML="Profile not found.";
return;
}

const data=snap.data();

profileDiv.innerHTML=`

<div class="profile-card">

<h2>👤 Your Profile</h2>

<p><b>Name:</b> ${data.firstName || ""} ${data.lastName || ""}</p>

<p><b>Total Points:</b> ${data.totalScore || 0}</p>

<p><b>User ID:</b> ${user.uid}</p>

</div>

`;

});

};



/* =========================
   AUTO LOAD
========================= */

document.addEventListener("DOMContentLoaded",()=>{

loadMainLeaderboard();
loadUserRank();
loadUserProfile();

});

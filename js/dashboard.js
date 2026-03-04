import { auth, db } from "./firebase-config.js";

import {
doc,
getDoc,
collection,
query,
orderBy,
getDocs,
limit
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


onAuthStateChanged(auth, async user=>{

if(!user){

location.href="login.html";
return;

}

/* LOAD USER DATA */

const snap=await getDoc(doc(db,"users",user.uid));
const data=snap.data();

document.getElementById("userName").innerText=
data.firstName+" "+data.lastName;

document.getElementById("points").innerText=
data.totalScore || 0;

document.getElementById("attempts").innerText=
data.quizzesAttempted || 0;

document.getElementById("correct").innerText=
data.correctAnswers || 0;

document.getElementById("wrong").innerText=
data.wrongAnswers || 0;


/* CALCULATE ACCURACY */

const total = (data.correctAnswers||0)+(data.wrongAnswers||0);

let acc = total ? ((data.correctAnswers/total)*100).toFixed(1) : 0;

document.getElementById("accuracy").innerText=
acc+"%";


/* RANK CALCULATION */

const q=query(
collection(db,"users"),
orderBy("totalScore","desc")
);

const snapshot=await getDocs(q);

let rank=1;

snapshot.forEach(docSnap=>{

if(docSnap.id===user.uid){

document.getElementById("rank").innerText=
"#"+rank;

}

rank++;

});


/* LEADERBOARD PREVIEW */

const q2=query(
collection(db,"users"),
orderBy("totalScore","desc"),
limit(5)
);

const snap2=await getDocs(q2);

let html="";

let r=1;

snap2.forEach(docSnap=>{

const d=docSnap.data();

let medal="";

if(r===1) medal="🥇 ";
else if(r===2) medal="🥈 ";
else if(r===3) medal="🥉 ";

html+=`<p>${medal}${r}. ${d.firstName} — ${d.totalScore}</p>`;

r++;

});

document.getElementById("leaderboardPreview").innerHTML=html;

});

// =========================
// MD ASSESSMENT
// PART 1
// =========================

import { db }
from "./firebase-config.js";

import {
collection,
query,
getDocs,
doc,
getDoc,
setDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// =========================
// ELEMENTS
// =========================

const assessmentInfo =
document.getElementById(
"assessmentInfo"
);

const studentName =
document.getElementById(
"studentName"
);

const loadStudentBtn =
document.getElementById(
"loadStudentBtn"
);

const questionContainer =
document.getElementById(
"questionContainer"
);

const statusBox =
document.getElementById(
"statusBox"
);


// =========================
// GLOBALS
// =========================

let activeAssessment = null;

let answerKey = {};

let currentStudent = null;

let studentRecord = null;

let currentStart = 1;

const pageSize = 20;


// =========================
// LOAD ASSESSMENT
// =========================

async function loadAssessment(){

const snapshot = await getDocs(
query(
collection(
db,
"assessments"
)
)
);

snapshot.forEach(docSnap=>{

const data =
docSnap.data();

if(data.active){

activeAssessment = {

id:docSnap.id,

...data

};

}

});

if(!activeAssessment){

assessmentInfo.innerHTML =
"<b>No Active Assessment</b>";

return;

}

answerKey =
activeAssessment.answerKey || {};

assessmentInfo.innerHTML =

`

<b>Subject:</b>

${activeAssessment.subject}

<br><br>

<b>Assessment:</b>

${activeAssessment.title}

<br><br>

<b>Total Questions:</b>

${Object.keys(answerKey).length}

`;

}


// =========================
// LOAD STUDENT
// =========================

loadStudentBtn.addEventListener(
"click",
loadStudent
);

async function loadStudent(){

const name =
studentName.value.trim();

if(!name){

alert(
"Enter Student Name"
);

return;

}

currentStudent =
name;

const docId =

activeAssessment.id +

"_" +

currentStudent
.replaceAll(" ","_");

const snap =

await getDoc(

doc(
db,
"assessmentResponses",
docId
)

);

if(snap.exists()){

studentRecord =
snap.data();

}
else{

studentRecord = {

studentName:
currentStudent,

answers:{},

lockedQuestions:[],

score:0

};

}

studentName.disabled =
true;

currentStart = 1;

renderQuestions();

statusBox.innerHTML =

`
Welcome

<b>
${currentStudent}
</b>
`;

}


// =========================
// RENDER QUESTIONS
// =========================

function renderQuestions(){

if(!studentRecord)
return;

const totalQuestions =

Object.keys(
answerKey
).length;

const endQuestion =

Math.min(
currentStart + pageSize - 1,
totalQuestions
);

let html =
'<div class="omrGrid">';

for(
let q=currentStart;
q<=endQuestion;
q++
){

const selected =

studentRecord.answers[q] || "";

const locked =

studentRecord.lockedQuestions
.includes(q);

html +=

`

<div class="qBox">

<div class="qTitle">

Q${q}

${locked ? " 🔒" : ""}

</div>

<div class="options">

${optionHTML(q,"A",selected,locked)}

${optionHTML(q,"B",selected,locked)}

${optionHTML(q,"C",selected,locked)}

${optionHTML(q,"D",selected,locked)}

</div>

</div>

`;

}

html += "</div>";

questionContainer.innerHTML =
html;

}


// =========================
// OPTION HTML
// =========================

function optionHTML(
question,
option,
selected,
locked
){

let cls =
"option";

if(selected===option){

cls +=
" selected";

}

if(locked){

cls +=
" locked";

}

return `

<div
class="${cls}"
onclick="selectAnswer(${question},'${option}')">

${option}

</div>

`;

}


// =========================
// SELECT ANSWER
// =========================

window.selectAnswer =
function(
question,
answer
){

if(
studentRecord.lockedQuestions
.includes(question)
){

return;

}

studentRecord.answers[
question
] = answer;

renderQuestions();

};


// =========================
// START
// =========================

loadAssessment();
// =========================
// PART 2
// SAVE + LOCK + NEXT PAGE
// =========================

const saveBtn =
document.getElementById(
"saveBtn"
);

const nextBtn =
document.getElementById(
"nextBtn"
);


// =========================
// SAVE PROGRESS
// =========================

saveBtn.addEventListener(
"click",
saveProgress
);

async function saveProgress(){

if(!currentStudent){

alert(
"Load Student First"
);

return;

}

let locked =

studentRecord.lockedQuestions || [];

Object.keys(
studentRecord.answers
).forEach(q=>{

q = parseInt(q);

if(
!locked.includes(q)
){

locked.push(q);

}

});

studentRecord.lockedQuestions =
locked;

let score = 0;

Object.keys(
studentRecord.answers
).forEach(q=>{

const studentAns =
studentRecord.answers[q];

const correctAns =
answerKey[q];

if(
studentAns ===
correctAns
){

score++;

}

});

studentRecord.score =
score;

const docId =

activeAssessment.id +

"_" +

currentStudent
.replaceAll(
" ",
"_"
);

await setDoc(

doc(
db,
"assessmentResponses",
docId
),

{

assessmentId:
activeAssessment.id,

studentName:
currentStudent,

answers:
studentRecord.answers,

lockedQuestions:
studentRecord.lockedQuestions,

score:
studentRecord.score,

updatedAt:
serverTimestamp()

},

{
merge:true
}

);

statusBox.innerHTML =

`

✅ Progress Saved

<br><br>

Current Score :

<b>

${score}

</b>

`;

renderQuestions();

loadLeaderboard();

}


// =========================
// NEXT 20 QUESTIONS
// =========================

nextBtn.addEventListener(
"click",
()=>{

const totalQuestions =

Object.keys(
answerKey
).length;

if(

currentStart + pageSize

<=

totalQuestions

){

currentStart +=
pageSize;

renderQuestions();

}

else{

alert(
"No More Questions"
);

}

});


// =========================
// AUTO SAVE
// =========================

setInterval(
async ()=>{

if(
!currentStudent
) return;

if(
!studentRecord
) return;

if(
Object.keys(
studentRecord.answers || {}
).length === 0
){
return;
}

try{

const docId =

activeAssessment.id +

"_" +

currentStudent
.replaceAll(
" ",
"_"
);

await setDoc(

doc(
db,
"assessmentResponses",
docId
),

{

assessmentId:
activeAssessment.id,

studentName:
currentStudent,

answers:
studentRecord.answers,

lockedQuestions:
studentRecord.lockedQuestions || [],

score:
studentRecord.score || 0,

updatedAt:
serverTimestamp()

},

{
merge:true
}

);

console.log(
"Auto Saved"
);

}
catch(err){

console.error(
err
);

}

},
30000
);


// =========================
// SAVE NAME
// =========================

studentName.addEventListener(
"change",
function(){

localStorage.setItem(
"assessmentStudent",
this.value
);

}
);


// =========================
// RESTORE NAME
// =========================

window.addEventListener(
"load",
()=>{

const savedName =

localStorage.getItem(
"assessmentStudent"
);

if(savedName){

studentName.value =
savedName;

}

}
);
// =========================
// PART 3
// LEADERBOARD + UNLOCK
// =========================

async function loadLeaderboard(){

if(!activeAssessment)
return;

const snapshot = await getDocs(
query(
collection(
db,
"assessmentResponses"
)
)
);

let players = [];

snapshot.forEach(docSnap=>{

const data =
docSnap.data();

if(
data.assessmentId ===
activeAssessment.id
){

players.push(data);

}

});

players.sort(
(a,b)=>
(b.score || 0)
-
(a.score || 0)
);

renderLeaderboard(
players
);

}


// =========================
// RENDER LEADERBOARD
// =========================

function renderLeaderboard(
players
){

let html =

`

<table
style="
width:100%;
border-collapse:collapse;
font-size:14px;
">

<tr>

<th>#</th>

<th>Student</th>

<th>Score</th>

</tr>

`;

let rank = 1;

players.forEach(player=>{

let bg = "";

if(rank===1){

bg =
"background:#f59e0b;color:black;font-weight:bold;";

}
else if(rank===2){

bg =
"background:#d1d5db;color:black;font-weight:bold;";

}
else if(rank===3){

bg =
"background:#b45309;color:white;font-weight:bold;";

}

html +=

`

<tr style="${bg}">

<td>${rank}</td>

<td>${player.studentName}</td>

<td>${player.score || 0}</td>

</tr>

`;

rank++;

});

html += "</table>";

leaderboardBody.innerHTML =
html;

}


// =========================
// AUTO REFRESH LEADERBOARD
// =========================

setInterval(
loadLeaderboard,
5000
);

setTimeout(
loadLeaderboard,
1500
);


// =========================
// PASSWORD UNLOCK
// =========================

const unlockBtn =
document.createElement(
"button"
);

unlockBtn.innerHTML =
"🔓 Unlock Question";

unlockBtn.style.marginTop =
"10px";

document
.querySelector(".card:last-of-type")
.appendChild(
unlockBtn
);

const TEACHER_PASSWORD =
"MD2025";

unlockBtn.addEventListener(
"click",
unlockQuestion
);

function unlockQuestion(){

if(!studentRecord){

alert(
"Load Student First"
);

return;

}

const qNo = prompt(
"Question Number"
);

if(!qNo)
return;

const password = prompt(
"Teacher Password"
);

if(
password !==
TEACHER_PASSWORD
){

alert(
"Wrong Password"
);

return;

}

const q =
parseInt(qNo);

studentRecord.lockedQuestions =

studentRecord.lockedQuestions
.filter(x=>x!==q);

renderQuestions();

alert(
"Question " +
q +
" Unlocked"
);

}


// =========================
// REFRESH PROTECTION
// =========================

window.addEventListener(
"beforeunload",
function(e){

if(
currentStudent &&
studentRecord &&
Object.keys(
studentRecord.answers || {}
).length > 0
){

e.preventDefault();

e.returnValue = "";

}

}
);


// =========================
// LOAD INITIAL LEADERBOARD
// =========================

loadLeaderboard();

console.log(
"MD Assessment Ready"
);

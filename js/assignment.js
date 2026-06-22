// =========================
// MD ASSESSMENT V2
// PART 1
// =========================

import { db }
from "./firebase-config.js";

import {
collection,
getDocs,
query
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// =========================
// ELEMENTS
// =========================

const assessmentInfo =
document.getElementById(
"assessmentInfo"
);

const questionContainer =
document.getElementById(
"questionContainer"
);

const leaderboardBody =
document.getElementById(
"leaderboardBody"
);

const loadStudentBtn =
document.getElementById(
"loadStudentBtn"
);


// =========================
// GLOBALS
// =========================

let activeAssessment =
null;

let currentStudent =
null;

let studentRecord =
null;

let answerKey = {};

let currentStart = 1;

let pageSize = 20;


// =========================
// LOAD ACTIVE ASSESSMENT
// =========================

async function loadAssessment(){

const snapshot =

await getDocs(

query(
collection(
db,
"assessments"
)
)

);

snapshot.forEach(doc=>{

const data =
doc.data();

if(data.active){

activeAssessment = {

id:doc.id,

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

const totalQuestions =

Object.keys(
answerKey
).length;

assessmentInfo.innerHTML =

`

<b>Subject :</b>

${activeAssessment.subject}

<br><br>

<b>Assessment :</b>

${activeAssessment.title}

<br><br>

<b>Total Questions :</b>

${totalQuestions}

`;

}


// =========================
// LOAD STUDENT
// =========================

loadStudentBtn.addEventListener(
"click",
loadStudentSheet
);

async function loadStudentSheet(){

const name =

document.getElementById(
"studentName"
).value.trim();

if(!name){

alert(
"Enter Student Name"
);

return;

}

currentStudent =
name;

studentRecord = {

answers:{},
lockedQuestions:[]
};

currentStart = 1;

renderQuestions();

}


// =========================
// QUESTION PAGE
// =========================

function renderQuestions(){

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

const locked =

studentRecord.lockedQuestions
.includes(q);

const selectedAnswer =

studentRecord.answers[q] || "";

html +=

`

<div class="qBox">

<div class="qTitle">

Q${q}

${locked ? " 🔒" : ""}

</div>

<div class="options">

${renderOption(q,"A",selectedAnswer,locked)}

${renderOption(q,"B",selectedAnswer,locked)}

${renderOption(q,"C",selectedAnswer,locked)}

${renderOption(q,"D",selectedAnswer,locked)}

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

function renderOption(
question,
option,
selected,
locked
){

let cls = "option";

if(selected === option){

cls += " selected";

}

if(locked){

cls += " locked";

}

return

`

<div
class="${cls}"
onclick="selectAnswer(
${question},
'${option}'
)">

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
// LOAD FIRST
// =========================

loadAssessment();
// =========================
// SAVE PROGRESS
// PART 2
// =========================

import {
doc,
getDoc,
setDoc,
updateDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const saveBtn =
document.getElementById(
"saveBtn"
);

const nextBtn =
document.getElementById(
"nextBtn"
);

const statusBox =
document.getElementById(
"statusBox"
);


// =========================
// LOAD EXISTING STUDENT
// =========================

async function loadExistingStudent(){

if(!currentStudent)
return;

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

if(!snap.exists()){

studentRecord = {

studentName:
currentStudent,

answers:{},

lockedQuestions:[],

score:0

};

return;

}

studentRecord =
snap.data();

}


// =========================
// OVERRIDE STUDENT LOAD
// =========================

async function loadStudentSheet(){

const name =

document.getElementById(
"studentName"
).value.trim();

if(!name){

alert(
"Enter Student Name"
);

return;

}

currentStudent =
name;

await loadExistingStudent();

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
.replaceAll(" ","_");

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

}

);

statusBox.innerHTML =

`
✅ Saved

<br><br>

Score :

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
function(){

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

});
// =========================
// LIVE LEADERBOARD
// PART 3
// =========================

async function loadLeaderboard(){

if(!activeAssessment)
return;

const snapshot =

await getDocs(

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

<th>
#
</th>

<th>
Student
</th>

<th>
Score
</th>

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

<td>

${rank}

</td>

<td>

${player.studentName}

</td>

<td>

${player.score || 0}

</td>

</tr>

`;

rank++;

});

html +=
"</table>";

leaderboardBody.innerHTML =
html;

}


// =========================
// AUTO REFRESH
// =========================

setInterval(
loadLeaderboard,
5000
);


// =========================
// INITIAL LEADERBOARD
// =========================

setTimeout(
loadLeaderboard,
1500
);

// =========================
// TEACHER MODE
// PART 4
// =========================

const params =
new URLSearchParams(
window.location.search
);

const isAdmin =
params.get("admin") === "1";


// =========================
// ADMIN PANEL UI
// =========================

if(
isAdmin &&
teacherAuthorized
){

createAdminPanel();

}

function createAdminPanel(){

const panel =
document.createElement("div");

panel.className =
"card";

panel.innerHTML =

`

<h2>
Teacher Controls
</h2>

<input
id="searchStudent"
placeholder="Search Student">

<button
id="findStudentBtn">

Find Student

</button>

<div
id="adminStudentInfo"
style="margin-top:15px;">
</div>

`;

document
.querySelector(".container")
.prepend(panel);

document
.getElementById(
"findStudentBtn"
)
.addEventListener(
"click",
findStudent
);

}


// =========================
// FIND STUDENT
// =========================

let adminStudentDoc =
null;

async function findStudent(){

const name =

document.getElementById(
"searchStudent"
).value.trim();

if(!name){

alert(
"Enter Student Name"
);

return;

}

const docId =

activeAssessment.id +

"_" +

name.replaceAll(
" ",
"_"
);

const snap =

await getDoc(

doc(
db,
"assessmentResponses",
docId
)

);

if(!snap.exists()){

document.getElementById(
"adminStudentInfo"
).innerHTML =

`
Student Not Found
`;

return;

}

adminStudentDoc =
snap.data();

renderAdminStudent();

}


// =========================
// SHOW STUDENT
// =========================

function renderAdminStudent(){

let html =

`

<h3>

${adminStudentDoc.studentName}

</h3>

<p>

Score :

<b>

${adminStudentDoc.score || 0}

</b>

</p>

<button
onclick="unlockAllQuestions()">

Unlock Student Sheet

</button>

<br><br>

`;

const answers =

adminStudentDoc.answers || {};

Object.keys(
answers
).forEach(q=>{

html +=

`

<div
style="
padding:8px;
background:#1e293b;
margin-bottom:5px;
border-radius:6px;
">

Q${q}

:

${answers[q]}

</div>

`;

});

document.getElementById(
"adminStudentInfo"
).innerHTML =
html;

}


// =========================
// UNLOCK STUDENT
// =========================

window.unlockAllQuestions =
async function(){

if(!adminStudentDoc)
return;

const name =
adminStudentDoc.studentName;

const docId =

activeAssessment.id +

"_" +

name.replaceAll(
" ",
"_"
);

await updateDoc(

doc(
db,
"assessmentResponses",
docId
),

{

lockedQuestions:[]

}

);

alert(
"Student Sheet Unlocked"
);

findStudent();

};
// =========================
// TEACHER EDIT ANSWERS
// PART 5
// =========================

function renderAdminStudent(){

let html =

`

<h3>

${adminStudentDoc.studentName}

</h3>

<p>

Score :

<b>

${adminStudentDoc.score || 0}

</b>

</p>

<button
onclick="unlockAllQuestions()">

Unlock Student Sheet

</button>

<br><br>

<h3>
Edit Answers
</h3>

`;

const answers =
adminStudentDoc.answers || {};

Object.keys(
answers
).forEach(q=>{

html +=

`

<div
style="
padding:10px;
background:#1e293b;
margin-bottom:8px;
border-radius:8px;
display:flex;
justify-content:space-between;
align-items:center;
flex-wrap:wrap;
">

<div>

<b>Q${q}</b>

Current :

${answers[q]}

</div>

<div>

<select
id="edit_${q}">

<option value="A">A</option>
<option value="B">B</option>
<option value="C">C</option>
<option value="D">D</option>

</select>

<button
onclick="updateStudentAnswer(${q})">

Update

</button>

</div>

</div>

`;

});

document.getElementById(
"adminStudentInfo"
).innerHTML =
html;

setTimeout(()=>{

Object.keys(
answers
).forEach(q=>{

const el =
document.getElementById(
"edit_" + q
);

if(el){

el.value =
answers[q];

}

});

},100);

}


// =========================
// UPDATE ANSWER
// =========================

window.updateStudentAnswer =
async function(questionNo){

if(!adminStudentDoc)
return;

const newAnswer =

document.getElementById(
"edit_" + questionNo
).value;

adminStudentDoc.answers[
questionNo
] = newAnswer;

let score = 0;

Object.keys(
adminStudentDoc.answers
).forEach(q=>{

const studentAns =
adminStudentDoc.answers[q];

const correctAns =
answerKey[q];

if(
studentAns ===
correctAns
){

score++;

}

});

adminStudentDoc.score =
score;

const docId =

activeAssessment.id +

"_" +

adminStudentDoc.studentName
.replaceAll(
" ",
"_"
);

await updateDoc(

doc(
db,
"assessmentResponses",
docId
),

{

answers:
adminStudentDoc.answers,

score:
adminStudentDoc.score

}

);

alert(
"Answer Updated"
);

loadLeaderboard();

findStudent();

};
// =========================
// TEACHER PASSWORD SECURITY
// PART 6
// =========================

const ADMIN_PASSWORD =
"MD2025";

const urlParams =
new URLSearchParams(
window.location.search
);

const adminMode =
urlParams.get("admin");

const adminPass =
urlParams.get("pass");

let teacherAuthorized =
false;


// =========================
// ADMIN AUTH CHECK
// =========================

if(adminMode === "1"){

if(
adminPass ===
ADMIN_PASSWORD
){

teacherAuthorized =
true;

}
else{

showTeacherLogin();

}

}


// =========================
// TEACHER LOGIN BOX
// =========================

function showTeacherLogin(){

document.body.innerHTML =

`

<div
style="
max-width:500px;
margin:80px auto;
background:#111827;
padding:30px;
border-radius:15px;
color:white;
">

<h2
style="
color:#facc15;
margin-bottom:20px;
">

Teacher Access

</h2>

<input
id="teacherPassword"
type="password"
placeholder="Enter Teacher Password"
style="
width:100%;
padding:12px;
border-radius:8px;
margin-bottom:15px;
">

<button
onclick="verifyTeacherPassword()"
style="
width:100%;
padding:12px;
background:#facc15;
border:none;
border-radius:8px;
font-weight:bold;
cursor:pointer;
">

Login

</button>

</div>

`;

}


// =========================
// VERIFY PASSWORD
// =========================

window.verifyTeacherPassword =
function(){

const pass =

document.getElementById(
"teacherPassword"
).value;

if(
pass ===
ADMIN_PASSWORD
){

location.href =

location.pathname +

"?admin=1&pass=" +

ADMIN_PASSWORD;

}
else{

alert(
"Wrong Password"
);

}

};


// =========================
// PROTECT ADMIN PANEL
// =========================

function adminAllowed(){

return teacherAuthorized;

}
// =========================
// STUDENT PROTECTION SYSTEM
// PART 7
// =========================

let studentLocked = false;


// =========================
// LOCK STUDENT NAME
// =========================

function lockStudentIdentity(){

const nameBox =
document.getElementById(
"studentName"
);

if(!nameBox) return;

nameBox.disabled = true;

studentLocked = true;

}


// =========================
// OVERRIDE LOAD STUDENT
// =========================

const originalLoadStudent =
loadStudentSheet;

loadStudentSheet =
async function(){

if(studentLocked){

alert(
"Student already loaded"
);

return;

}

await originalLoadStudent();

lockStudentIdentity();

};


// =========================
// DUPLICATE CHECK
// =========================

async function studentExists(name){

const docId =

activeAssessment.id +

"_" +

name.replaceAll(
" ",
"_"
);

const snap =

await getDoc(

doc(
db,
"assessmentResponses",
docId
)

);

return snap.exists();

}


// =========================
// AUTO SAVE
// =========================

setInterval(
async ()=>{

if(
!currentStudent
) return;

if(
Object.keys(
studentRecord.answers || {}
).length === 0
){
return;
}

try{

await setDoc(

doc(
db,
"assessmentResponses",

activeAssessment.id +

"_" +

currentStudent
.replaceAll(
" ",
"_"
)

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
"Auto Save Failed",
err
);

}

},
30000
);


// =========================
// BEFORE REFRESH WARNING
// =========================

window.addEventListener(
"beforeunload",
function(e){

if(
currentStudent &&
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
// SESSION RESTORE
// =========================

window.addEventListener(
"load",
()=>{

const savedName =

localStorage.getItem(
"assessmentStudent"
);

if(savedName){

document.getElementById(
"studentName"
).value =
savedName;

}

}
);


// =========================
// SAVE NAME
// =========================

document
.getElementById(
"studentName"
)
.addEventListener(
"change",
function(){

localStorage.setItem(
"assessmentStudent",
this.value
);

}
);


// =========================
// STATUS IMPROVEMENT
// =========================

function showStatus(msg){

const box =
document.getElementById(
"statusBox"
);

if(!box) return;

box.innerHTML = msg;

setTimeout(()=>{

if(box.innerHTML === msg){

box.innerHTML = "";

}

},4000);

}

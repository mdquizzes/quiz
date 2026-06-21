// =========================
// MD ASSESSMENT SYSTEM
// assessment.js
// PART 1
// =========================

import { db }
from "./firebase-config.js";

import {

collection,
addDoc,
getDocs,
query,
serverTimestamp

}

from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// =========================
// ELEMENTS
// =========================

const adminPanel =
document.getElementById(
"adminPanel"
);

const modeText =
document.getElementById(
"modeText"
);

const answerKeyBuilder =
document.getElementById(
"answerKeyBuilder"
);

const generateBtn =
document.getElementById(
"generateQuestionsBtn"
);


// =========================
// URL MODE
// =========================

const params =
new URLSearchParams(
window.location.search
);

const isAdmin =
params.get("admin") === "1";


// =========================
// GLOBALS
// =========================

let teacherAnswerKey = [];

let activeAssessment = null;

let studentAnswers = {};


// =========================
// ADMIN MODE
// =========================

if(isAdmin){

modeText.innerText =
"Teacher Mode";

adminPanel.classList.remove(
"hide"
);

}


// =========================
// GENERATE ANSWER KEY SHEET
// =========================

if(generateBtn){

generateBtn.addEventListener(
"click",
generateAnswerSheet
);

}

function generateAnswerSheet(){

const totalQuestions =
parseInt(

document.getElementById(
"questionCount"
).value

);

if(
!totalQuestions ||
totalQuestions < 1 ||
totalQuestions > 200
){

alert(
"Enter question count between 1 and 200"
);

return;

}

teacherAnswerKey =
new Array(
totalQuestions
).fill("");

let html = "";

for(
let i=1;
i<=totalQuestions;
i++
){

html +=

`
<div class="keyRow">

<div>

<b>
Q${i}
</b>

</div>

<div class="keyOptions">

<div
class="keyBtn"
onclick="selectTeacherAnswer(${i},'A',this)">
A
</div>

<div
class="keyBtn"
onclick="selectTeacherAnswer(${i},'B',this)">
B
</div>

<div
class="keyBtn"
onclick="selectTeacherAnswer(${i},'C',this)">
C
</div>

<div
class="keyBtn"
onclick="selectTeacherAnswer(${i},'D',this)">
D
</div>

</div>

</div>
`;

}

answerKeyBuilder.innerHTML =
html;

}


// =========================
// TEACHER ANSWER SELECT
// =========================

window.selectTeacherAnswer =
function(
questionNo,
answer,
el
){

const row =
el.parentElement;

row
.querySelectorAll(
".keyBtn"
)
.forEach(btn=>{

btn.classList.remove(
"active"
);

});

el.classList.add(
"active"
);

teacherAnswerKey[
questionNo - 1
] = answer;

};
// =========================
// CREATE ASSESSMENT
// =========================

const createBtn =
document.getElementById(
"createAssessmentBtn"
);

if(createBtn){

createBtn.addEventListener(
"click",
createAssessment
);

}

async function createAssessment(){

const subject =

document.getElementById(
"subjectName"
).value.trim();

const title =

document.getElementById(
"assessmentTitle"
).value.trim();

const totalQuestions =

parseInt(

document.getElementById(
"questionCount"
).value

);

if(
!subject ||
!title ||
!totalQuestions
){

alert(
"Fill all fields"
);

return;

}

const unanswered =

teacherAnswerKey.filter(
x=>!x
).length;

if(unanswered > 0){

alert(

"Please select answers for all questions"

);

return;

}

try{

await addDoc(

collection(
db,
"assessments"
),

{

subject,
title,

totalQuestions,

answerKey:
teacherAnswerKey,

active:true,

createdAt:
serverTimestamp()

}

);

alert(
"Assessment Created Successfully"
);

location.reload();

}
catch(err){

console.error(err);

alert(
"Failed to create assessment"
);

}

}


// =========================
// STUDENT ELEMENTS
// =========================

const assessmentInfo =
document.getElementById(
"assessmentInfo"
);

const omrSheet =
document.getElementById(
"omrSheet"
);

const submitAssessmentBtn =
document.getElementById(
"submitAssessmentBtn"
);


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

let latest = null;

snapshot.forEach(doc=>{

const data =
doc.data();

if(data.active){

latest = {

id:doc.id,

...data

};

}

});

if(!latest){

assessmentInfo.innerHTML =

`
<b>
No Active Assessment
</b>
`;

if(submitAssessmentBtn){

submitAssessmentBtn.style.display =
"none";
}

return;

}

activeAssessment =
latest;

assessmentInfo.innerHTML =

`

<b>Subject:</b>
${latest.subject}

<br><br>

<b>Assessment:</b>
${latest.title}

<br><br>

<b>Total Questions:</b>
${latest.totalQuestions}

`;

generateStudentOMR(
latest.totalQuestions
);

}


// =========================
// GENERATE STUDENT OMR
// =========================

function generateStudentOMR(
count
){

let html =
'<div class="omr-grid">';

for(
let i=1;
i<=count;
i++
){

html +=

`

<div class="qbox">

<div class="qtitle">

Q${i}

</div>

<div class="options">

<div
class="option"
onclick="selectOption(${i},'A',this)">
A
</div>

<div
class="option"
onclick="selectOption(${i},'B',this)">
B
</div>

<div
class="option"
onclick="selectOption(${i},'C',this)">
C
</div>

<div
class="option"
onclick="selectOption(${i},'D',this)">
D
</div>

</div>

</div>

`;

}

html += "</div>";

omrSheet.innerHTML =
html;

}


// =========================
// STUDENT OPTION SELECT
// =========================

window.selectOption =
function(
questionNo,
answer,
el
){

const parent =
el.parentElement;

parent
.querySelectorAll(
".option"
)
.forEach(x=>{

x.classList.remove(
"selected"
);

});

el.classList.add(
"selected"
);

studentAnswers[
questionNo
] = answer;

};
// =========================
// SUBMIT ASSESSMENT
// =========================

submitAssessmentBtn?.addEventListener(
"click",
submitAssessment
);

async function submitAssessment(){

const studentName =

document.getElementById(
"studentName"
).value.trim();

if(!studentName){

alert(
"Enter Student Name"
);

return;

}

if(!activeAssessment){

alert(
"No Active Assessment"
);

return;

}

try{

// Prevent duplicate name submission

const existingSnapshot =

await getDocs(

query(
collection(
db,
"assessmentResponses"
)
)

);

let alreadySubmitted =
false;

existingSnapshot.forEach(doc=>{

const data =
doc.data();

if(

data.assessmentId ===
activeAssessment.id

&&

data.studentName
.toLowerCase()
===

studentName
.toLowerCase()

){

alreadySubmitted =
true;

}

});

if(alreadySubmitted){

alert(
"This student name has already submitted."
);

return;

}

let score = 0;

let details = [];

for(
let i=1;
i<=activeAssessment.totalQuestions;
i++
){

const studentAns =
studentAnswers[i] || "";

const correctAns =
activeAssessment.answerKey[
i-1
];

let status =
"notAttempted";

if(studentAns){

if(
studentAns ===
correctAns
){

score++;

status =
"correct";

}
else{

status =
"wrong";

}

}

details.push({

question:i,

studentAns,

correctAns,

status

});

}

await addDoc(

collection(
db,
"assessmentResponses"
),

{

assessmentId:
activeAssessment.id,

assessmentTitle:
activeAssessment.title,

subject:
activeAssessment.subject,

studentName,

score,

answers:
studentAnswers,

details,

submittedAt:
serverTimestamp()

}

);

document.getElementById(
"studentResult"
).innerHTML =

`
✅ Submitted Successfully

<br><br>

Score :
<b>

${score}

/

${activeAssessment.totalQuestions}

</b>
`;

submitAssessmentBtn.disabled =
true;

loadLeaderboard();

}
catch(err){

console.error(err);

alert(
"Submission Failed"
);

}

}


// =========================
// LIVE LEADERBOARD
// =========================

async function loadLeaderboard(){

const leaderboardBody =
document.getElementById(
"leaderboardBody"
);

if(
!leaderboardBody ||
!activeAssessment
){
return;
}

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

snapshot.forEach(doc=>{

const data =
doc.data();

if(
data.assessmentId ===
activeAssessment.id
){

players.push(data);

}

});

players.sort(
(a,b)=>
b.score-a.score
);

let html = "";

let rank = 1;

players.forEach(player=>{

html +=

`
<div class="leader-row">

<b>
#${rank}
</b>

<br>

${player.studentName}

<br>

${player.score}

</div>
`;

rank++;

});

if(players.length===0){

html =
"No submissions yet";

}

leaderboardBody.innerHTML =
html;

}


// =========================
// INITIAL LOAD
// =========================

loadAssessment();

setTimeout(
loadLeaderboard,
3000
);

setInterval(
loadLeaderboard,
5000
);

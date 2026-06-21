// =========================
// MD ASSESSMENT SYSTEM
// assessment.js
// =========================

import { db } from "./firebase-config.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy,
limit,
serverTimestamp,
where
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// =========================
// ELEMENTS
// =========================

const adminPanel =
document.getElementById("adminPanel");

const studentPanel =
document.getElementById("studentPanel");

const modeText =
document.getElementById("modeText");

const assessmentInfo =
document.getElementById("assessmentInfo");

const omrSheet =
document.getElementById("omrSheet");

const leaderboardBody =
document.getElementById("leaderboardBody");

const submitAssessmentBtn =
document.getElementById(
"submitAssessmentBtn"
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

let activeAssessment = null;

let studentAnswers = {};


// =========================
// MODE SWITCH
// =========================

if(isAdmin){

modeText.innerText =
"Teacher Mode";

adminPanel.classList.remove(
"hide"
);

}
else{

modeText.innerText =
"Student Mode";

}


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
async ()=>{

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

const answerKeyRaw =
document.getElementById(
"answerKey"
).value.trim();

if(
!subject ||
!title ||
!totalQuestions ||
!answerKeyRaw
){
alert(
"Fill all fields"
);
return;
}

const answerKey =
answerKeyRaw
.split(",")
.map(x=>x.trim().toUpperCase());

if(
answerKey.length !==
totalQuestions
){
alert(
"Answer count and question count mismatch"
);
return;
}

await addDoc(
collection(
db,
"assessments"
),
{
subject,
title,
totalQuestions,
answerKey,
active:true,
createdAt:
serverTimestamp()
}
);

alert(
"Assessment Created"
);

location.reload();

}
);

}


// =========================
// LOAD ACTIVE ASSESSMENT
// =========================

async function
loadAssessment(){

const q =
query(
collection(
db,
"assessments"
)
);

const snapshot =
await getDocs(q);

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
"No Active Assessment";

submitAssessmentBtn.style.display =
"none";

return;
}

activeAssessment =
latest;

assessmentInfo.innerHTML =

`
<b>Subject:</b>
${latest.subject}
<br>

<b>Assessment:</b>
${latest.title}
<br>

<b>Questions:</b>
${latest.totalQuestions}
`;

generateOMR(
latest.totalQuestions
);

}


// =========================
// GENERATE OMR
// =========================

function generateOMR(
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
// SELECT OPTION
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
// SUBMIT
// =========================

submitAssessmentBtn
.addEventListener(
"click",
async ()=>{

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

let score = 0;

let detailed = [];

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

if(
studentAns
){

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

detailed.push({

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

studentName,

score,

answers:
studentAnswers,

details:
detailed,

submittedAt:
serverTimestamp()

}

);

document.getElementById(
"studentResult"
).innerHTML =

`
Score :
${score}
/
${activeAssessment.totalQuestions}
`;

loadLeaderboard();

}
);


// =========================
// LEADERBOARD
// =========================

async function
loadLeaderboard(){

if(!activeAssessment)
return;

const q =
query(
collection(
db,
"assessmentResponses"
)
);

const snapshot =
await getDocs(q);

let data = [];

snapshot.forEach(doc=>{

const d =
doc.data();

if(
d.assessmentId ===
activeAssessment.id
){

data.push(d);

}

});

data.sort(
(a,b)=>
b.score-a.score
);

let html = "";

let rank = 1;

data.forEach(row=>{

html +=

`
<div class="leader-row">

<b>
#${rank}
</b>

<br>

${row.studentName}

<br>

${row.score}

</div>
`;

rank++;

});

if(!html){

html =
"No submissions yet";

}

leaderboardBody.innerHTML =
html;

}


// =========================
// AUTO LOAD
// =========================

loadAssessment();

setInterval(
loadLeaderboard,
5000
);

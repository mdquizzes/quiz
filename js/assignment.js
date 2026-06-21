// =========================
// MD ASSIGNMENT SYSTEM V2
// assignment.js
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

const omrSheet =
document.getElementById(
"omrSheet"
);

const leaderboardBody =
document.getElementById(
"leaderboardBody"
);


// =========================
// GLOBALS
// =========================

let activeAssessment =
null;

let studentAnswers =
{};


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

return;

}

activeAssessment =
latest;

assessmentInfo.innerHTML =

`

<b>Class :</b>
${latest.className || "-"}

<br><br>

<b>Subject :</b>
${latest.subject}

<br><br>

<b>Assessment :</b>
${latest.title}

<br><br>

<b>Total Questions :</b>
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
'<div class="omrGrid">';

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
onclick="selectAnswer(${i},'A',this)">
A
</div>

<div
class="option"
onclick="selectAnswer(${i},'B',this)">
B
</div>

<div
class="option"
onclick="selectAnswer(${i},'C',this)">
C
</div>

<div
class="option"
onclick="selectAnswer(${i},'D',this)">
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
// SELECT ANSWER
// =========================

window.selectAnswer =
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
.forEach(btn=>{

btn.classList.remove(
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
// INITIAL LOAD
// =========================

loadAssessment();
// =========================
// SUBMIT ANSWERS
// =========================

const submitBtn =
document.getElementById(
"submitBtn"
);

submitBtn?.addEventListener(
"click",
submitAnswers
);

async function submitAnswers(){

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

// Check duplicate name

const snapshot =

await getDocs(

query(
collection(
db,
"assignmentResponses"
)
)

);

let alreadySubmitted =
false;

snapshot.forEach(doc=>{

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
"Student already submitted."
);

return;

}

// Score Calculation

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

// Save

await addDoc(

collection(
db,
"assignmentResponses"
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
new Date()

}

);

document.getElementById(
"studentResult"
).innerHTML =

`
✅ Submitted

<br><br>

Score :
<b>

${score}

/

${activeAssessment.totalQuestions}

</b>
`;

submitBtn.disabled =
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

if(!activeAssessment)
return;

const snapshot =

await getDocs(

query(
collection(
db,
"assignmentResponses"
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

<div class="leaderRow">

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
// AUTO REFRESH
// =========================

setInterval(
loadLeaderboard,
5000
);
// =========================
// RANGE RESULT ENGINE
// =========================

const showResultBtn =
document.getElementById(
"showResultBtn"
);

showResultBtn?.addEventListener(
"click",
showRangeResult
);

async function showRangeResult(){

const fromQ =

parseInt(
document.getElementById(
"fromQuestion"
).value
);

const toQ =

parseInt(
document.getElementById(
"toQuestion"
).value
);

if(
!fromQ ||
!toQ ||
fromQ > toQ
){

alert(
"Invalid question range"
);

return;

}

if(!activeAssessment){

alert(
"No Active Assessment"
);

return;

}

const snapshot =

await getDocs(

query(
collection(
db,
"assignmentResponses"
)
)

);

let resultData = [];

snapshot.forEach(doc=>{

const data =
doc.data();

if(
data.assessmentId !==
activeAssessment.id
){
return;
}

let right = 0;
let wrong = 0;
let blank = 0;

for(
let q=fromQ;
q<=toQ;
q++
){

const detail =
data.details.find(
d=>d.question===q
);

if(!detail){
continue;
}

if(
detail.status ===
"correct"
){

right++;

}
else if(

detail.status ===
"wrong"

){

wrong++;

}
else{

blank++;

}

}

const total =
right + wrong;

const accuracy =

total === 0

? 0

:

Math.round(
(right/total)*100
);

resultData.push({

studentName:
data.studentName,

right,
wrong,
blank,

score:right,

accuracy

});

});

resultData.sort(
(a,b)=>
b.score-a.score
);

renderRangeTable(
resultData,
fromQ,
toQ
);

}


// =========================
// RENDER RANGE TABLE
// =========================

function renderRangeTable(
rows,
fromQ,
toQ
){

let html =

`

<h3>

Question Range

${fromQ}
-
${toQ}

</h3>

<br>

<table class="resultTable">

<tr>

<th>
Rank
</th>

<th>
Name
</th>

<th>
Score
</th>

<th>
Right
</th>

<th>
Wrong
</th>

<th>
Blank
</th>

<th>
Accuracy
</th>

</tr>

`;

let rank = 1;

rows.forEach(row=>{

html +=

`

<tr>

<td>

${rank}

</td>

<td>

${row.studentName}

</td>

<td>

${row.score}

</td>

<td>

${row.right}

</td>

<td>

${row.wrong}

</td>

<td>

${row.blank}

</td>

<td>

${row.accuracy}%

</td>

</tr>

`;

rank++;

});

html +=
"</table>";

document.getElementById(
"rangeResult"
).innerHTML =
html;

}

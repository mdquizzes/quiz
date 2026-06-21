// =========================
// ASSESSMENT REPORT SYSTEM
// assessment-report.js
// =========================

import { db } from "./firebase-config.js";

import {
collection,
getDocs,
query
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const assessmentInfo =
document.getElementById(
"assessmentInfo"
);

const leaderboardDiv =
document.getElementById(
"leaderboard"
);

const studentDetailsDiv =
document.getElementById(
"studentDetails"
);

let activeAssessment = null;


// =========================
// LOAD ACTIVE ASSESSMENT
// =========================

async function loadAssessment(){

const snapshot =
await getDocs(
collection(
db,
"assessments"
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
`
<div class="card">
No Active Assessment Found
</div>
`;

return;
}

assessmentInfo.innerHTML =

`
<div class="card">

<h2>
${activeAssessment.subject}
</h2>

<p>
${activeAssessment.title}
</p>

<p>
Questions :
${activeAssessment.totalQuestions}
</p>

</div>
`;

loadResponses();

}


// =========================
// LOAD STUDENT RESPONSES
// =========================

async function loadResponses(){

const snapshot =
await getDocs(
collection(
db,
"assessmentResponses"
)
);

let students = [];

snapshot.forEach(doc=>{

const data =
doc.data();

if(
data.assessmentId ===
activeAssessment.id
){

students.push({

id:doc.id,
...data

});

}

});

students.sort(
(a,b)=>
b.score-a.score
);

renderLeaderboard(
students
);

}


// =========================
// LEADERBOARD
// =========================

function renderLeaderboard(
students
){

let html =

`
<div class="card">

<h2>
🏆 Leaderboard
</h2>
`;

let rank = 1;

students.forEach(student=>{

html +=

`
<div
class="studentRow"
onclick="showStudent('${student.id}')">

<b>
#${rank}
</b>

&nbsp;

${student.studentName}

&nbsp;

-

&nbsp;

${student.score}

</div>
`;

rank++;

});

html += "</div>";

leaderboardDiv.innerHTML =
html;

window.allStudents =
students;

}


// =========================
// STUDENT ANALYSIS
// =========================

window.showStudent =
function(studentId){

const student =
window.allStudents.find(
x=>x.id===studentId
);

if(!student)
return;

let html =

`
<div class="card">

<h2>
${student.studentName}
</h2>

<p>
Score :
${student.score}
</p>

<div class="analysis">
`;

student.details.forEach(item=>{

let cls =
"notAttempted";

if(
item.status ===
"correct"
){
cls="correct";
}

if(
item.status ===
"wrong"
){
cls="wrong";
}

html +=

`
<div
class="qbox ${cls}"
title="
Q${item.question}
">

${item.question}

</div>
`;

});

html +=

`
</div>

</div>
`;

studentDetailsDiv.innerHTML =
html;

};


// =========================
// AUTO LOAD
// =========================

loadAssessment();

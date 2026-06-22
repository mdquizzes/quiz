// =========================
// ASSESSMENT REPORT V2
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

const classStats =
document.getElementById(
"classStats"
);

const leaderboardTable =
document.getElementById(
"leaderboardTable"
);


// =========================
// GLOBALS
// =========================

let allStudents = [];

let activeAssessmentId =
null;


// =========================
// LOAD DATA
// =========================

async function loadReport(){

try{

const snapshot =

await getDocs(

query(
collection(
db,
"assessmentResponses"
)
)

);

allStudents = [];

snapshot.forEach(docSnap=>{

const data =
docSnap.data();

if(
data.studentName
){

allStudents.push(data);

}

});

if(
allStudents.length === 0
){

leaderboardTable.innerHTML =
"No Student Data";

return;

}

activeAssessmentId =

allStudents[0]
.assessmentId;

generateStatistics();

generateLeaderboard();

}
catch(err){

console.error(err);

leaderboardTable.innerHTML =
"Failed To Load";

}

}


// =========================
// CLASS STATS
// =========================

function generateStatistics(){

const totalStudents =
allStudents.length;

let highest = 0;

let lowest = 999999;

let totalScore = 0;

allStudents.forEach(student=>{

const score =
student.score || 0;

if(score > highest)
highest = score;

if(score < lowest)
lowest = score;

totalScore += score;

});

const average =

totalStudents

?

(
totalScore /
totalStudents
).toFixed(2)

:

0;

classStats.innerHTML =

`

<div class="statCard">

<h3>

Students

</h3>

<h1>

${totalStudents}

</h1>

</div>

<div class="statCard">

<h3>

Highest

</h3>

<h1>

${highest}

</h1>

</div>

<div class="statCard">

<h3>

Lowest

</h3>

<h1>

${lowest}

</h1>

</div>

<div class="statCard">

<h3>

Average

</h3>

<h1>

${average}

</h1>

</div>

`;

}


// =========================
// LEADERBOARD
// =========================

function generateLeaderboard(){

allStudents.sort(
(a,b)=>
(b.score || 0)
-
(a.score || 0)
);

let html =

`

<table>

<tr>

<th>
Rank
</th>

<th>
Student
</th>

<th>
Score
</th>

<th>
Attempted
</th>

<th>
Accuracy
</th>

</tr>

`;

let rank = 1;

allStudents.forEach(student=>{

const attempted =

Object.keys(
student.answers || {}
).length;

const score =
student.score || 0;

const accuracy =

attempted

?

Math.round(
(score/attempted)*100
)

:

0;

html +=

`

<tr>

<td>

${rank}

</td>

<td>

${student.studentName}

</td>

<td>

${score}

</td>

<td>

${attempted}

</td>

<td>

${accuracy}%

</td>

</tr>

`;

rank++;

});

html +=
"</table>";

leaderboardTable.innerHTML =
html;

}


// =========================
// START
// =========================

loadReport();
// =========================
// SEARCH STUDENT
// PART 2
// =========================

const searchBtn =
document.getElementById(
"searchBtn"
);

const studentDetail =
document.getElementById(
"studentDetail"
);

searchBtn.addEventListener(
"click",
searchStudent
);


// =========================
// SEARCH
// =========================

function searchStudent(){

const keyword =

document.getElementById(
"searchStudent"
)
.value
.trim()
.toLowerCase();

if(!keyword){

alert(
"Enter Student Name"
);

return;

}

const student =

allStudents.find(x=>

x.studentName
.toLowerCase()
.includes(keyword)

);

if(!student){

studentDetail.style.display =
"block";

studentDetail.innerHTML =

`
<h3>
Student Not Found
</h3>
`;

return;

}

renderStudentDetail(
student
);

}


// =========================
// STUDENT DETAIL
// =========================

function renderStudentDetail(
student
){

studentDetail.style.display =
"block";

const answers =
student.answers || {};

const totalAttempted =

Object.keys(
answers
).length;

const score =
student.score || 0;

const wrong =

totalAttempted - score;

const accuracy =

totalAttempted

?

Math.round(
(score/totalAttempted)*100
)

:

0;

let html =

`

<h2>

${student.studentName}

</h2>

<br>

<div class="statsGrid">

<div class="statCard">

<h3>
Score
</h3>

<h1>
${score}
</h1>

</div>

<div class="statCard">

<h3>
Attempted
</h3>

<h1>
${totalAttempted}
</h1>

</div>

<div class="statCard">

<h3>
Wrong
</h3>

<h1>
${wrong}
</h1>

</div>

<div class="statCard">

<h3>
Accuracy
</h3>

<h1>
${accuracy}%
</h1>

</div>

</div>

<br>

<h3>
Question Analysis
</h3>

<div class="qGrid">

`;


// =========================
// QUESTION STATUS
// =========================

Object.keys(answerKey)
.forEach(q=>{

const studentAns =
answers[q];

const correctAns =
answerKey[q];

let cls =
"blank";

let symbol =
"⚪";

if(studentAns){

if(
studentAns ===
correctAns
){

cls =
"correct";

symbol =
"✅";

}
else{

cls =
"wrong";

symbol =
"❌";

}

}

html +=

`

<div
class="qBox ${cls}">

Q${q}

<br>

${symbol}

</div>

`;

});

html +=
"</div>";


// =========================
// WRONG QUESTIONS
// =========================

html +=

`

<br><br>

<h3>

Wrong Questions

</h3>

`;

let wrongFound =
false;

Object.keys(answerKey)
.forEach(q=>{

const studentAns =
answers[q];

const correctAns =
answerKey[q];

if(
studentAns &&
studentAns !== correctAns
){

wrongFound = true;

html +=

`

<div
style="
background:#1e293b;
padding:10px;
margin-bottom:8px;
border-radius:8px;
">

<b>

Q${q}

</b>

<br>

Student :

${studentAns}

<br>

Correct :

${correctAns}

</div>

`;

}

});

if(!wrongFound){

html +=

`

<div
style="
background:#1e293b;
padding:12px;
border-radius:8px;
">

No Wrong Answers 🎉

</div>

`;

}

studentDetail.innerHTML =
html;

window.scrollTo({

top:
studentDetail.offsetTop,

behavior:
"smooth"

});

}
// =========================
// DOWNLOAD REPORT
// PART 3
// =========================

const downloadReportBtn =
document.getElementById(
"downloadReportBtn"
);

downloadReportBtn.addEventListener(
"click",
downloadFullReport
);

function downloadFullReport(){

let report = "";

report +=
"MD QUIZZES ASSESSMENT REPORT\n";

report +=
"============================\n\n";

report +=
"Total Students : " +
allStudents.length +
"\n\n";


// =========================
// TOP RANKING
// =========================

report +=
"FINAL LEADERBOARD\n";

report +=
"-----------------\n";

allStudents.sort(
(a,b)=>
(b.score || 0)
-
(a.score || 0)
);

let rank = 1;

allStudents.forEach(student=>{

const attempted =

Object.keys(
student.answers || {}
).length;

const accuracy =

attempted

?

Math.round(
(
(student.score || 0)
/
attempted
)
*100)

:

0;

report +=

rank +

". " +

student.studentName +

" | Score : " +

(student.score || 0) +

" | Accuracy : " +

accuracy +

"%\n";

rank++;

});


// =========================
// STUDENT DETAILS
// =========================

report +=

"\n\nSTUDENT DETAILS\n";

report +=

"====================\n\n";

allStudents.forEach(student=>{

report +=

"\n---------------------------------\n";

report +=

student.studentName +

"\n";

report +=

"---------------------------------\n";

const answers =
student.answers || {};

Object.keys(answerKey)
.forEach(q=>{

const studentAns =
answers[q] || "-";

const correctAns =
answerKey[q];

let status =
"NOT ATTEMPTED";

if(studentAns !== "-"){

status =

studentAns === correctAns

?

"CORRECT"

:

"WRONG";

}

report +=

"Q" + q +

" : " +

studentAns +

" | Correct : " +

correctAns +

" | " +

status +

"\n";

});

});


// =========================
// WEAK QUESTIONS
// =========================

report +=

"\n\nWEAK QUESTION ANALYSIS\n";

report +=

"========================\n";

let weakQuestions = {};

Object.keys(answerKey)
.forEach(q=>{

weakQuestions[q] = 0;

});

allStudents.forEach(student=>{

const answers =
student.answers || {};

Object.keys(answerKey)
.forEach(q=>{

const studentAns =
answers[q];

const correctAns =
answerKey[q];

if(
studentAns &&
studentAns !== correctAns
){

weakQuestions[q]++;

}

});

});

Object.keys(
weakQuestions
).forEach(q=>{

report +=

"Q" + q +

" Wrong By : " +

weakQuestions[q] +

" Students\n";

});


// =========================
// DOWNLOAD
// =========================

const blob =

new Blob(
[report],
{
type:
"text/plain"
}
);

const link =
document.createElement(
"a"
);

link.href =
URL.createObjectURL(
blob
);

link.download =

"Assessment_Report.txt";

document.body.appendChild(
link
);

link.click();

document.body.removeChild(
link
);

}


// =========================
// AUTO REFRESH REPORT
// =========================

setInterval(
loadReport,
10000
);

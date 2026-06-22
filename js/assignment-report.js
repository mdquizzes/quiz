// =========================
// MD ASSIGNMENT REPORT
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

const assessmentSelect =
document.getElementById(
"assessmentSelect"
);

const leaderboardReport =
document.getElementById(
"leaderboardReport"
);


// =========================
// GLOBALS
// =========================

let assessments = [];

let selectedAssessment =
null;


// =========================
// LOAD ASSESSMENTS
// =========================

async function loadAssessments(){

try{

const snapshot =

await getDocs(

query(
collection(
db,
"assessments"
)
)

);

assessments = [];

snapshot.forEach(doc=>{

assessments.push({

id:doc.id,

...doc.data()

});

});

renderAssessmentDropdown();

}
catch(err){

console.error(err);

assessmentSelect.innerHTML =

`
<option value="">
Failed To Load
</option>
`;

}

}


// =========================
// DROPDOWN
// =========================

function renderAssessmentDropdown(){

let html =

`
<option value="">
Select Assessment
</option>
`;

assessments.forEach(item=>{

html +=

`

<option value="${item.id}">

${item.subject}

-

${item.title}

</option>

`;

});

assessmentSelect.innerHTML =
html;

}


// =========================
// SELECT ASSESSMENT
// =========================

assessmentSelect.addEventListener(
"change",
function(){

const id =
this.value;

selectedAssessment =

assessments.find(
x=>x.id===id
);

if(
selectedAssessment
){

loadLeaderboard();

}

}
);


// =========================
// FINAL LEADERBOARD
// =========================

async function loadLeaderboard(){

if(!selectedAssessment)
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

let rows = [];

snapshot.forEach(doc=>{

const data =
doc.data();

if(

data.assessmentId ===
selectedAssessment.id

){

rows.push(data);

}

});

rows.sort(
(a,b)=>
b.score-a.score
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
View
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

<button
class="studentBtn"
onclick="showStudentDetail('${row.studentName}')">

View Detail

</button>

</td>

</tr>

`;

rank++;

});

html +=
"</table>";

leaderboardReport.innerHTML =
html;

window.reportStudents =
rows;

}


// =========================
// INITIAL LOAD
// =========================

loadAssessments();
// =========================
// RANGE RESULT ENGINE
// PART 2
// =========================

const showRangeBtn =
document.getElementById(
"showRangeBtn"
);

const reportSummary =
document.getElementById(
"reportSummary"
);

showRangeBtn?.addEventListener(
"click",
showRangeResult
);


// =========================
// RANGE RESULT
// =========================

async function showRangeResult(){

if(!selectedAssessment){

alert(
"Select Assessment First"
);

return;

}

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
"Invalid Question Range"
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

let results = [];

snapshot.forEach(doc=>{

const data =
doc.data();

if(
data.assessmentId !==
selectedAssessment.id
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

const attempted =
right + wrong;

const accuracy =

attempted === 0

? 0

:

Math.round(
(right/attempted)*100
);

results.push({

studentName:
data.studentName,

right,
wrong,
blank,

score:right,

accuracy

});

});

results.sort(
(a,b)=>
b.score-a.score
);

renderRangeTable(
results,
fromQ,
toQ
);

}


// =========================
// RANGE TABLE
// =========================

function renderRangeTable(
rows,
fromQ,
toQ
){

let html =

`

<div class="summaryBox">

<h3>

Question Range

${fromQ}
-
${toQ}

</h3>

<br>

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

`

</table>

</div>

`;

reportSummary.innerHTML =
html;

}
// =========================
// STUDENT DETAIL REPORT
// PART 3
// =========================

const studentDetail =
document.getElementById(
"studentDetail"
);

const detailBody =
document.getElementById(
"detailBody"
);


// =========================
// VIEW DETAIL
// =========================

window.showStudentDetail =
function(studentName){

const student =

window.reportStudents.find(
x=>x.studentName===studentName
);

if(!student){
return;
}

studentDetail.style.display =
"block";

let html =

`

<h3>

${student.studentName}

</h3>

<br>

<p>

Score :
<b>

${student.score}

</b>

</p>

<br>

<div class="analysisGrid">

`;

student.details.forEach(item=>{

let cls =
"blank";

let symbol =
"⚪";

if(
item.status ===
"correct"
){

cls =
"correct";

symbol =
"✅";

}

if(
item.status ===
"wrong"
){

cls =
"wrong";

symbol =
"❌";

}

html +=

`

<div
class="qBox ${cls}">

Q${item.question}

<br>

${symbol}

</div>

`;

});

html +=

`

</div>

<br><br>

<h3>

Wrong Answers

</h3>

`;

let wrongFound =
false;

student.details.forEach(item=>{

if(
item.status ===
"wrong"
){

wrongFound = true;

html +=

`

<div class="summaryBox">

<b>

Q${item.question}

</b>

<br><br>

Student Answer :

${item.studentAns || "-"}

<br>

Correct Answer :

${item.correctAns}

</div>

`;

}

});

if(!wrongFound){

html +=

`

<div class="summaryBox">

No Wrong Answers 🎉

</div>

`;

}

detailBody.innerHTML =
html;

window.scrollTo({

top:
studentDetail.offsetTop - 20,

behavior:
"smooth"

});

};


// =========================
// DOWNLOAD FOUNDATION
// PART 3
// =========================

const downloadBtn =
document.getElementById(
"downloadReportBtn"
);

downloadBtn?.addEventListener(
"click",
downloadReport
);

function downloadReport(){

if(
!selectedAssessment
){

alert(
"Select Assessment First"
);

return;

}

let text = "";

text +=
"MD ASSIGNMENT REPORT\n\n";

text +=
"Assessment : " +
selectedAssessment.title +
"\n";

text +=
"Subject : " +
selectedAssessment.subject +
"\n\n";

window.reportStudents.forEach(
(student,index)=>{

text +=

(index+1) +
". " +

student.studentName +

" | Score : " +

student.score +

"\n";

});

const blob =

new Blob(
[text],
{
type:
"text/plain"
}
);

const a =
document.createElement(
"a"
);

a.href =
URL.createObjectURL(
blob
);

a.download =

selectedAssessment.title +

"-Report.txt";

a.click();

}

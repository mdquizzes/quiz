import { db }
from "./firebase-config.js";

import {
collection,
getDocs,
query,
doc,
setDoc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const generateBtn =
document.getElementById(
"generateBtn"
);

const saveBtn =
document.getElementById(
"saveBtn"
);

const answerContainer =
document.getElementById(
"answerContainer"
);

const status =
document.getElementById(
"status"
);


// =========================
// GENERATE ANSWER KEY UI
// =========================

generateBtn.addEventListener(
"click",
generateAnswerKey
);

function generateAnswerKey(){

const totalQuestions =
parseInt(
document.getElementById(
"totalQuestions"
).value
);

if(
!totalQuestions ||
totalQuestions < 1
){

alert(
"Enter Total Questions"
);

return;

}

let html = "";

for(
let i=1;
i<=totalQuestions;
i++
){

html +=

`

<div class="answerRow">

<span>

Q${i}

</span>

<select
id="ans_${i}">

<option value="A">A</option>

<option value="B">B</option>

<option value="C">C</option>

<option value="D">D</option>

</select>

</div>

`;

}

answerContainer.innerHTML =
html;

}


// =========================
// SAVE ASSIGNMENT
// =========================

saveBtn.addEventListener(
"click",
saveAssignment
);

async function saveAssignment(){

const subject =

document.getElementById(
"subject"
).value.trim();

const title =

document.getElementById(
"title"
).value.trim();

const totalQuestions =

parseInt(
document.getElementById(
"totalQuestions"
).value
);

if(
!subject ||
!title ||
!totalQuestions
){

alert(
"Fill All Fields"
);

return;

}

const answerKey = {};

for(
let i=1;
i<=totalQuestions;
i++
){

answerKey[i] =

document.getElementById(
"ans_" + i
).value;

}


// =========================
// DEACTIVATE OLD
// =========================

const snapshot =

await getDocs(

query(
collection(
db,
"assessments"
)
)

);

for(
const item of
snapshot.docs
){

const data =
item.data();

if(data.active){

await updateDoc(

doc(
db,
"assessments",
item.id
),

{
active:false
}

);

}

}


// =========================
// CREATE NEW
// =========================

const newId =

"ASSIGN_" +

Date.now();

await setDoc(

doc(
db,
"assessments",
newId
),

{

subject:
subject,

title:
title,

answerKey:
answerKey,

active:true,

createdAt:
Date.now()

}

);

status.innerHTML =

`

<br>

✅ Assignment Saved

<br><br>

Subject :

<b>

${subject}

</b>

<br>

Title :

<b>

${title}

</b>

`;

window.scrollTo({

top:0,
behavior:"smooth"

});

}

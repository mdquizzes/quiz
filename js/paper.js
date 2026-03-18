// ===== LOAD DATA =====
const ALL_QUESTIONS = [
...window.SECTION_A,
...window.SECTION_B,
...window.SECTION_C,
...window.SECTION_D
];

// ===== EVENTS =====
document.getElementById("generateBtn").addEventListener("click", generatePaper);
document.getElementById("printBtn").addEventListener("click", () => window.print());
document.getElementById("pdfBtn").addEventListener("click", downloadPDF);
document.getElementById("regenerateBtn").addEventListener("click", generatePaper);

// ===== SHUFFLE =====
function shuffle(arr){
return arr.sort(()=>Math.random()-0.5);
}

// ===== FILTER =====
function getFilteredQuestions(){

let difficulty = document.getElementById("difficultySelect").value;

return ALL_QUESTIONS.filter(q=>{
return difficulty === "all" || q.difficulty === difficulty;
});

}

// ===== GENERATE PAPER =====
function generatePaper(){

let selectedChapters = [...document.querySelectorAll(".chapter:checked")]
.map(cb => cb.value);

if(selectedChapters.length === 0){
alert("Select at least one chapter!");
return;
}

// FILTER QUESTIONS
let questions = ALL_QUESTIONS.filter(q =>
selectedChapters.includes(q.chapter)
);

// GROUP BY SECTION
let sectionA = questions.filter(q => q.section === "A");
let sectionB = questions.filter(q => q.section === "B");
let sectionC = questions.filter(q => q.section === "C");
let sectionD = questions.filter(q => q.section === "D");

// AUTO MARKS
let totalMarks =
(sectionA.length * 1) +
(sectionB.length * 2) +
(sectionC.length * 3) +
(sectionD.length * 5);

// AUTO TIME (simple logic)
let totalTime = Math.ceil(totalMarks * 1.5);

// DATE
let date = new Date().toLocaleDateString();

let html = `
<div class="paper">

<div class="paper-header">
<h2>MD QUIZZES</h2>
<p><b>Class:</b> X | <b>Subject:</b> Science</p>
<p><b>Date:</b> ${date}</p>
<p><b>Time:</b> ${totalTime} Minutes | <b>Max Marks:</b> ${totalMarks}</p>
</div>

<hr>
`;

// SECTION A
if(sectionA.length){
html += `<div class="section"><h3>Section A (MCQ)</h3>`;
sectionA.forEach((q,i)=>{
html += `<p><b>${i+1}. ${q.question}</b></p>`;
q.answers.forEach((opt,j)=>{
html += `<p>(${String.fromCharCode(97+j)}) ${opt.text}</p>`;
});
});
html += `</div>`;
}

// SECTION B
if(sectionB.length){
html += `<div class="section"><h3>Section B</h3>`;
sectionB.forEach((q,i)=>{
html += `<p><b>${i+1}. ${q.question}</b></p>`;
});
html += `</div>`;
}

// SECTION C
if(sectionC.length){
html += `<div class="section"><h3>Section C</h3>`;
sectionC.forEach((q,i)=>{
html += `<p><b>${i+1}. ${q.question}</b></p>`;
});
html += `</div>`;
}

// SECTION D
if(sectionD.length){
html += `<div class="section"><h3>Section D</h3>`;
sectionD.forEach((q,i)=>{
html += `<p><b>${i+1}. ${q.question}</b></p>`;
});
html += `</div>`;
}

html += `</div>`;

document.getElementById("paperContainer").innerHTML = html;
}

// ANSWER KEY
html += `<div class="section answer-key"><h3>Answer Key</h3>`;

questions.forEach((q,i)=>{
let correct = q.answers.find(a=>a.correct)?.text || "";
html += `<p>${i+1}. ${correct}</p>`;
});

html += `</div></div>`;

document.getElementById("paperContainer").innerHTML = html;

}

// ===== PDF =====
function downloadPDF(){

const element = document.getElementById("paperContainer");

if(!element.innerHTML){
alert("Generate paper first!");
return;
}

html2pdf().from(element).save("CBSE_Paper.pdf");

}

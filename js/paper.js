// ===== LOAD DATA =====
const ALL_QUESTIONS = [
...(window.SECTION_A || []).map(q => ({...q, section:"A"})),
...(window.SECTION_B || []).map(q => ({...q, section:"B"})),
...(window.SECTION_C || []).map(q => ({...q, section:"C"})),
...(window.SECTION_D || []).map(q => ({...q, section:"D"}))
];

// ===== EVENTS =====
document.getElementById("generateBtn").addEventListener("click", generatePaper);
document.getElementById("printBtn").addEventListener("click", () => window.print());
document.getElementById("pdfBtn").addEventListener("click", downloadPDF);
document.getElementById("regenerateBtn").addEventListener("click", generatePaper);

// ✅ LIVE UPDATE ON CHECKBOX
document.querySelectorAll(".chapter").forEach(cb => {
cb.addEventListener("change", generatePaper);
});

// ===== SHUFFLE =====
function shuffle(arr){
return arr.sort(()=>Math.random()-0.5);
}

// ===== GENERATE PAPER =====
function generatePaper(){

// CLEAR OLD PAPER
document.getElementById("paperContainer").innerHTML = "";

// GET SELECTED CHAPTERS
let selectedChapters = [...document.querySelectorAll(".chapter:checked")]
.map(cb => cb.value);

// IF NONE SELECTED
if(selectedChapters.length === 0){
document.getElementById("paperContainer").innerHTML =
"<p style='color:white;text-align:center;'>Select chapters to generate paper</p>";
return;
}

// FILTER QUESTIONS
let questions = ALL_QUESTIONS.filter(q =>
selectedChapters.includes(q.chapter)
);

// SHUFFLE FOR RANDOM PAPER
questions = shuffle(questions);

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

// AUTO TIME
let totalTime = Math.ceil(totalMarks * 1.5);

// DATE
let date = new Date().toLocaleDateString();

// ===== HTML START =====
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

// ===== SECTION A =====
if(sectionA.length){
html += `<div class="section"><h3>Section A (MCQ)</h3>`;
sectionA.forEach((q,i)=>{
html += `<p><b>${i+1}. ${q.question}</b></p>`;
(q.answers || []).forEach((opt,j)=>{
html += `<p>(${String.fromCharCode(97+j)}) ${opt.text}</p>`;
});
});
html += `</div>`;
}

// ===== SECTION B =====
if(sectionB.length){
html += `<div class="section"><h3>Section B</h3>`;
sectionB.forEach((q,i)=>{
html += `<p><b>${i+1}. ${q.question}</b></p>`;
});
html += `</div>`;
}

// ===== SECTION C =====
if(sectionC.length){
html += `<div class="section"><h3>Section C</h3>`;
sectionC.forEach((q,i)=>{
html += `<p><b>${i+1}. ${q.question}</b></p>`;
});
html += `</div>`;
}

// ===== SECTION D =====
if(sectionD.length){
html += `<div class="section"><h3>Section D</h3>`;
sectionD.forEach((q,i)=>{
html += `<p><b>${i+1}. ${q.question}</b></p>`;
});
html += `</div>`;
}

// ===== ANSWER KEY =====
html += `<div class="section answer-key"><h3>Answer Key</h3>`;

let count = 1;
sectionA.forEach(q=>{
let ans = q.answers?.find(a=>a.correct)?.text || "";
html += `<p>${count++}. ${ans}</p>`;
});

html += `</div></div>`;

// ===== OUTPUT =====
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

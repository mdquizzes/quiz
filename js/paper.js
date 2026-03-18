// ===== LOAD DATA =====
const ALL_QUESTIONS = window.QUIZ_DATA || [];

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

let count = parseInt(document.getElementById("questionCount").value);

let questions = shuffle(getFilteredQuestions()).slice(0,count);

if(questions.length === 0){
alert("No questions found!");
return;
}

let html = `
<div class="paper">

<div class="paper-header">
<h2>CBSE SAMPLE QUESTION PAPER</h2>
<p><b>Class:</b> X | <b>Subject:</b> Science</p>
<p><b>Time:</b> 3 Hours | <b>Max Marks:</b> 80</p>
</div>

<hr>

<div class="section">
<h3>Section A (MCQ)</h3>
`;

questions.forEach((q,i)=>{

html += `<div class="question">
<p><b>${i+1}. ${q.question}</b></p>`;

q.answers.forEach((opt,j)=>{
html += `<p class="option">(${String.fromCharCode(97+j)}) ${opt.text}</p>`;
});

html += `</div>`;

});

html += `</div>`;

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

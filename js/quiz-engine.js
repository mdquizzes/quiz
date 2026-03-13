/* ===================================
   MD QUIZ ENGINE
=================================== */

let quizQuestions=[];
let currentQuestion=0;

let customPositive=4;
let customNegative=-1;

let practiceScore=0;
let officialScore=0;

let correctCount=0;
let wrongCount=0;
let totalQuestions=0;


/* ===============================
   READ PARAMETERS
================================= */

const params=new URLSearchParams(window.location.search);

const board=params.get("board");
const medium=params.get("medium");
const className=params.get("class");
const subject=params.get("subject");

const questionLimit=parseInt(params.get("q"));
customPositive=parseFloat(params.get("p"));
customNegative=parseFloat(params.get("n"));

const quizName=params.get("quiz");


/* ===============================
   LOAD QUIZ FILE
================================= */

const path =
"../quiz-data/"
+board+"/"
+medium+"/"
+className+"/"
+subject+".js";

console.log("Loading:",path);

const script=document.createElement("script");

script.src=path;

script.onload=function(){

quizQuestions=[...window.QUIZ_DATA];

quizQuestions.sort(()=>Math.random()-0.5);

quizQuestions=quizQuestions.slice(0,questionLimit);

totalQuestions=quizQuestions.length;

loadQuestion();

};

document.body.appendChild(script);



/* ===============================
   LOAD QUESTION
================================= */

function loadQuestion(){

const q=quizQuestions[currentQuestion];

document.getElementById("quizBox").innerHTML=

"<div class='question-box'>"+
"Q"+(currentQuestion+1)+". "+q.question+
"</div>"+

q.answers.map((a,i)=>

"<button class='option' onclick='checkAnswer("+i+")'>"+
a.text+
"</button>"

).join("");

}



/* ===============================
   CHECK ANSWER
================================= */

function checkAnswer(i){

const q=quizQuestions[currentQuestion];

if(q.answers[i].correct){

practiceScore+=customPositive;
officialScore+=4;
correctCount++;

}else{

practiceScore+=customNegative;
officialScore-=1;
wrongCount++;

}

currentQuestion++;

if(currentQuestion<quizQuestions.length){

loadQuestion();

}else{

finishQuiz();

}

}



/* ===============================
   FINISH QUIZ
================================= */

function finishQuiz(){

document.getElementById("quizBox").innerHTML="";

let percent=
Math.round((correctCount/totalQuestions)*100);

let accuracy=
Math.round((correctCount/(correctCount+wrongCount))*100);

let grade="C";

if(percent>=90) grade="A+";
else if(percent>=75) grade="A";
else if(percent>=60) grade="B";
else if(percent>=40) grade="C";
else grade="D";

document.getElementById("result").classList.remove("hide");

document.getElementById("rScore").innerText=
"Score : "+practiceScore;

document.getElementById("rPercent").innerText=
"Percentage : "+percent+"%";

document.getElementById("rAccuracy").innerText=
"Accuracy : "+accuracy+"%";

document.getElementById("rGrade").innerText=
"Grade : "+grade;

document.getElementById("officialScore").innerText=
"Earning Points : "+officialScore;

}

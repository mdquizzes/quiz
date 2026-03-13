/* ===================================
   QUIZ ENGINE - ARCHITECTURE V2
=================================== */

let quizQuestions = [];
let currentQuestion = 0;

let customPositive = 4;
let customNegative = 0;

let practiceScore = 0;
let officialScore = 0;


/* ===============================
   LOAD QUIZ FILE
================================= */

function loadQuizFile(src, callback){

  let old = document.getElementById("quizScript");
  if(old) old.remove();

  let script = document.createElement("script");
  script.src = src;
  script.id = "quizScript";
  script.onload = callback;

  document.body.appendChild(script);
}


/* ===============================
   START QUIZ
================================= */

window.startQuiz = function(){

  const board =
  document.getElementById("boardSelect").value;

  const medium =
  document.getElementById("mediumSelect").value;

  const className =
  document.getElementById("classSelect").value;

  const subject =
  document.getElementById("subjectSelect").value;

  const path =
  "quiz-data/" +
  board + "/" +
  medium + "/" +
  className + "/" +
  subject + ".js";

  document.getElementById("quizBox").innerHTML="";
  document.getElementById("result").innerHTML="";

  customPositive = parseFloat(
  document.getElementById("customPositiveSelect").value
  );

  customNegative = parseFloat(
  document.getElementById("customNegativeSelect").value
  );

  practiceScore=0;
  officialScore=0;

  loadQuizFile(path,function(){

    if(!window.QUIZ_DATA){
      alert("Quiz file not found.");
      return;
    }

    quizQuestions=[...window.QUIZ_DATA];

    quizQuestions.sort(()=>Math.random()-0.5);

    const limit = parseInt(
      document.getElementById("questionCountSelect").value
    );

    quizQuestions=quizQuestions.slice(0,limit);

    currentQuestion=0;

    loadQuestion();

  });

};


/* ===============================
   LOAD QUESTION
================================= */

function loadQuestion(){

  const q=quizQuestions[currentQuestion];

  document.getElementById("quizBox").innerHTML=`

  <div class="question-box">
  <b>Q${currentQuestion+1}.</b> ${q.question}
  </div>

  <div class="options-grid">

  ${q.answers.map((ans,i)=>`

  <button class="option"
  onclick="checkAnswer(${i})">
  ${ans.text}
  </button>

  `).join("")}

  </div>

  `;

}


/* ===============================
   CHECK ANSWER
================================= */

window.checkAnswer=function(index){

  const q=quizQuestions[currentQuestion];

  if(q.answers[index].correct){

    practiceScore+=customPositive;
    officialScore+=4;

  }
  else{

    practiceScore-=customNegative;
    officialScore-=1;

  }

  currentQuestion++;

  if(currentQuestion<quizQuestions.length){

    loadQuestion();

  }
  else{

    finishQuiz();

  }

};


/* ===============================
   FINISH QUIZ
================================= */

function finishQuiz(){

  document.getElementById("quizBox").innerHTML="";

  document.getElementById("result").innerHTML=`

  <div class="result-card">

  <h2>🎯 Performance Card</h2>

  <p><strong>Practice Score:</strong> ${practiceScore}</p>

  <p><strong>Earning Points (4/-1):</strong> ${officialScore}</p>

  <p id="saveStatus"></p>

  </div>

  `;

  if(window.saveOfficialScore){

    document.getElementById("saveStatus").innerText=
    "Saving score...";

    window.saveOfficialScore(officialScore)

    .then(()=>{

      document.getElementById("saveStatus").innerText=
      "✅ Score Saved Successfully";

    })

    .catch(()=>{

      document.getElementById("saveStatus").innerText=
      "❌ Error Saving Score";

    });

  }
  else{

    document.getElementById("saveStatus").innerText=
    "Login to save your earning points";

  }

}


/* ===============================
   BUTTON EVENT
================================= */

document.addEventListener("DOMContentLoaded",function(){

  const btn=document.getElementById("startBtn");

  if(btn){
    btn.addEventListener("click",startQuiz);
  }

});

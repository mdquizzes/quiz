/* ===================================
   QUIZ ENGINE - ARCHITECTURE V1 LOCK
=================================== */

let quizQuestions = [];
let currentQuestion = 0;

let customPositive = 4;
let customNegative = 0;

let practiceScore = 0;
let officialScore = 0;

let selectedChapter = "";

/* ===============================
   LOAD CHAPTER SCRIPT
================================= */

function loadScript(src, callback){

  let old = document.getElementById("chapterScript");
  if(old) old.remove();

  let script = document.createElement("script");
  script.src = src;
  script.id = "chapterScript";
  script.onload = callback;

  document.body.appendChild(script);
}

/* ===============================
   START QUIZ
================================= */

window.startQuiz = function(){

  selectedChapter = document.getElementById("chapterSelect").value;

  if(!selectedChapter){
    alert("Select chapter first");
    return;
  }

  document.getElementById("result").innerHTML = "";
  document.getElementById("quizBox").innerHTML = "";

  customPositive = parseInt(
    document.getElementById("customPositiveSelect").value
  );

  customNegative = parseInt(
    document.getElementById("customNegativeSelect").value
  );

  practiceScore = 0;
  officialScore = 0;

  loadScript(selectedChapter, function(){

    quizQuestions = [...window.chapterQuestions];

    quizQuestions.sort(() => Math.random() - 0.5);

    quizQuestions = quizQuestions.slice(0, 10);

    currentQuestion = 0;

    loadQuestion();
  });
};

/* ===============================
   LOAD QUESTION
================================= */

function loadQuestion(){

  const q = quizQuestions[currentQuestion];

  document.getElementById("quizBox").innerHTML = `
    <div class="question-box">
      <b>Q${currentQuestion+1}.</b> ${q.question}
    </div>

    <div class="options-grid">
      ${q.answers.map((ans, i) =>
        `<button class="option"
          onclick="checkAnswer(${i})">
          ${ans.text}
        </button>`
      ).join("")}
    </div>
  `;
}

/* ===============================
   CHECK ANSWER
================================= */

window.checkAnswer = function(index){

  const q = quizQuestions[currentQuestion];

  if(q.answers[index].correct){
    practiceScore += customPositive;
    officialScore += 4;
  }
  else{
    practiceScore -= customNegative;
    officialScore -= 1;
  }

  currentQuestion++;

  if(currentQuestion < quizQuestions.length){
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

  document.getElementById("quizBox").innerHTML = "";

  document.getElementById("result").innerHTML = `
    <div class="result-card">
      <h2>🎯 Performance Card</h2>
      <p><strong>Practice Score:</strong> ${practiceScore}</p>
      <p><strong>Earning Points (4/-1):</strong> ${officialScore}</p>
      <p id="saveStatus"></p>
    </div>
  `;

  /* ===== SAVE SCORE IF FIREBASE AVAILABLE ===== */

  if (window.saveOfficialScore) {

    document.getElementById("saveStatus").innerText = "Saving score...";

    window.saveOfficialScore(officialScore)
      .then(() => {
        document.getElementById("saveStatus").innerText =
          "✅ Score Saved Successfully";
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("saveStatus").innerText =
          "❌ Error Saving Score";
      });

  } else {

    document.getElementById("saveStatus").innerText =
      "Login to save your earning points";
  }

} // ✅ THIS WAS MISSING

/* ===============================
   BUTTON EVENT LISTENER
================================= */

document.addEventListener("DOMContentLoaded", function(){

  const btn = document.getElementById("startBtn");

  if(btn){
    btn.addEventListener("click", startQuiz);
  }

});
